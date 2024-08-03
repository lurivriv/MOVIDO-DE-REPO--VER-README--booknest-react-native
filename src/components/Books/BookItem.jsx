import { StyleSheet, View, Text, Pressable } from "react-native"
import { useDispatch } from "react-redux"
import Toast from "react-native-toast-message"
import { AntDesign } from "@expo/vector-icons"
import { colors } from "../../global/colors.js"
import { useDeleteBookMutation } from "../../services/bookService.js"
import { setItemSelected, removeBook } from "../../features/Books/BooksSlice.js"
import { CustomButton } from "../CustomButton.jsx"
import { BookImg } from "./View/BookImg.jsx"
import { RatingView } from "./View/RatingView.jsx"
import { SingleDataView } from "./View/SingleDataView.jsx"

export const BookItem = ({ navigation, book, simpleView = false, isFirstItem, isLastItem }) => {
  const [deleteBook] = useDeleteBookMutation()
  const dispatch = useDispatch()
  const bookId = book.id

  const handleNavigate = () => {
    dispatch(setItemSelected(book.id))
    navigation.navigate("BookDetail", { bookId: book.id })
  }

  const handleDelete = async () => {
    await deleteBook(book.id)

    Toast.show({
      type: "info",
      text1: `" ${book.title} "  ha sido eliminado`,
      text1Style: styles.toastText1,
      position: "bottom",
      bottomOffset: 72
    })

    dispatch(removeBook(book.id))
  }

  return (
    <>
      {!simpleView && (
        <View style={styles.cardContainer}>
          <Pressable style={({ pressed }) => [styles.detailsContainer, pressed && styles.pressedBtn]} onPress={handleNavigate}>
            <BookImg bookId={bookId} backgroundSource={false} style={styles.imgContainer} imgStyle={styles.img} />
            <View style={styles.details}>
              <Text style={styles.title}>{book.title}</Text>
              {book.serie && <Text style={styles.serie}>{book.serie}</Text>}
              <Text style={styles.author}>{book.author}</Text>
              <RatingView
                type="star"
                rating={book.starRating}
                simpleView={true}
                style={styles.ratingStar}
                styleIcon={styles.ratingStarIcon}
              />
              <View style={styles.notesContainer}>
                {book.genres?.slice(0, 1).map((genre, index) => (
                  <SingleDataView key={index} genre={genre} simpleView={true} />
                ))}
                {book.genres?.length > 1 && (
                  <Text style={styles.moreGenres}>...</Text>
                )}
                <SingleDataView format={book.readingFormat} simpleView={true} />
              </View>
            </View>
          </Pressable>
          <CustomButton
            onPress={handleDelete}
            icon={<AntDesign name="delete" size={20} color={colors.red} />}
            style={styles.deleteBtn}
            styleContainer={styles.deleteBtnContainer}
          />
        </View>
      )}
      {simpleView && (
        <View style={[
            styles.simpleViewContainer,
            isFirstItem && { paddingLeft: 0, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 },
            isLastItem && { paddingRight: 0, borderTopRightRadius: 10, borderBottomRightRadius: 10 }
          ]}
        >
          <Pressable style={({ pressed }) => [styles.simpleViewDetails, pressed && styles.pressedBtn]} onPress={handleNavigate}>
            <BookImg bookId={bookId} backgroundSource={false} imgStyle={styles.img} />
            <RatingView
              type="star"
              rating={book.starRating}
              simpleView={true}
              style={styles.ratingStarSimpleView}
            />
          </Pressable>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 150,
    marginBottom: 20,
    backgroundColor: colors.darkGray,
    borderRadius: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.lightGray,
    flexDirection: "row",
    alignItems: "center"
  },
  detailsContainer: {
    flex: 1,
    flexDirection: "row"
  },
  pressedBtn: {
    transform: [{ scale: 0.95 }]
  },
  imgContainer: {
    marginRight: 10
  },
  img: {
    height: 150,
    aspectRatio: 164 / 250,
    borderWidth: 0
  },
  details: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  title: {
    fontFamily: "Roboto-medium",
    fontSize: 18,
    color: colors.white
  },
  serie: {
    fontFamily: "Roboto-regular",
    fontSize: 15,
    color: colors.lightGray
  },
  author: {
    fontFamily: "Roboto-regular-italic",
    fontSize: 15,
    color: colors.white
  },
  ratingStar: {
    marginTop: 8,
    marginBottom: 6
  },
  ratingStarIcon: {
    marginBottom: 4,
    marginRight: 8
  },
  notesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-end"
  },
  moreGenres: {
    fontFamily: "Roboto-medium",
    fontSize: 13,
    marginLeft: -5,
    marginRight: 10,
    color: colors.white
  },
  deleteBtnContainer: {
    margin: 0,
    alignSelf: "flex-end"
  },
  deleteBtn: {
    width: "auto",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.darkGray
  },
  toastText1: {
    fontSize: 17,
    color: colors.darkGray
  },
  simpleViewContainer: {
    paddingHorizontal: 8,
    backgroundColor: colors.darkGray,
    justifyContent: "center",
    alignItems: "center"
  },
  simpleViewDetails: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  ratingStarSimpleView: {
    width: "auto",
    marginTop: 8,
    marginBottom: 12
  }
})