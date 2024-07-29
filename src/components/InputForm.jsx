import { useState, useEffect, useRef } from "react"
import { StyleSheet, View, Text, TextInput } from "react-native"
import { colors } from "../global/colors.js"

export const InputForm = ({
    style = {},
    styleInput = {},
    label = "",
    placeholder="Escribe aquí",
    value = "",
    onChange,
    rightElement = null ,
    multiline = false,
    textArea = "",
    isSecure = false,
    error = ""
  }) => {
  const [input, setInput] = useState(value)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    setInput(value)
  }, [value])

  const onChangeText = (text) => {
    setInput(text)
    onChange(text)
  }

  return (
    <View style={[styles.inputContainer, style]}>
      {label && <Text style={styles.subtitle}>{label}</Text>}
      <View style={[styles.inputField, styleInput]}>
        <TextInput
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            multiline && (textArea === "sinopsis" ? styles.sinopsisInput : styles.reviewInput)
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.lightGray}
          value={input}
          onChangeText={onChangeText}
          multiline={multiline}
          secureTextEntry={isSecure}
          ref={inputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {rightElement && <View style={styles.rightElementContainer}>{rightElement}</View>}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  subtitle: {
    fontFamily: "Roboto-medium",
    fontSize: 17,
    width: "100%",
    color: colors.white
  },
  inputField: {
    width: "100%",
    marginTop: 6,
    marginBottom: 16,
    position: "relative",
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    fontFamily: "Roboto-regular",
    fontSize: 17,
    width: "100%",
    height: 50,
    paddingVertical: 6,
    paddingHorizontal: 14,
    color: colors.white,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: colors.lightGray
  },
  inputFocused: {
    borderColor: colors.skyBlue
  },
  sinopsisInput: {
    height: 150,
    paddingVertical: 12,
    textAlignVertical: "top"
  },
  reviewInput: {
    height: 300,
    paddingVertical: 12,
    textAlignVertical: "top"
  },
  rightElementContainer: {
    position: "absolute",
    right: -20,
    justifyContent: "center",
    alignItems: "center"
  },
  error: {
    fontFamily: "Roboto-regular-italic",
    fontSize: 15,
    marginTop: 3,
    color: colors.red
  }
})