import { StyleSheet, View, ScrollView, Text } from "react-native"
import { colors } from "../../../global/colors.js"

export const HorizontalListData = ({ title, items, renderItem, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.subtitle}>{title}</Text>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {items?.map((item, index) => (
          <View style={styles.itemContainer} key={index}>
            <Text style={styles.itemText}>{renderItem(item, index)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  subtitle: {
    fontFamily: "Roboto-medium",
    fontSize: 17,
    color: colors.white
  },
  scrollView: {
    marginTop: -10,
    marginBottom: 16,
    marginHorizontal: -28
  },
  contentContainer: {
    paddingHorizontal: 20
  },
  itemContainer: {
    height: 50,
    marginTop: 16,
    marginBottom: 12,
    marginHorizontal: 8,
    paddingHorizontal: 14,
    backgroundColor: colors.white,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemText: {
    fontFamily: "Roboto-regular",
    fontSize: 17,
    color: colors.black
  }
})