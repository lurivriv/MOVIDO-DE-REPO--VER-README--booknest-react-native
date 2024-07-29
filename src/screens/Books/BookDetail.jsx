import { StyleSheet, View } from "react-native"
import { useDispatch } from "react-redux"
import Toast from "react-native-toast-message"
import { colors } from "../../global/colors.js"
import { useGetBookByIdQuery, useDeleteBookMutation } from "../../services/booksServices.js"
import { removeBook } from "../../features/Books/BooksSlice.js"
import { Loader } from "../../components/Loader.jsx"
import { Error } from "../../components/Error.jsx"
import { BookInfo } from "../../components/Books/BookInfo.jsx"

export const BookDetail = ({ navigation, route }) => {
  const { bookId } = route.params
  const { data: book = [], isLoading, error } = useGetBookByIdQuery(bookId)
  const [deleteBook] = useDeleteBookMutation()
  const dispatch = useDispatch()

  const handleDelete = async () => {
    await deleteBook(bookId)
    Toast.show({
      type: "info",
      text1: `" ${book.title} "  ha sido eliminado`,
      text1Style: styles.toastText1,
      position: "bottom",
      bottomOffset: 72
    })
    dispatch(removeBook(bookId))
    navigation.goBack()
  }

  const handleEdit = () => {
    navigation.navigate("CustomBook", { bookId })
  }

  if (isLoading) {
    return <Loader />
  }

  if (error || !book) {
    return <Error message="Error al cargar los datos" />
  }

  return (
    <View style={styles.container}>
      <BookInfo
        book={book}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  toastText1: {
    fontSize: 17,
    color: colors.darkGray
  }
})