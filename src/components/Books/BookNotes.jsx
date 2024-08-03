import { useState } from "react"
import { StyleSheet, View, ScrollView, Text } from "react-native"
import Toast from "react-native-toast-message"
import { AntDesign } from "@expo/vector-icons"
import { colors } from "../../global/colors.js"
import { InputForm } from "../InputForm.jsx"
import { CustomButton } from "../CustomButton.jsx"

export const BookNotes = ({ label, items, setItems, error }) => {
  const [inputValue, setInputValue] = useState("")

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      setItems([inputValue, ...items])
      setInputValue("")
    }
  }

  const handleDeleteItem = (item) => {
    const updatedItems = items.filter(i => i !== item)
    setItems(updatedItems)
    
    Toast.show({
      type: "info",
      text1: `" ${item} "  ha sido eliminado`,
      text1Style: styles.toastText1,
      position: "bottom",
      bottomOffset: 72
    })
  }

  return (
    <View style={styles.bookDataContainer}>
      <InputForm
        label={label}
        value={inputValue}
        onChange={setInputValue}
        rightElement={<CustomButton title="Agregar" onPress={handleAddItem} />}
      />
      <View style={styles.listContainer}>
        {items?.length > 0 && (
          <ScrollView
            style={styles.scrollViewHorizontal}
            contentContainerStyle={styles.contentContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {items?.map((item, index) => (
              <View style={styles.itemContainer} key={index}>
                <Text style={styles.itemText}>{item}</Text>
                <CustomButton
                  icon={<AntDesign name="close" size={20} color={colors.red} />}
                  onPress={() => handleDeleteItem(item)}
                  style={styles.deleteBtn}
                  styleContainer={styles.deleteBtnContainer}
                />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  bookDataContainer: {
    width: "100%"
  },
  listContainer: {
    paddingHorizontal: 20
  },
  scrollViewHorizontal: {
    marginTop: -10,
    marginBottom: 16,
    marginHorizontal: -28
  },
  contentContainer: {
    paddingHorizontal: 20
  },
  itemContainer: {
    height: 50,
    marginHorizontal: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemText: {
    fontFamily: "Roboto-regular",
    fontSize: 17,
    color: colors.black
  },
  deleteBtnContainer: {
    margin: 0
  },
  deleteBtn: {
    width: "auto",
    marginLeft: 10,
    padding: 4,
    backgroundColor: colors.white
  },
  toastText1: {
    fontSize: 17,
    color: colors.darkGray
  },
  error: {
    fontFamily: "Roboto-regular-italic",
    fontSize: 15,
    marginTop: -6,
    marginBottom: 16,
    color: colors.red,
    textAlign: "center"
  }
})