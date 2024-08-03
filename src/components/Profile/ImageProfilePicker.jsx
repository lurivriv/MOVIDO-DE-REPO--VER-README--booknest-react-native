import { useState, useEffect } from "react"
import { StyleSheet, View, Image } from "react-native"
import { AntDesign, FontAwesome6 } from "@expo/vector-icons"
import { colors } from "../../global/colors.js"
import { useGetProfileImageQuery } from "../../services/bookService.js"
import { Loader } from "../Loader.jsx"
import { Error } from "../Error.jsx"
import { CustomButton } from "../CustomButton.jsx"

export const ImageProfilePicker = ({ navigation, localId }) => {
  const [profileImg, setProfileImg] = useState("")
  const { data: profileImageData, isLoading, isError } = useGetProfileImageQuery(localId)
  
  useEffect(() => {
    if ((profileImageData && profileImageData?.image) || (profileImageData !== profileImageData?.image)) {
      setProfileImg(profileImageData?.image)
    }
  }, [profileImageData])

  const defaultProfileImg = require("../../../assets/profile/defaultProfileImg.png")

  const launchCamera = () => {
    navigation.navigate("ImgSelector", { localId, imgType: "profile" })
  }

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <Error message="Error al cargar la imagen" />
  }

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={profileImg ? { uri: profileImg } : defaultProfileImg} />
        <CustomButton
          onPress={launchCamera}
          icon={profileImg ? 
            <AntDesign name="edit" size={24} color={colors.black} />
          :
            <FontAwesome6 name="add" size={22} color={colors.black} />
          }
          styleContainer={styles.btnContainer}
          style={styles.imageBtn}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  imgContainer: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 1.5,
    borderColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 125,
    resizeMode: "cover"
  },
  btnContainer: {
    margin: 20,
    zIndex: 1,
    position: "absolute",
    bottom: 0,
    right: 0
  },
  imageBtn: {
    width: "auto"
  }
})