import { StyleSheet, View, Text } from "react-native"
import { colors } from "../global/colors.js"

export const Error = ({ message }) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center"
  },
  errorText: {
    fontFamily: "Roboto-regular",
    fontSize: 16,
    color: colors.red,
    textAlign: "center"
  }
})