import { StyleSheet, View, Text } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { colors } from "../../global/colors.js"
import { clearUser } from "../../features/User/UserSlice.js"
import { ImageProfilePicker } from "../../components/Profile/ImageProfilePicker.jsx"
import { FavoriteBooks } from "../../components/Home/FavoriteBooks.jsx"
import { CustomButton } from "../../components/CustomButton.jsx"

export const Profile = ({ navigation }) => {
  const { localId } = useSelector(state => state.auth.value)
  const dispatch = useDispatch()

  const signOut = async () => {
    dispatch(clearUser())
  }

  return (
    <View style={styles.container}>
      <ImageProfilePicker navigation={navigation} localId={localId}  />
      <Text style={styles.emailText}>lu@gmail.com</Text>
      <FavoriteBooks style={styles.favoritesContainer} navigation={navigation} />
      <CustomButton
        title="Cerrar sesión"
        onPress={signOut}
        style={styles.btnSignOut}
        styleContainer={styles.btnSignOutContainer}
        styleText={styles.btnSignOutText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: colors.black,
    alignItems: "center"
  },
  emailText: {
    fontFamily: "Roboto-medium",
    fontSize: 20,
    marginVertical: 30,
    color: colors.white
  },
  favoritesContainer: {
    height: 250
  },
  btnSignOutContainer: {
    margin: 0,
    position: "absolute",
    bottom: 20
  },
  btnSignOut: {
    width: "auto",
    height: "auto",
    paddingVertical: 8,
    backgroundColor: colors.black
  },
  btnSignOutText: {
    color: colors.red,
    textDecorationLine: "underline"
  }
})