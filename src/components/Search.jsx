import { useState, useEffect, useCallback } from "react"
import { StyleSheet, View } from "react-native"
import { FontAwesome5, Entypo } from "@expo/vector-icons"
import { colors } from "../global/colors.js"
import { InputForm } from "./InputForm.jsx"
import { CustomButton } from "./CustomButton.jsx"

export const Search = ({ onSearch = () => {}, onClear = () => {} }) => {
  const [keyword, setKeyword] = useState("")

  useEffect(() => {
    if (keyword.trim() !== "") {
      onSearch(keyword)
    } else {
      onClear()
    }
  }, [keyword, onSearch, onClear])

  const handleSubmitEditing = useCallback(() => {
    onSearch(keyword)
  }, [keyword, onSearch])
  
  const handleClear = useCallback(() => {
    setKeyword("")
    onClear()
  }, [onClear])

  const handleChange = useCallback((text) => {
    setKeyword(text)
  }, [])

  return (
    <View style={styles.container}>
      <InputForm
        placeholder="Buscar..."
        value={keyword}
        onChange={handleChange}
        onSubmit={handleSubmitEditing}
        rightElement={
          <CustomButton
            onPress={handleClear}
            icon={<Entypo name="cross" size={27} color={colors.skyBlue} />}
            style={styles.iconBtnInput}
          />
        }
        style={styles.inputContainer}
        styleInput={styles.input}
      />
      <CustomButton
        onPress={() => onSearch(keyword)}
        icon={<FontAwesome5 name="search" size={20} color={colors.black} />}
        style={styles.iconBtn}
        styleContainer={styles.iconBtnContainer}
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
    height: "90%",
    marginRight: 10,
    padding: 6,
    paddingLeft: 4,
    backgroundColor: colors.black
  },
  iconBtn: {
    backgroundColor: colors.skyBlue
  }
})