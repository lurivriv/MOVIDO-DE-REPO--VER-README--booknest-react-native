import { StyleSheet, View, Text, ActivityIndicator } from "react-native"
import { colors } from "../global/colors.js"

export const Loader = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.skyBlue} />
      <Text style={styles.loadingText}>Cargando...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingText: {
    fontFamily: "Roboto-regular",
    fontSize: 16,
    marginTop: 10,
    color: colors.skyBlue
  }
})