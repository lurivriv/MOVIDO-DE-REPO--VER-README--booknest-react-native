import { StyleSheet, View, Text, Pressable } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { colors } from "../../global/colors.js"
import { CustomButton } from "../CustomButton.jsx"

export const Titles = ({ title, onPress }) => {
  return (
    <Pressable style={({ pressed }) => [styles.titleContainer, pressed && styles.pressedBtn]} onPress={onPress}>
      <View style={styles.titleContent}>
        <Text style={styles.titleText}>{title}</Text>
        <CustomButton
          title="Ver"
          onPress={onPress}
          icon={<AntDesign name="right" size={19} color={colors.skyBlue} />}
          style={styles.titleBtn}
          styleContainer={styles.containerBtn}
          styleText={styles.textBtn} />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: -12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray
  },
  pressedBtn: {
    transform: [{ scale: 0.95 }]
  },
  titleContent: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleText: {
    fontFamily: "Roboto-medium",
    fontSize: 19,
    flex: 1,
    color: colors.white
  },
  containerBtn: {
    width: "22%",
    margin: 0
  },
  titleBtn: {
    height: "auto",
    paddingVertical: 8,
    backgroundColor: colors.black,
    justifyContent: "space-between"
  },
  textBtn: {
    color: colors.skyBlue
  }
})