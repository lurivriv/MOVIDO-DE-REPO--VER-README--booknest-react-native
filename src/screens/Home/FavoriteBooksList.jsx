import { useState, useEffect, useCallback } from "react"
import { StyleSheet, View } from "react-native"
import { colors } from "../../global/colors.js"
import { useGetBooksQuery } from "../../services/booksServices.js"
import { Search } from "../../components/Search.jsx"
import { BooksList } from "../../screens/Books/BooksList.jsx"

export const FavoriteBooksList = ({ navigation }) => {
  const [keyword, setKeyword] = useState("")
  const [booksSearched, setBooksSearched] = useState([])
  const [error, setError] = useState("")
  const [filterFavoriteBooks, setFilterFavoriteBooks] = useState([])

  const { data: books = [], isLoading } = useGetBooksQuery()
  
  useEffect(() => {
    const maxRating = Math.max(...books.map(book => book.starRating || 0), 0)
    const favorites = books.filter(book => book.starRating === maxRating)
    setFilterFavoriteBooks(favorites)

    if (!isLoading) {
      const filteredBooks = favorites.filter(book => book.title?.toLowerCase().includes(keyword.toLowerCase()))
      setBooksSearched(filteredBooks)
      setError("")
    }
  }, [keyword, books, isLoading])

  const handleClearSearch = useCallback(() => {
    setBooksSearched(filterFavoriteBooks)
    setError("")
  }, [filterFavoriteBooks])

  return (
    <View style={styles.container}>
      <Search error={error} onSearch={setKeyword} onClear={handleClearSearch} />
      <BooksList noBooksText="No hay libros calificados" books={booksSearched} navigation={navigation} />
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