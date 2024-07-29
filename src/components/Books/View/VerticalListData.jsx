import { StyleSheet, View, Text } from "react-native"
import { Feather } from "@expo/vector-icons"
import { colors } from "../../../global/colors.js"

export const VerticalListData = ({ title, items, icon, columns = true }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{title}</Text>
      <View style={styles.row}>
        {items?.map((item, index) => (
          <View key={index} style={[styles.item, !columns && styles.itemQuote]}>
            {icon && <Feather style={styles.icon} name={icon} size={20} />}
            <Text style={[styles.text, !columns && styles.textQuote]}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 20
  },
  subtitle: {
    fontFamily: "Roboto-medium",
    fontSize: 17,
    color: colors.white
  },
  row: {
    marginTop: 6,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  item: {
    width: "46%",
    marginTop: 12,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  itemQuote: {
    width: "100%"
  },
  icon: {
    marginTop: 3,
    marginRight: 8,
    color: colors.skyBlue
  },
  text: {
    fontFamily: "Roboto-regular",
    fontSize: 17,
    color: colors.white,
    flexShrink: 1
  },
  textQuote: {
    fontFamily: "Roboto-regular-italic"
  }
})