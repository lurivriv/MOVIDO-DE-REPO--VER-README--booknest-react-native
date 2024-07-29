import { StyleSheet, View, Text } from "react-native"
import { colors } from "../../../global/colors.js"

export const TextAreaView = ({ title, content }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{title}</Text>
      <View style={styles.content}>
        <Text style={styles.text}>{content}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 20
  },
  subtitle: {
    fontFamily: "Roboto-medium",
    fontSize: 17,
    color: colors.white
  },
  content: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.darkGray,
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: colors.lightGray
  },
  text: {
    fontFamily: "Roboto-regular",
    fontSize: 17,
    color: colors.white
  }
})