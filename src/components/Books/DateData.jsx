import { useState } from "react"
import { StyleSheet, View, Text, Platform } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { AntDesign } from "@expo/vector-icons"
import { colors } from "../../global/colors.js"
import { CustomButton } from "../CustomButton.jsx"

export const DateData = ({ subtitle, date, setDate }) => {
  const [showPicker, setShowPicker] = useState(false)

  const handleDateChange = (_, selectedDate) => {
    setShowPicker(false)
    selectedDate && setDate(selectedDate)
  }

  return (
    <View style={styles.dateContainer}>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <CustomButton
        title={date.toLocaleDateString()}
        onPress={() => setShowPicker(true)}
        icon={<AntDesign name="edit" size={20} color={colors.skyBlue} />}
        style={styles.dateBtn}
        styleContainer={styles.dateBtnContainer}
        styleText={styles.dateBtnText}
      />
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  dateContainer: {
    width: "50%",
    paddingHorizontal: 20
  },
  subtitle: {
    fontFamily: "Roboto-medium",
    fontSize: 17,
    color: colors.white
  },
  dateBtnContainer: {
    margin: 0
  },
  dateBtn: {
    height: 50,
    marginTop: 6,
    marginBottom: 16,
    paddingHorizontal: 14,
    backgroundColor: colors.black,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: colors.lightGray,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dateBtnText: {
    fontFamily: "Roboto-regular",
    fontSize: 17,
    color: colors.white
  }
})