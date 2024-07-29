import { useState, useEffect, useCallback } from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import { FontAwesome6 } from "@expo/vector-icons"
import { colors } from "../../global/colors.js"
import { useGetBooksQuery } from "../../services/booksServices.js"
import { CustomButton } from "../../components/CustomButton.jsx"
import { Search } from "../../components/Search.jsx"
import { BooksList } from "./BooksList.jsx"

export const Books = ({ navigation }) => {
  const [keyword, setKeyword] = useState("")
  const [booksSearched, setBooksSearched] = useState([])
  const [error, setError] = useState("")
  const [allBooks, setAllBooks] = useState([])

  const { data: books = [], isLoading } = useGetBooksQuery()

  useEffect(() => {
    setAllBooks(books)

    if (!isLoading) {
      const filteredBooks = books.filter(book => book.title?.toLowerCase().includes(keyword.toLowerCase()))
      setBooksSearched(filteredBooks)
      setError("")
    }
  }, [keyword, books, isLoading])

  const handleClearSearch = useCallback(() => {
    setBooksSearched(allBooks)
    setError("")
  }, [allBooks])
  
  return (
    <View style={styles.container}>
      <Search error={error} onSearch={setKeyword} onClear={handleClearSearch} />
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <BooksList navigation={navigation} books={booksSearched} />
      </ScrollView>
      <CustomButton
        title="Agregar libro"
        onPress={() => navigation.navigate("CustomBook")}
        icon={<FontAwesome6 name="add" size={22} color={colors.black} />}
        style={styles.addBookBtn}
        styleContainer={styles.addBookBtnContainer}
        styleText={styles.addBookBtnText}
      />
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
  addBookBtnContainer: {
    margin: 0,
    marginHorizontal: 20,
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0
  },
  addBookBtn: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.skyBlue
  },
  addBookBtnText: {
    marginRight: 16
  }
})