import { useState } from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import { useDispatch } from "react-redux"
import { FontAwesome5 } from "@expo/vector-icons"
import { colors } from "../../global/colors.js"
import { useGetBookByIdQuery, usePostBookMutation, usePutBookMutation, useGetReadingFormatQuery } from "../../services/booksServices.js"
import { addBook, updateBook } from "../../features/Books/BooksSlice.js"
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
  const { data: book } = useGetBookByIdQuery(bookId)
  const dispatch = useDispatch()

  const [starRating, setStarRating] = useState(book ? book.starRating : 0)
  const [title, setTitle] = useState(book ? book.title : "")
  const [author, setAuthor] = useState(book ? book.author : "")
  const [serie, setSerie] = useState(book ? book.serie : "")
  const [startDate, setStartDate] = useState(book ? new Date(book.startDate) : new Date())
  const [endDate, setEndDate] = useState(book ? new Date(book.endDate) : new Date())
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
  
  const [postBook] = usePostBookMutation()
  const [putBook] = usePutBookMutation()
  const { data: readingFormats = [] } = useGetReadingFormatQuery()
  const image = require("../../../assets/books/defaultImg.jpg")

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

  const isValidSpotifyLink = (link) => {
    if (!link) return true
    const regex = /^https:\/\/open\.spotify\.com\/.+$/
    return regex.test(link)
  }
  
  const isValidPinterestLink = (link) => {
    if (!link) return true
    const regex = /^https:\/\/pin\.it\/.+$/
    return regex.test(link)
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
    if (spotifyLink && !isValidSpotifyLink(spotifyLink)) {
      alert("Debe ser un link de Spotify válido")
      return
    }

    if (pinterestLink && !isValidPinterestLink(pinterestLink)) {
      alert("Debe ser un link de Pinterest válido")
      return
    }

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
      await putBook({ bookId, ...filteredBookData }).unwrap()
      dispatch(updateBook({ id: bookId, ...filteredBookData }))
    } else {
      await postBook(filteredBookData).unwrap()
      dispatch(addBook(filteredBookData))
    }
  
    navigation.navigate("Books")
  }
  
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <BookImg source={image} backgroundSource={image} style={styles.imgContainer} />
      <Rating
        type="star"
        rating={starRating}
        onRatingChange={handleRatingChange}
      />
      <InputForm label="Título" value={title} onChange={setTitle} />
      <InputForm label="Autor" value={author} onChange={setAuthor} />
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
      />
      <BookNotes label="Géneros" items={genres} setItems={setGenres} />
      <View style={styles.rowContainer}>
        <InputForm style={styles.inputFormRow} label="Cpítulos" value={chapters} onChange={setChapters} />
        <InputForm style={styles.inputFormRow} label="Páginas" value={pages} onChange={setPages} />
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
          style={styles.inputFormRow}
          label="Spotify"
          value={spotifyLink}
          onChange={setSpotifyLink}
          rightElement={<FontAwesome5 style={styles.inputRightElement} color={colors.green} name="spotify" size={22} />}
        />
        <InputForm
          style={styles.inputFormRow}
          label="Pinterest"
          value={pinterestLink}
          onChange={setPinterestLink}
          rightElement={<FontAwesome5 style={styles.inputRightElement} color={colors.red} name="pinterest" size={22} />}
        />
      </View>
      <BookNotes label="Frases favoritas" items={quotes} setItems={setQuotes} />
      <InputForm label="Sinopsis" value={sinopsis} onChange={setSinopsis} multiline={true} textArea="sinopsis" />
      <InputForm label="Reseña" value={review} onChange={setReview} multiline={true} textArea="review" />
      <CustomButton title={bookId ? "Actualizar libro" : "Guardar libro"} onPress={handleSubmit} />
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
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  inputFormRow: {
    width: "50%"
  },
  inputRightElement: {
    marginRight: 30
  }
})