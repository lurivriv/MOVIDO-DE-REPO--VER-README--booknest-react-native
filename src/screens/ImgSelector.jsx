import { useState, useEffect } from "react"
import { StyleSheet, View, Image, Alert } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import * as ImagePicker from "expo-image-picker"
import Toast from "react-native-toast-message"
import { AntDesign, Ionicons } from "@expo/vector-icons"
import { colors } from "../global/colors.js"
import { useGetBookImageQuery, useGetProfileImageQuery, usePostProfileImageMutation, useDeleteProfileImageMutation } from "../services/bookService.js"
import { setCameraImageBook } from "../features/Books/BooksSlice.js"
import { setCameraImageProfile } from "../features/User/UserSlice.js"
import { CustomButton } from "../components/CustomButton.jsx"

export const ImgSelector = ({ navigation, route }) => {
  const { imgType, bookId } = route.params
  const [imageData, setImageData] = useState({ profile: "", book: "" })
  const [confirmImage, setConfirmImage] = useState({ profile: false, book: false })
  const [deleteImage, setDeleteImage] = useState({ profile: false, book: false })

  const [triggerPostProfileImage] = usePostProfileImageMutation()
  const [triggerDeleteProfileImage] = useDeleteProfileImageMutation()

  const dispatch = useDispatch()

  const { localId } = useSelector(state => state.auth.value)

  const { data: bookImageData } = useGetBookImageQuery(bookId)
  const { data: profileImageData } = useGetProfileImageQuery(localId)

  useEffect(() => {
    setImageData({
      profile: profileImageData?.image || "",
      book: bookImageData?.image || ""
    })

    setDeleteImage({
      profile: !!profileImageData?.image,
      book: !!bookImageData?.image
    })
  }, [profileImageData, bookImageData])

  const defaultProfileImg = require("../../assets/profile/defaultProfileImg.png")
  const defaultBookImg = require("../../assets/books/defaultBookImg.jpg")

  const verifyCameraPermisson = async () => {
    const  { status } = await ImagePicker.requestCameraPermissionsAsync()
  
    if (status !== "granted") {
      Alert.alert("El permiso para acceder a la cámara fue denegado")
      return false
    }
    return true
  }

  const pickCameraImage = async () => {
    const isCameraOk = await verifyCameraPermisson()

    if (isCameraOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: imgType === "profile" ? [1, 1] : [164, 250],
        base64: true,
        quality: 0.5
      })

      if (!result.canceled) {
        const image = `data:image/jpeg;base64,${result.assets[0].base64}`
        setImageData(prev => ({ ...prev, [imgType.toLowerCase()]: image }))
        setConfirmImage(prev => ({ ...prev, [imgType.toLowerCase()]: true }))
      }
    }
  }

  const pickGalleryImage = async () => {
    const isCameraOk = await verifyCameraPermisson()

    if (isCameraOk) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: imgType === "profile" ? [1, 1] : [164, 250],
        base64: true,
        quality: 0.5
      })

      if (!result.canceled) {
        const image = `data:image/jpeg;base64,${result.assets[0].base64}`
        setImageData(prev => ({ ...prev, [imgType.toLowerCase()]: image }))
        setConfirmImage(prev => ({ ...prev, [imgType.toLowerCase()]: true }))
      }
    }
  }
  
  const handleConfirmImage = async () => {
    const image = imageData[imgType.toLowerCase()]

    if (imgType === "profile") {
      navigation.navigate("Profile", { localId })
      await triggerPostProfileImage({ imageProfile: image, localId })
      dispatch(setCameraImageProfile(image))
    } else {
      navigation.navigate("CustomBook", { bookId, updatedImage: image })
      dispatch(setCameraImageBook(image))
    }

    setConfirmImage(prev => ({ ...prev, [imgType.toLowerCase()]: false }))

    Toast.show({
      type: "info",
      text1: "Tu imagen fue modificada con éxito",
      text1Style: styles.toastText1,
      position: "bottom",
      bottomOffset: 72
    })
  }

  const handleDeleteImage = async () => {
    if (imgType === "profile") {
      navigation.navigate("Profile", { localId })
      await triggerDeleteProfileImage(localId)
      dispatch(setCameraImageProfile(null))
    } else {
      navigation.navigate("CustomBook", { bookId })
      dispatch(setCameraImageBook(""))
    }

    Toast.show({
      type: "info",
      text1: "Tu imagen fue eliminada con éxito",
      text1Style: styles.toastText1,
      position: "bottom",
      bottomOffset: 72
    })
  }

  const cancelImage = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      {imgType === "profile" &&
        <>
          <View style={styles.imgProfileContainer}>
            <Image style={styles.imgProfile} source={imageData.profile ? { uri: imageData.profile } : defaultProfileImg} />
          </View>
          {confirmImage.profile && 
            <CustomButton
              onPress={handleConfirmImage}
              title="Confirmar cambios"
              styleContainer={styles.btnConfirmContainer}
            />
          } 
          <View style={styles.bottomButtonsContainer}>
            <View style={styles.bottomButtonsContent}>
              {deleteImage.profile &&
                <CustomButton
                  title="Eliminar"
                  onPress={handleDeleteImage}
                  icon={<AntDesign name="delete" size={20} color={colors.red} />}
                  styleContainer={styles.bottomBtnContainer}
                  style={styles.bottomBtn}
                  styleText={styles.bottomBtnText}
                />
              }
              <CustomButton
                title="Cancelar"
                onPress={cancelImage}
                icon={<AntDesign name="close" size={23} color={colors.red} />}
                styleContainer={styles.bottomBtnContainer}
                style={styles.bottomBtn}
                styleText={styles.bottomBtnText}
              />
            </View>
          </View>
        </>
      }
      {imgType === "book" &&
        <>
          <View style={styles.imgBookContainer}>
            <Image style={styles.imgBook} source={imageData.book ? { uri: imageData.book } : defaultBookImg} />
          </View>
          {confirmImage.book && 
            <CustomButton
              onPress={handleConfirmImage}
              title="Confirmar cambios"
              styleContainer={styles.btnConfirmContainer}
            />
          }
          <View style={styles.bottomButtonsContainer}>
            <View style={styles.bottomButtonsContent}>
              {deleteImage.book &&
                <CustomButton
                  title="Eliminar"
                  onPress={handleDeleteImage}
                  icon={<AntDesign name="delete" size={20} color={colors.red} />}
                  styleContainer={styles.bottomBtnContainer}
                  style={styles.bottomBtn}
                  styleText={styles.bottomBtnText}
                />
              }
              <CustomButton
                title="Cancelar"
                onPress={cancelImage}
                icon={<AntDesign name="close" size={23} color={colors.red} />}
                styleContainer={styles.bottomBtnContainer}
                style={styles.bottomBtn}
                styleText={styles.bottomBtnText}
              />
            </View>
          </View>
        </>
      }
      <View style={styles.optionsCameraContainer}>
        <CustomButton
          title="Tomar foto"
          icon={<Ionicons name="camera-outline" size={24} color="black" />}
          onPress={pickCameraImage}
          styleContainer={styles.btnCameraContainer}
          style={styles.btnCamera}
        />
        <CustomButton
          title="Abrir galería"
          onPress={pickGalleryImage}
          icon={<Ionicons name="image-outline" size={24} color="black" />}
          styleContainer={styles.btnCameraContainer}
          style={styles.btnCamera}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.black,
    alignItems: "center"
  }, 
  imgProfileContainer: {
    width: 250,
    height: 250,
    borderRadius: 125,
    justifyContent: "center",
    alignItems: "center"
  },
  imgProfile: {
    width: "100%",
    height: "100%",
    borderRadius: 125,
    borderWidth: 1.5,
    borderColor: colors.lightGray,
    resizeMode: "cover"
  },
  imgBookContainer: {
    aspectRatio: 164 / 250, 
    height: 284,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center"
  },
  imgBook: {
    aspectRatio: 164 / 250,
    height: 284,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: colors.lightGray,
    resizeMode: "cover"
  },
  btnConfirmContainer: {
    width: "100%",
    marginTop: 35
  },
  optionsCameraContainer: {
    margin: 0,
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  btnCameraContainer: {
    width: "50%"
  },
  btnCamera: {
    justifyContent: "space-between"
  },
  bottomButtonsContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0
  },
  bottomButtonsContent: {
    margin: 0,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  bottomBtnContainer: {
    width: "50%"
  },
  bottomBtn: {
    backgroundColor: colors.black,
    borderWidth: 1.5,
    borderColor: colors.red,
    justifyContent: "space-between"
  },
  bottomBtnText: {
    color: colors.red
  },
  toastText1: {
    fontSize: 17,
    color: colors.darkGray
  }
})