import { useEffect } from "react"
import { StyleSheet, View, FlatList, Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useGetBooksQuery } from "../../services/booksServices.js"
import { setBooks } from "../../features/Books/BooksSlice.js"
import { colors } from "../../global/colors.js"
import { Loader } from "../../components/Loader.jsx"
import { Error } from "../../components/Error.jsx"
import { BookItem } from "../../components/Books/BookItem.jsx"

export const BooksList = ({ navigation, limit, noBooksText = "No hay libros agregados", books: externalBooks }) => {
  const { data: books = [], isLoading, error } = useGetBooksQuery()
  const dispatch = useDispatch()
  const booksFromState = useSelector(state => state.books.value)

  useEffect(() => {
    const booksString = JSON.stringify(books)
    const booksFromStateString = JSON.stringify(booksFromState)

    if (booksString !== booksFromStateString) {
      dispatch(setBooks(books))
    }
  }, [books, booksFromState, dispatch])

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <Error message="Error al cargar los datos" />
  }

  const booksToUse = externalBooks || books
  const sortedBooks = [...booksToUse].sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
  const displayedBooks = limit ? sortedBooks.slice(0, limit) : sortedBooks
  
  const groupedBooks = displayedBooks.reduce((acc, book) => {
    const month = format(new Date(book.endDate), "MMMM yyyy", { locale: es })

    if (!acc[month]) {
      acc[month] = []
    }

    acc[month].push(book)
    return acc
  }, {})

  const bookSections = Object.keys(groupedBooks).map((month, index) => ({
    month,
    data: groupedBooks[month],
    key: index.toString()
  }))

  return (
    <View style={styles.listContainer}>
      {books?.length === 0 ? (
        <Text style={styles.noBooksText}>{noBooksText}</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={bookSections}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <>
              <Text style={styles.monthHeader}>{item.month}</Text>
              {item.data.map(book => (
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
    color: colors.lightGray,
    textAlign: "center"
  },
  monthHeader: {
    fontSize: 16,
    marginBottom: 10,
    color: colors.lightGray
  }
})