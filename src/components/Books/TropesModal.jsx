import { useState, useEffect } from "react"
import { StyleSheet, View, ScrollView, Text, Modal, TouchableOpacity } from "react-native"
import { colors } from "../../global/colors.js"
import { useGetLiteraryTropesQuery } from "../../services/bookService.js"
import { Loader } from "../Loader.jsx"
import { Error } from "../Error.jsx"
import { CustomButton } from "../CustomButton.jsx"

export const TropesModal = ({ visible, onClose, selectedTropes, setSelectedTropes }) => {
  const [selectedTropesInModal, setSelectedTropesInModal] = useState(selectedTropes || [])
  
  const { data: tropes = [], isLoading, isError } = useGetLiteraryTropesQuery()

  useEffect(() => {
    setSelectedTropesInModal(selectedTropes || [])
  }, [selectedTropes])

  const handleTropeSelection = (trope) => {
    setSelectedTropesInModal((prev) => {
      const isSelected = prev?.includes(trope)
      return isSelected ? prev.filter(t => t !== trope) : [...prev, trope]
    })
  }

  const handleAccept = () => {
    setSelectedTropes(selectedTropesInModal)
    onClose()
  }

  const handleCancel = () => {
    setSelectedTropesInModal(selectedTropes)
    onClose()
  }

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <Error message="Error al cargar los tropes" />
  }

  return (
    <Modal visible={visible} transparent={true} onRequestClose={handleCancel}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Selecciona los tropes</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {Array.isArray(tropes) && tropes?.map((trope, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleTropeSelection(trope.name || trope)}
                style={[
                  styles.tropeBtn,
                  selectedTropesInModal?.includes(trope.name || trope) && styles.selectedTrope
                ]}
              >
                <Text
                  style={[
                    styles.tropeText,
                    selectedTropesInModal?.includes(trope.name || trope) && styles.selectedTropeText
                  ]}
                >
                  {trope.name || trope}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.modalBtnFullContainer}>
            <CustomButton
              title="Cancelar"
              onPress={handleCancel}
              style={[styles.modalBtn, styles.cancelModalBtn]}
              styleContainer={styles.modalBtnContainer}
              styleText={styles.cancelModalBtnText}
            />
            <CustomButton
              title="Aceptar"
              onPress={handleAccept}
              style={[styles.modalBtn, styles.acceptModalBtn]}
              styleContainer={styles.modalBtnContainer}
              styleText={styles.acceptModalBtnText}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(25, 25, 25, 0.6)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    width: "80%",
    marginTop: 124,
    marginBottom: 132,
    padding: 20,
    backgroundColor: colors.darkGray,
    borderRadius: 10,
    alignItems: "center"
  },
  modalTitle: {
    fontFamily: "Roboto-medium",
    fontSize: 18,
    marginBottom: 15,
    color: colors.white
  },
  tropeBtn: {
    height: 50,
    marginVertical: 5,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  tropeText: {
    fontFamily: "Roboto-regular",
    fontSize: 17,
    color: colors.white
  },
  selectedTrope: {
    backgroundColor: colors.skyBlue,
    borderColor: colors.skyBlue
  },
  selectedTropeText: {
    color: colors.black
  },
  modalBtnFullContainer: {
    width: "100%",
    marginBottom: -20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  modalBtnContainer: {
    width: "40%",
    marginHorizontal: 10
  },
  modalBtn: {
    backgroundColor: colors.darkGray,
    borderWidth: 1.5,
    borderRadius: 10
  },
  cancelModalBtn: {
    borderColor: colors.red
  },
  acceptModalBtn: {
    borderColor: colors.skyBlue
  },
  cancelModalBtnText: {
    color: colors.red
  },
  acceptModalBtnText: {
    color: colors.skyBlue
  }
})