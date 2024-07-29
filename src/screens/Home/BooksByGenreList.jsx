import { useState, useEffect, useCallback } from "react"
import { StyleSheet, View } from "react-native"
import { colors } from "../../global/colors.js"
import { useGetBooksQuery } from "../../services/booksServices.js"
import { Search } from "../../components/Search.jsx"
import { BooksList } from "../../screens/Books/BooksList.jsx"

export const BooksByGenreList = ({ navigation, route }) => {
  const [keyword, setKeyword] = useState("")
  const [booksSearched, setBooksSearched] = useState([])
  const [error, setError] = useState("")
  const [filterBooksByGenre, setFilterBooksByGenre] = useState([])

  const { genre } = route.params
  const { data: books = [], isLoading } = useGetBooksQuery()

  useEffect(() => {
    const booksByGenre = books.filter(book => book.genres?.includes(genre))
    setFilterBooksByGenre(booksByGenre)

    if (!isLoading) {
      const filteredBooks = booksByGenre.filter((book) => book.title?.toLowerCase().includes(keyword.toLowerCase()))
      setBooksSearched(filteredBooks)
      setError("")
    }
  }, [keyword, books, isLoading])

  const handleClearSearch = useCallback(() => {
    setBooksSearched(filterBooksByGenre)
    setError("")
  }, [filterBooksByGenre])

  return (
    <View style={styles.container}>
      <Search error={error} onSearch={setKeyword} onClear={handleClearSearch} />
      <BooksList books={booksSearched} navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.black
  }
})