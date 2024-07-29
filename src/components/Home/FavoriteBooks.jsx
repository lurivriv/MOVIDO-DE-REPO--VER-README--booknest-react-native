import { StyleSheet, View } from "react-native"
import { useGetBooksQuery } from "../../services/booksServices.js"
import { ScrollHorizontalBooksList } from "./ScrollHorizontalBooksList.jsx"

export const FavoriteBooks = ({ navigation }) => {
  const { data: books = [] } = useGetBooksQuery()

  const maxRating = Math.max(...books.map(book => book.starRating || 0), 0)
  const filterFavoriteBooks = books.filter(book => book.starRating === maxRating)

  const handleFavoriteBooksList = () => {
    navigation.navigate("FavoriteBooksList")
  }

  return (
    <View style={styles.container}>
      <ScrollHorizontalBooksList
        title="Tus favoritos"
        data={filterFavoriteBooks}
        navigation={navigation}
        onPress={handleFavoriteBooksList}
        noBooksText="No hay libros calificados"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8
  }
})