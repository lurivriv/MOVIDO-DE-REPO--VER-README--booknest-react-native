import { StyleSheet, View, ScrollView } from "react-native"
import { colors } from "../../global/colors.js"
import { Titles } from "../../components/Home/Titles.jsx"
import { BooksList } from "../Books/BooksList.jsx"
import { FavoriteBooks } from "../../components/Home/FavoriteBooks.jsx"
import { BooksByGenre } from "../../components/Home/BooksByGenre.jsx"

export const Home = ({ navigation }) => {
  const navigateToBooks = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "BooksBtn" }]
    })
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Titles title="Últimos leídos" onPress={navigateToBooks} />
        <BooksList navigation={navigation} limit={2} />
      </View>
      <FavoriteBooks navigation={navigation} />
      <BooksByGenre navigation={navigation} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 20
  }
})