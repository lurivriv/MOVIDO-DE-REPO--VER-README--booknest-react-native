import { useState, useEffect, useCallback } from "react"
import { StyleSheet, ScrollView, View, Text } from "react-native"
import { colors } from "../../global/colors.js"
import { useGetBooksByUserQuery } from "../../services/bookService.js"
import { Search } from "../../components/Search.jsx"
import { BooksList } from "../../screens/Books/BooksList.jsx"

export const BooksByGenreList = ({ navigation, route }) => {
  const { genre } = route.params
  const [keyword, setKeyword] = useState("")
  const [result, setResult] = useState("")
  const [error, setError] = useState("")
  const [filterBooksByGenre, setFilterBooksByGenre] = useState([])

  const { data: books = [], isLoading } = useGetBooksByUserQuery("lu@gmail.com")

  useEffect(() => {
    if (!isLoading) {
      const booksByGenre = books.filter(book => book.genres?.includes(genre))
      setFilterBooksByGenre(booksByGenre)

      if (keyword.trim()) {
        const filteredBooks = booksByGenre.filter(book => 
          book.title?.toLowerCase().includes(keyword.toLowerCase()) ||
          book.author?.toLowerCase().includes(keyword.toLowerCase()) ||
          book.serie?.toLowerCase().includes(keyword.toLowerCase()) ||
          (book.genres?.some(genre => genre.toLowerCase().includes(keyword.toLowerCase()))) ||
          book.readingFormat?.toLowerCase().includes(keyword.toLowerCase()) ||
          (book.starRating?.toString() === keyword)
        )

        if (filteredBooks.length > 0) {
          setResult("Resultados de búsqueda")
          setError("")
        } else {
          setResult("")
          setError("No hay resultados para esta búsqueda")
        }
      }
    }
  }, [keyword, books, isLoading])
  
  const handleClearSearch = useCallback(() => {
    setKeyword("")
    setResult("")
    setError("")
  }, [])

  return (
    <View style={styles.container}>
      <Search onSearch={setKeyword} onClear={handleClearSearch} />
      {error && <Text style={styles.error}>{error}</Text>}
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        {result && <Text style={styles.result}>{result}</Text>}
        <BooksList navigation={navigation} searchResults={keyword} books={filterBooksByGenre} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.black
  },
  scrollViewContent: {
    paddingBottom: 60
  },
  result: {
    fontFamily: "Roboto-regular-italic",
    fontSize: 15,
    marginBottom: 14,
    color: colors.white,
    textAlign: "center"
  }, 
  error: {
    fontFamily: "Roboto-regular-italic",
    fontSize: 15,
    marginBottom: 16,
    color: colors.red,
    textAlign: "center"
  }
})