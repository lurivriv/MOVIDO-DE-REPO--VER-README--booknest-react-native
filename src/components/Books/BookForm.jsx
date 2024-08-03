import { useState, useEffect } from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import { useDispatch } from "react-redux"
import Toast from "react-native-toast-message"
import { AntDesign , FontAwesome5, FontAwesome6 } from "@expo/vector-icons"
import { colors } from "../../global/colors.js"
import {
  useGetBookByIdQuery,
  usePostBookMutation,
  usePutBookMutation,
  useGetReadingFormatQuery,
  useGetBookImageQuery,
  usePostBookImageMutation,
  useDeleteBookImageMutation
} from "../../services/bookService.js"
import { setCameraImageBook, addBook, updateBook } from "../../features/Books/BooksSlice.js"
import { bookSchema } from "../../validations/bookSchema.js"
import { Loader } from "../Loader.jsx"
import { Error } from "../Error.jsx"
import { InputForm } from "../InputForm.jsx"
import { CustomButton } from "../CustomButton.jsx"
import { BookImg } from "./View/BookImg.jsx"
import { Rating } from "./Rating.jsx"
import { DateData } from "./DateData.jsx"
import { ReadingFormatSelector } from "./ReadingFormatSelector.jsx"
import { BookNotes } from "./BookNotes.jsx"
import { LiteraryTropesSelector } from "./LiteraryTropesSelector.jsx"

