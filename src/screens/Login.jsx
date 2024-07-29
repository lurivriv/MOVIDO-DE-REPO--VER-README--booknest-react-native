import { useState } from "react"
import { StyleSheet, View, Text, Image } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useDispatch } from "react-redux"
import { colors } from "../global/colors.js"
import { useSignInMutation } from "../services/authService.js"
import { setUser } from "../features/User/UserSlice.js"
import { InputForm } from "../components/InputForm.jsx"
import { CustomButton } from "../components/CustomButton.jsx"

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const onSubmit = ()=> {
    //login
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} keyboardShouldPersistTaps="handled">
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <View style={styles.formContainer}>
          <InputForm
            label={"Email"}
            placeholder="email@gmail.com"
            onChange={setEmail}
            error={""}
          />
          <InputForm
            label={"Contraseña"}
            placeholder="••••••••••"
            onChange={setPassword}
            error={""}
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