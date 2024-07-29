import { useState } from "react"
import { StyleSheet, View, ScrollView, Text } from "react-native"
import Toast from "react-native-toast-message"
import { FontAwesome6 , AntDesign } from "@expo/vector-icons"
import { colors } from "../../global/colors.js"
import { useGetLiteraryTropesQuery } from "../../services/booksServices.js"
import { CustomButton } from "../CustomButton.jsx"
import { TropesModal } from "./TropesModal.jsx"

export const LiteraryTropesSelector = ({ selectedTropes, setSelectedTropes }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  
  const { data: literaryTropes = [] } = useGetLiteraryTropesQuery()

  const handleDeleteTropeSelection = (trope) => {
    const updatedTropes = selectedTropes.filter(t => t !== trope)
    setSelectedTropes(updatedTropes)
    Toast.show({
      type: "info",
      text1: `" ${trope} "  ha sido eliminado`,
      text1Style: styles.toastText1,
      position: "bottom",
      bottomOffset: 72
    })
  }

  return (
    <View style={styles.tropesContainer}>
      <CustomButton
        title="Tropes"
        onPress={() => setIsModalVisible(true)}
        icon={<FontAwesome6 name="add" size={22} color={colors.skyBlue} />}
        style={styles.openModalBtn}
        styleContainer={styles.openModalBtnContainer}
        styleText={styles.openModalBtnText}
      />
      <View style={styles.selectedTropesContainer}>
        {selectedTropes?.length > 0 && (
          <ScrollView
            style={styles.scrollViewHorizontal}
            contentContainerStyle={styles.contentContainer}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {selectedTropes.slice().reverse().map((trope, index) => (
              <View style={styles.tropeSelectedContainer} key={index}>
                <Text style={styles.tropeSelectedText}>{trope}</Text>
                <CustomButton
                  icon={<AntDesign name="close" size={20} color={colors.red} />}
                  onPress={() => handleDeleteTropeSelection(trope)}
                  style={styles.deleteBtn}
                  styleContainer={styles.deleteBtnContainer}
                />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
      <TropesModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        literaryTropes={literaryTropes}
        selectedTropes={selectedTropes}
        setSelectedTropes={setSelectedTropes}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  tropesContainer: {
    width: "100%"
  },
  openModalBtnContainer: {
    marginTop: 6
  },
  openModalBtn: {
    paddingHorizontal: 14,
    backgroundColor: colors.black,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: colors.lightGray,
    justifyContent: "space-between"
  },
  openModalBtnText: {
    fontSize: 17,
    color: colors.white
  },
  selectedTropesContainer: {
    paddingHorizontal: 20
  },
  scrollViewHorizontal: {
    marginTop: -14,
    marginBottom: 16,
    marginHorizontal: -28
  },
  contentContainer: {
    paddingHorizontal: 20
  },
  tropeSelectedContainer: {
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
  tropeSelectedText: {
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
  }
})