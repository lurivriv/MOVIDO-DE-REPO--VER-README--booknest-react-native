import { StyleSheet, View, Image } from "react-native"
import { colors } from "../../../global/colors.js"

export const BookImg = ({ source, backgroundSource, style, imgStyle }) => {
  return (
    <View style={[styles.imgContainer, style]}>
      {backgroundSource && <Image source={backgroundSource} style={[styles.backgroundImg, imgStyle]} blurRadius={10} />}
      <Image source={source} style={[styles.img, imgStyle]} />
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
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    resizeMode: "cover"
  },
  img: {
    width: 164,
    height: 250,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.lightGray,
    resizeMode: "cover"
  }
})