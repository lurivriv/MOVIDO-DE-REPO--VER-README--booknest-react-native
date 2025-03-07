import { useState, useEffect } from "react"
import { StyleSheet, View, Text, Image } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useDispatch } from "react-redux"
import { colors } from "../global/colors.js"
import { useSignInMutation } from "../services/authService.js"
import { setUser } from "../features/User/UserSlice.js"
import { loginSchema } from "../validations/sessionSchema.js"
import { InputForm } from "../components/InputForm.jsx"
import { CustomButton } from "../components/CustomButton.jsx"

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [errorMail, setErrorMail] = useState("")
  const [password, setPassword] = useState("")
  const [errorPassword, setErrorPassword] = useState("")

  const [triggerSignIn, result] = useSignInMutation()
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

      loginSchema.validateSync({ email, password }, { abortEarly: false })
      await triggerSignIn({ email, password, returnSecureToken: true })
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
        <Text style={styles.title}>Iniciar sesión</Text>
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
          <CustomButton
            styleContainer={styles.submitBtnContainer}
            onPress={onSubmit}
            title="Iniciar sesión"
          />
        </View>
        <View>
          <Text style={styles.subSignup}>¿Todavía no tienes una cuenta?</Text>
          <CustomButton
            style={styles.subSignupBtn}
            styleContainer={styles.subSignupBtnContainer}
            styleText={styles.subSignupBtnText}
            onPress={() => navigation.navigate("Signup")}
            title="Crear cuenta"
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
  subSignup: {
    fontFamily: "Roboto-regular",
    fontSize: 15,
    color: colors.white
  },
  subSignupBtnContainer: {
    margin: 0
  },
  subSignupBtn: {
    width: "auto",
    height: "auto",
    paddingVertical: 8,
    backgroundColor: colors.darkGray
  },
  subSignupBtnText: {
    color: colors.skyBlue,
    textDecorationLine: "underline"
  }
})