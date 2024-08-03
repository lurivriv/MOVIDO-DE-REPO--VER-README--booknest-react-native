import { useState, useEffect, useCallback } from "react"
import { StyleSheet, View, ScrollView, Text } from "react-native"
import { FontAwesome6 } from "@expo/vector-icons"
import { colors } from "../../global/colors.js"
import { useGetBooksByUserQuery } from "../../services/bookService.js"
import { BooksList } from "./BooksList.jsx"
import { Search } from "../../components/Search.jsx"
import { CustomButton } from "../../components/CustomButton.jsx"

export const Books = ({ navigation }) => {
  const [keyword, setKeyword] = useState("")
  const [result, setResult] = useState("")
  const [error, setError] = useState("")

  const { data: books = [], isLoading } = useGetBooksByUserQuery("lu@gmail.com")

  useEffect(() => {  
    if (!isLoading) {
      if (keyword.trim()) {
      
        const filteredBooks = books.filter(book => 
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
        <BooksList navigation={navigation} searchResults={keyword} />
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