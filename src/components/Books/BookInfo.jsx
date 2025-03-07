import { StyleSheet, View, ScrollView, Text, Linking } from "react-native"
import { AntDesign, FontAwesome5 } from "@expo/vector-icons"
import { colors } from "../../global/colors.js"
import { CustomButton } from "../CustomButton.jsx"
import { BookImg } from "./View/BookImg.jsx"
import { RatingView } from "./View/RatingView.jsx"
import { DateInfo } from "./View/DateInfo.jsx"
import { SingleDataView } from "./View/SingleDataView.jsx"
import { HorizontalListData } from "./View/HorizontalListData.jsx"
import { VerticalListData } from "./View/VerticalListData.jsx"
import { TextAreaView } from "./View/TextAreaView.jsx"

export const BookInfo = ({ book, bookId, onEdit, onDelete }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imgContainer}>
        <BookImg bookId={bookId} style={styles.imgContainer} />
        <View style={styles.editDeleteContainer}>
          <CustomButton
            onPress={onDelete}
            icon={<AntDesign name="delete" size={24} color={colors.red} />}
            style={styles.deleteBtn}
            styleContainer={styles.editDeleteBtnContainer}
          />
          <CustomButton
            onPress={onEdit}
            icon={<AntDesign name="edit" size={24} color={colors.black} />}
            style={styles.editBtn}
            styleContainer={styles.editDeleteBtnContainer}
          />
        </View>
      </View>
      <RatingView type="star" rating={book.starRating} style={styles.ratingView} styleIcon={styles.ratingStarIcon} />
      <Text style={styles.title}>{book.title}</Text>
      {book.serie && <Text style={styles.serie}>{book.serie}</Text>}
      <Text style={styles.author}>{book.author}</Text>
      <View style={styles.rowContainer}>
        <DateInfo label="Fecha de inicio" date={book.startDate} />
        <DateInfo label="Fecha de fin" date={book.endDate} />
      </View>
      <SingleDataView format={book.readingFormat} />
      <HorizontalListData
        title="Géneros"
        items={book.genres}
        renderItem={(genre) => genre}
      />
      {(book.chapters || book.pages) &&
        <View style={styles.rowContainer}>
          <SingleDataView value={book.chapters && book.chapters} text={book.chapters ? "capítulos" : "Sin especificar"} />
          <SingleDataView value={book.pages && book.pages} text={book.pages ? "páginas" : "Sin especificar"} />
        </View>
      }
      {book.literaryTropes && 
        <VerticalListData
          title="Tropes"
          items={book.literaryTropes}
          icon="check-circle"
        />
      }
      {book.emotionRating &&
        <RatingView type="emotion"
          rating={book.emotionRating}
          style={styles.ratingView}
          styleIcon={styles.ratingEmotionIcon}
        />
      }
      {book.characters &&
        <HorizontalListData
          title="Personajes favoritos"
          items={book.characters}
          renderItem={(character) => character}
        />
      }
      {(book.spotifyLink || book.pinterestLink) &&
        <View style={styles.rowContainer}>
          <CustomButton
            title={book.spotifyLink ? "Spotify" : "No existe"}
            onPress={book.spotifyLink && (() => Linking.openURL(book.spotifyLink))}
            icon={<FontAwesome5 name="spotify" size={22} color={colors.black} />}
            style={[styles.link, styles.linkSpotify]}
            styleContainer={styles.linkContainer}
            styleText={styles.linkText}
          />
          <View style={styles.linkIcon}>
            <AntDesign name="link" size={22} color={colors.white} />
          </View>
          <CustomButton
            title={book.pinterestLink ? "Pinterest" : "No existe"}
            onPress={book.pinterestLink && (() => Linking.openURL(book.pinterestLink))}
            icon={<FontAwesome5 name="pinterest" size={22} color={colors.black} />}
            style={[styles.link, styles.linkPinterest]}
            styleContainer={styles.linkContainer}
            styleText={styles.linkText}
          />
        </View>
      }
      {book.quotes &&
        <VerticalListData
          title="Frases favoritas"
          items={book.quotes}
          icon="bookmark"
          columns={false}
        />
      }
      {book.sinopsis && <TextAreaView title="Sinopsis" content={book.sinopsis} />}
      {book.review && <TextAreaView title="Reseña" content={book.review} />}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black
  },
  imgContainer: {
    width: "100%",
    height: 284,
    marginBottom: 22,
    position: "relative"
  },
  editDeleteContainer: {
    width: "100%",
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  editDeleteBtnContainer: {
    width: "15%",
    margin: 0
  },
  deleteBtn: {
    backgroundColor: colors.darkGray,
    alignSelf: "flex-end"
  },
  editBtn: {
    backgroundColor: colors.skyBlue,
    alignSelf: "flex-start"
  },
  ratingView: {
    marginTop: 6,
    marginHorizontal: 50
  },
  ratingStarIcon: {
    marginBottom: 4,
    marginHorizontal: 4
  },
  ratingEmotionIcon: {
    marginBottom: 16,
    marginHorizontal: 12
  },
  title: {
    fontFamily: "Roboto-medium",
    fontSize: 20,
    marginBottom: 2,
    color: colors.white,
    textAlign: "center"
  },
  serie: {
    fontFamily: "Roboto-regular",
    fontSize: 17,
    marginBottom: 6,
    color: colors.lightGray,
    textAlign: "center"
  },
  author: {
    fontFamily: "Roboto-regular-italic",
    fontSize: 18,
    marginBottom: 24,
    color: colors.white,
    textAlign: "center"
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },  
  linkContainer: {
    width: "47%",
    margin: 0,
    marginBottom: 20, 
    paddingHorizontal: 20,
    justifyContent: "space-between"
  },
  link: {
    justifyContent: "space-between"
  },
  linkSpotify: {
    backgroundColor: colors.green
  },
  linkPinterest: {
    backgroundColor: colors.red
  },
  linkText: {
    fontSize: 17
  },
  linkIcon: {
    marginBottom: 20
  }
})