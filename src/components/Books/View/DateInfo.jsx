import { StyleSheet, View, Text } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { colors } from "../../../global/colors.js"

export const DateInfo = ({ label, date }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.subtitle}>{label}</Text>
      <View style={styles.date}>
        <Text style={styles.dateText}>{new Date(date).toLocaleDateString()}</Text>
        <AntDesign name="calendar" size={20} color={colors.white} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    width: "50%",
    paddingHorizontal: 20
  },
  subtitle: {
    fontFamily: "Roboto-medium",
    fontSize: 17,
    color: colors.white
  },
  date: {
    height: 50,
    marginTop: 6,
    marginBottom: 26,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: colors.lightGray,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dateText: {
    fontFamily: "Roboto-regular",
    fontSize: 17,
    color: colors.white
  }
})