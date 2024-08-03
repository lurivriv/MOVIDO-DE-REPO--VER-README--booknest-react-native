import { useEffect } from "react"
import { StyleSheet, View, FlatList, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useGetBooksByUserQuery } from "../../services/bookService.js"
import { setBooks } from "../../features/Books/BooksSlice.js"
import { colors } from "../../global/colors.js"
import { Loader } from "../../components/Loader.jsx"
import { Error } from "../../components/Error.jsx"
import { BookItem } from "../../components/Books/BookItem.jsx"

export const BooksList = ({ navigation, limit, books: externalBooks, searchResults, noBooksText = "No hay libros agregados" }) => {
  const { data: books = [], isLoading, isError } = useGetBooksByUserQuery("lu@gmail.com")
  const dispatch = useDispatch()
  const booksFromState = useSelector(state => state.books.value)

  useEffect(() => {
    const booksString = JSON.stringify(books)
    const booksFromStateString = JSON.stringify(booksFromState)

    if (booksString !== booksFromStateString) {
      dispatch(setBooks(books))
    }
  }, [books, booksFromState, dispatch])

  const booksToUse = externalBooks || books
  let keyword
  let groupedBooks
  let sortedBooks
  let displayedBooks
  let month
  let bookSections

  if (searchResults) {
    keyword = searchResults.toLowerCase()
    
    groupedBooks = {
      Título: booksToUse.filter(book => book.title && book.title.toLowerCase().includes(keyword)),
      Autor: booksToUse.filter(book => book.author && book.author.toLowerCase().includes(keyword)),
      Serie: booksToUse.filter(book => book.serie && book.serie.toLowerCase().includes(keyword)),
      Género: booksToUse.filter(book => (book.genres || []).some(genre => genre.toLowerCase().includes(keyword))),
      Formato: booksToUse.filter(book => book.readingFormat && book.readingFormat.toLowerCase().includes(keyword)),
      Calificación: booksToUse.filter(book => book.starRating && book.starRating.toString() === keyword)
    }

    groupedBooks = Object.fromEntries(Object.entries(groupedBooks).filter(([key, value]) => value.length > 0))
  } else {
    sortedBooks = [...booksToUse].sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
    displayedBooks = limit ? sortedBooks.slice(0, limit) : sortedBooks

    groupedBooks = displayedBooks.reduce((acc, book) => {
      month = format(new Date(book.endDate), "MMMM yyyy", { locale: es })
  
      if (!acc[month]) {
        acc[month] = []
      }
  
      acc[month].push(book)
      return acc
    }, {})
  }

  if (searchResults) {
    bookSections = Object.keys(groupedBooks).map((field, index) => ({
      field,
      data: groupedBooks[field],
      key: `field-${index}`
    }))
  } else {
    bookSections = Object.keys(groupedBooks).map((month, index) => ({
      month,
      data: groupedBooks[month],
      key: `date-${index}`
    }))
  }
  
  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <Error message="Error al cargar los libros" />
  }

  return (
    <View style={styles.listContainer}>
      {books.length === 0 ? (
        <Text style={styles.noBooksText}>{noBooksText}</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          data={bookSections}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <>
              {!searchResults && <Text style={styles.sections}>{item.month}</Text>}
              {searchResults && <Text style={styles.sections}>{item.field}</Text>}
              {item.data?.map(book => (
                <BookItem key={book.id} book={book} navigation={navigation} />
              ))}
            </>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1
  },
  noBooksText: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 30,
    color: colors.lightGray,
    textAlign: "center"
  },
  sections: {
    fontSize: 16,
    marginBottom: 10,
    color: colors.lightGray
  }
})