export const BookForm = ({ navigation, route }) => {
  const bookId = route.params?.bookId
  const { data: book = [], isLoading: isLoadingBook, isError: isErrorBook } = useGetBookByIdQuery(bookId)

  const [image, setImage] = useState(book ? book?.image : "")
  const [starRating, setStarRating] = useState(book ? book.starRating : 0)
  const [title, setTitle] = useState(book ? book.title : "")
  const [author, setAuthor] = useState(book ? book.author : "")
  const [serie, setSerie] = useState(book ? book.serie : "")
  const [startDate, setStartDate] = useState(book?.startDate ? new Date(book.startDate) : new Date())
  const [endDate, setEndDate] = useState(book?.endDate ? new Date(book.endDate) : new Date())
  const [readingFormat, setReadingFormat] = useState(book ? book.readingFormat : "")
  const [genres, setGenres] = useState(book ? book.genres || [] : [])
  const [chapters, setChapters] = useState(book ? book.chapters : "")
  const [pages, setPages] = useState(book ? book.pages : "")
  const [selectedLiteraryTropes, setSelectedLiteraryTropes] = useState(book ? book.literaryTropes : [])
  const [emotionRating, setEmotionRating] = useState(book?.emotionRating || {})
  const [characters, setCharacters] = useState(book ? book.characters || [] : [])
  const [spotifyLink, setSpotifyLink] = useState(book ? book.spotifyLink : "")
  const [pinterestLink, setPinterestLink] = useState(book ? book.pinterestLink : "")
  const [quotes, setQuotes] = useState(book ? book.quotes || [] : [])
  const [sinopsis, setSinopsis] = useState(book ? book.sinopsis : "")
  const [review, setReview] = useState(book ? book.review : "")
  
  const [errorStarRating, setErrorStarRating] = useState("")
  const [errorTitle, setErrorTitle] = useState("")
  const [errorAuthor, setErrorAuthor] = useState("")
  const [errorReadingFormat, setErrorReadingFormat] = useState("")
  const [errorGenres, setErrorGenres] = useState("")
  const [errorChapters, setErrorChapters] = useState("")
  const [errorPages, setErrorPages] = useState("")
  const [errorSpotifyLink, setErrorSpotifyLink] = useState("")
  const [errorPinterestLink, setErrorPinterestLink] = useState("")

  const [postBook] = usePostBookMutation()
  const [putBook] = usePutBookMutation()
  const { data: readingFormats = [], isLoading: isLoadingFormats, isError: isErrorFormats } = useGetReadingFormatQuery()
  const { data: bookImageData } = useGetBookImageQuery(bookId)
  const [triggerPostBookImage] = usePostBookImageMutation()
  const [triggerDeleteBookImage] = useDeleteBookImageMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (route.params?.updatedImage) {
      setImage(route.params.updatedImage)
    } else if (bookImageData && bookImageData?.image) {
      setImage(bookImageData.image)
    } else {
      setImage("")
    }
  }, [bookImageData, route.params?.updatedImage])

  const handleRatingChange = (type, value) => {
    if (type === "star") {
      setStarRating(value)
    } else {
      setEmotionRating((prev) => ({
        ...prev,
        [type]: prev[type] === value ? 0 : value
      }))
    }
  }

  const handleReadingFormatSelect = (selectedReadingFormat) => {
    setReadingFormat(selectedReadingFormat)
  }
  
  const filterEmptyFields = (data) => {
    return Object.fromEntries(
      Object.entries(data).filter(([key, value]) => {
        if (key === "emotionRating") {
          const filteredEmotionRatings = Object.fromEntries(
            Object.entries(value).filter(([_, rating]) => rating > 0)
          )
          return Object.keys(filteredEmotionRatings).length > 0
        }

        if (value !== "" &&
            value !== null &&
            value !== undefined &&
            (typeof value !== "number" || value !== 0) &&
            (Array.isArray(value) ? value?.length > 0 : true)) {
          return true
        }
      })
    )
  }

  const handleSubmit = async () => {
    try {
      setErrorStarRating("")
      setErrorTitle("")
      setErrorAuthor("")
      setErrorReadingFormat("")
      setErrorGenres("")
      setErrorChapters("")
      setErrorPages("")
      setErrorSpotifyLink("")
      setErrorPinterestLink("")

      bookSchema.validateSync(
        {
          starRating,
          title,
          author,
          readingFormat,
          genres,
          chapters,
          pages,
          spotifyLink,
          pinterestLink
        }, 
        { abortEarly: false }
      )

      const bookData = {
        image,
        starRating,
        title,
        author,
        serie,
        startDate: startDate,
        endDate: endDate,
        readingFormat,
        genres,
        chapters,
        pages,
        literaryTropes: selectedLiteraryTropes,
        emotionRating,
        characters,
        spotifyLink,
        pinterestLink,
        quotes,
        sinopsis,
        review
      }

      const filteredBookData = filterEmptyFields(bookData)

      if (bookId) {
        await putBook({ bookId, ...filteredBookData, user: "lu@gmail.com" })
        dispatch(updateBook({ id: bookId, ...filteredBookData, user: "lu@gmail.com" }))
      
        if (image) {
          if (route.params?.updatedImage) {
            dispatch(setCameraImageBook(image))
            await triggerPostBookImage({ imageBook: image, bookId })
          } else {
            dispatch(setCameraImageBook(""))
            await triggerDeleteBookImage(bookId)
          }
        }

        navigation.navigate("Books")

        Toast.show({
          type: "info",
          text1: `" ${title} "  ha sido actualizado`,
          text1Style: styles.toastText1,
          position: "bottom",
          bottomOffset: 72
        })
      } else {
        await postBook({ ...filteredBookData, user: "lu@gmail.com" })
        dispatch(addBook({ ...filteredBookData, user: "lu@gmail.com" }))

        navigation.navigate("Books")

        Toast.show({
          type: "info",
          text1: `" ${book.title} "  ha sido agregado`,
          text1Style: styles.toastText1,
          position: "bottom",
          bottomOffset: 72
        })
      }
    } catch (error) {
      if (error.inner) {
        error.inner.forEach(err => {
          switch (err.path) {
            case "starRating":
              setErrorStarRating(err.message)
              break
            case "title":
              setErrorTitle(err.message)
              break
            case "author":
              setErrorAuthor(err.message)
              break
            case "readingFormat":
              setErrorReadingFormat(err.message)
              break
            case "genres":
              setErrorGenres(err.message)
              break
            case "chapters":
              setErrorChapters(err.message)
              break
            case "pages":
              setErrorPages(err.message)
              break
            case "spotifyLink":
              setErrorSpotifyLink(err.message)
              break
            case "pinterestLink":
              setErrorPinterestLink(err.message)
              break
            default:
              break
          }
        })
      }
    }
  }
  
  const launchCamera = () => {
    navigation.navigate("ImgSelector", { bookId, imgType: "book" })
  }

  if (isLoadingBook || isLoadingFormats) {
    return <Loader />
  }

  if (isErrorBook) {
    return <Error message="Error al cargar el libro" />
  }

  if (isErrorFormats) {
    return <Error message="Error al cargar los formatos" />
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.imgContainer}>
        <BookImg bookId={bookId} image={image} style={styles.imgContainer} />
        <CustomButton
          onPress={launchCamera}
          icon={image ? 
            <AntDesign name="edit" size={24} color={colors.black} />
          :
            <FontAwesome6 name="add" size={22} color={colors.black} />
          }
          style={styles.editImgBtn}
          styleContainer={styles.editImgBtnContainer}
        />
      </View>
      <Rating
        type="star"
        rating={starRating}
        onRatingChange={handleRatingChange}
        error={errorStarRating}
      />
      <InputForm label="Título" value={title} onChange={setTitle} error={errorTitle} />
      <InputForm label="Autor" value={author} onChange={setAuthor} error={errorAuthor} />
      <InputForm label="Serie" value={serie} onChange={setSerie} />
      <View style={styles.rowContainer}>
        <DateData
          subtitle="Fecha de inicio"
          date={startDate}
          setDate={setStartDate}
        />
        <DateData
          subtitle="Fecha de fin"
          date={endDate}
          setDate={setEndDate}
        />
      </View>
      <ReadingFormatSelector
        readingFormats={readingFormats}
        selectedReadingFormat={readingFormat}
        onSelect={handleReadingFormatSelect}
        error={errorReadingFormat}
      />
      <BookNotes label="Géneros" items={genres} setItems={setGenres} error={errorGenres} />
      <View style={styles.rowContainer}>
        <InputForm style={styles.inputFormRow} label="Capítulos" value={chapters} onChange={setChapters} error={errorChapters} />
        <InputForm style={styles.inputFormRow} label="Páginas" value={pages} onChange={setPages} error={errorPages} />
      </View>
      <LiteraryTropesSelector 
        selectedTropes={selectedLiteraryTropes}
        setSelectedTropes={setSelectedLiteraryTropes}
      />
      <Rating
        type="emotion"
        rating={emotionRating}
        onRatingChange={handleRatingChange}
      />
      <BookNotes label="Personajes favoritos" items={characters} setItems={setCharacters} />
      <View style={styles.rowContainer}>
        <InputForm
          style={styles.linkInputFormRow}
          label="Spotify"
          placeholder="Link"
          value={spotifyLink}
          onChange={setSpotifyLink}
          rightElement={<FontAwesome5 style={styles.inputRightElement} color={colors.green} name="spotify" size={22} />}
          error={errorSpotifyLink}
        />
        <View style={styles.linkIcon}>
          <AntDesign name="link" size={22} color={colors.white} />
        </View>
        <InputForm
          style={styles.linkInputFormRow}
          label="Pinterest"
          placeholder="Link"
          value={pinterestLink}
          onChange={setPinterestLink}
          rightElement={<FontAwesome5 style={styles.inputRightElement} color={colors.red} name="pinterest" size={22} />}
          error={errorPinterestLink}
        />
      </View>
      <BookNotes label="Frases favoritas" items={quotes} setItems={setQuotes} />
      <InputForm label="Sinopsis" value={sinopsis} onChange={setSinopsis} multiline={true} textArea="sinopsis" />
      <InputForm label="Reseña" value={review} onChange={setReview} multiline={true} textArea="review" />
      <CustomButton
        title={bookId ? "Actualizar libro" : "Guardar libro"}
        onPress={handleSubmit}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  imgContainer: {
    width: "100%",
    height: 284,
    marginBottom: 16,
    position: "relative"
  },
  editImgBtnContainer: {
    width: "24%",
    margin: 0,
    paddingHorizontal: 20,
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 10
  },
  editImgBtn: {
    backgroundColor: colors.skyBlue
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  inputFormRow: {
    width: "50%"
  },
  linkInputFormRow: {
    width: "47%"
  },
  inputRightElement: {
    paddingLeft: 10,
    backgroundColor: colors.black,
    right: 30
  },
  linkIcon: {
    marginTop: 44
  },
  toastText1: {
    fontSize: 17,
    color: colors.darkGray
  }
})