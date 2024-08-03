import { useState, useEffect } from "react"
import { StyleSheet, View, Image } from "react-native"
import { colors } from "../../../global/colors.js"
import { useGetBookImageQuery } from "../../../services/bookService.js"
import { Loader } from "../../Loader.jsx"
import { Error } from "../../Error.jsx"

export const BookImg = ({ backgroundSource = true, image, bookId, style, imgStyle }) => {
  const [bookImg, setBookImg] = useState("")
  const { data: bookImageData, isLoading, isError } = useGetBookImageQuery(bookId)

  useEffect(() => {
    if ((bookImageData && bookImageData?.image) || (bookImageData !== bookImageData?.image)) {
      setBookImg(bookImageData?.image)
    }
  }, [bookImageData])

  useEffect(() => {
    if (image && image !== "") {
      setBookImg(image)
    } else if (image && image === "") {
      setBookImg("")
    }
  }, [image])

  const defaultBookImg = require("../../../../assets/books/defaultBookImg.jpg")
  
  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <Error message="Error al cargar la imagen" />
  }

  return (
    <View style={[styles.imgContainer, style]}>
      <Image
        source={bookImg ? { uri: bookImg } : defaultBookImg}
        style={[styles.img, imgStyle]}
      />
      {backgroundSource &&
        <Image
          source={bookImg ? { uri: bookImg } : defaultBookImg}
          style={[styles.backgroundImg, imgStyle]}
          blurRadius={10}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  imgContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundImg: {
    width: "100%",
    height: "100%",
    zIndex: -1,
    position: "absolute",
    top: 0,
    left: 0,
    resizeMode: "cover"
  },
  img: {
    width: 164,
    height: 250,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
    resizeMode: "cover"
  }
})