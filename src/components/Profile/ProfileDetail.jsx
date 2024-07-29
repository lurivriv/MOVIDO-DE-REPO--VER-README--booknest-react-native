import { StyleSheet, View, Text } from "react-native"
import { colors } from "../../global/colors.js"

export const ProfileDetail = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.profileText}>PERFIL</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  profileText: {
    color: colors.white
  }
})