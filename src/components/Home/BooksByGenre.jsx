import { View } from "react-native"
import { useGetBooksByUserQuery } from "../../services/bookService.js"
import { ScrollHorizontalBooksList } from "./ScrollHorizontalBooksList.jsx"

export const BooksByGenre = ({ navigation }) => {
  const { data: books = [] } = useGetBooksByUserQuery("lu@gmail.com")

  const filterBooksByGenre = books.reduce((acc, book) => {
    (book.genres || []).forEach(genre => {
      if (!acc[genre]) {
        acc[genre] = { books: [], date: new Date(book.endDate).getTime() }
      }
      acc[genre].books.push(book)
      acc[genre].date = Math.min(acc[genre].date, new Date(book.endDate).getTime())
    })

    return acc
  }, {})

  const sortedBooksByGenre = Object.entries(filterBooksByGenre).sort((a, b) => b[1].date - a[1].date)

  const handleBooksByGenreList = (genre) => {
    navigation.navigate("BooksByGenreList", { genre })
  }
  
  return (
    <View>
      {sortedBooksByGenre.map(([genre, { books }]) => (
        <ScrollHorizontalBooksList
          key={genre}
          title={genre}
          data={books}
          navigation={navigation}
          onPress={() => handleBooksByGenreList(genre)}
        />
      ))}
    </View>
  )
}