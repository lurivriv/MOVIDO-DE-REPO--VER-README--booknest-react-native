import { useState, useEffect } from "react"
import { StyleSheet, View, Text, Image } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useDispatch } from "react-redux"
import { colors } from "../global/colors.js"
import Toast from "react-native-toast-message"
import { useSignUpMutation } from "../services/authService.js"
import { setUser } from "../features/User/UserSlice.js"
import { signupSchema } from "../validations/sessionSchema.js"
import { InputForm } from "../components/InputForm.jsx"
import { CustomButton } from "../components/CustomButton.jsx"

export const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [errorMail, setErrorMail] = useState("")
  const [password, setPassword] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("")

  const [triggerSignUp, result] = useSignUpMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
          localId: result.data.localId
        })
      )
    }
  }, [result])
  
  const onSubmit = async () => {
    try {
      setErrorMail("")
      setErrorPassword("")
      setErrorConfirmPassword("")

      signupSchema.validateSync({ email, password, confirmPassword }, { abortEarly: false })
      await triggerSignUp({ email, password, returnSecureToken: true })

      navigation.navigate("Login")
      
      Toast.show({
        type: "info",
        text1: "La cuenta fue creada con éxito",
        text1Style: styles.toastText1,
        position: "bottom",
        bottomOffset: 72
      })
    } catch (error) {
      if (error.inner) {
        error.inner.forEach(err => {
          switch (err.path) {
            case "email":
              setErrorMail(err.message)
              break
            case "password":
              setErrorPassword(err.message)
              break
            case "confirmPassword":
              setErrorConfirmPassword(err.message)
              break
            default:
              break
          }
        })
      }
    }
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} keyboardShouldPersistTaps="handled">
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <View style={styles.container}>
        <Text style={styles.title}>Crear cuenta</Text>
        <View style={styles.formContainer}>
          <InputForm
            label={"Email"}
            onChange={setEmail}
            error={errorMail}
          />
          <InputForm
            label={"Contraseña"}
            onChange={setPassword}
            error={errorPassword}
            isSecure={true}
          />
          <InputForm
            label={"Confirmar contraseña"}
            onChange={setconfirmPassword}
            error={errorConfirmPassword}
            isSecure={true}
          />
          <CustomButton
            styleContainer={styles.submitBtnContainer}
            onPress={onSubmit}
            title="Crear cuenta"
          />
        </View>
        <View>
          <Text style={styles.subLogin}>¿Ya tienes una cuenta?</Text>
          <CustomButton
            style={styles.subLoginBtn}
            styleContainer={styles.subLoginBtnContainer}
            styleText={styles.subLoginBtnText}
            onPress={() => navigation.navigate("Login")}
            title="Iniciar sesión"
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.black,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  logo: {
    width: "100%",
    maxWidth: 300,
    height: 90,
    marginVertical: 20,
    resizeMode: "contain"
  },
  container: {
    width: "100%",
    maxWidth: 400,
    paddingVertical: 20,
    backgroundColor: colors.darkGray,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  title: {
    fontFamily: "Roboto-regular",
    fontSize: 24,
    color: colors.white
  },
  formContainer: {
    width: "100%",
    marginTop: 14,
    marginBottom: 40,
    alignItems: "center"
  },
  submitBtnContainer: {
    width: "50%",
    margin: 0,
    marginTop: 10
  },
  subLogin: {
    fontFamily: "Roboto-regular",
    fontSize: 15,
    color: colors.white
  },
  subLoginBtnContainer: {
    margin: 0
  },
  subLoginBtn: {
    width: "auto",
    height: "auto",
    paddingVertical: 8,
    backgroundColor: colors.darkGray
  },
  subLoginBtnText: {
    color: colors.skyBlue,
    textDecorationLine: "underline"
  },
  toastText1: {
    fontSize: 17,
    color: colors.darkGray
  }
})