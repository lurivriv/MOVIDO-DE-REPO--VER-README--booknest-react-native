import { useState, useCallback } from "react"
import { StyleSheet, View, Text } from "react-native"
import { FontAwesome5, Entypo } from "@expo/vector-icons"
import { colors } from "../global/colors.js"
import { InputForm } from "./InputForm.jsx"
import { CustomButton } from "./CustomButton.jsx"

export const Search = ({ onSearch = () => {}, onClear = () => {}, error = "" }) => {
  const [keyword, setKeyword] = useState("")

  const handleSearch = useCallback(() => {
    onSearch(keyword)
  }, [keyword, onSearch])
  
  const handleClear = useCallback(() => {
    setKeyword("")
    onClear()
  }, [onClear])

  return (
    <View style={styles.container}>
      <InputForm
        placeholder="Buscar..."
        value={keyword}
        onChange={setKeyword}
        error={error}
        rightElement={
          <CustomButton
            onPress={handleClear}
            icon={<Entypo name="cross" size={27} color={colors.skyBlue} />}
            style={styles.iconBtnInput}
            styleText={styles.btnTextInput}
          />
        }
        style={styles.inputContainer}
        styleInput={styles.input}
      />
      <CustomButton
        onPress={handleSearch}
        icon={<FontAwesome5 name="search" size={20} color={colors.black} />}
        style={styles.iconBtn}
        styleContainer={styles.iconBtnContainer}
        styleText={styles.btnText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  inputContainer: {
    width: "80%",
    paddingHorizontal: 0
  },
  input: {
    marginTop: 0,
    marginBottom: 0
  },
  iconBtnContainer: {
    width: "15%",
    margin: 0
  },
  iconBtnInput: {
    backgroundColor: "rgba(25, 25, 25, 0)"
  },
  iconBtn: {
    backgroundColor: colors.skyBlue
  }
})