import { StyleSheet, View, Pressable, Text } from "react-native"
import { colors } from "../global/colors.js"

export const CustomButton = ({
  title,
  onPress,
  icon,
  style = {},
  styleContainer = {},
  styleText = {}
}) => {
  return (
    <View style={[styles.btnContainer, styleContainer]}>
      <Pressable 
        style={({ pressed }) => [styles.btn, pressed && styles.pressedBtn, style]}
        onPress={onPress}
      >
        <Text style={[styles.textBtn, styleText]}>{title}</Text>
        {icon && <View>{icon}</View>}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    margin: 20,
    alignItems: "center"
  },
  btn: {
    width: "100%",
    height: 50,
    backgroundColor: colors.skyBlue,
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  textBtn: {
    fontFamily: "Roboto-medium",
    fontSize: 16,
    color: colors.black
  },
  pressedBtn: {
    transform: [{ scale: 0.95 }]
  }
})