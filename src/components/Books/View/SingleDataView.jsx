import { StyleSheet, View, Text } from "react-native"
import { colors } from "../../../global/colors.js"

export const SingleDataView = ({ value, text, format, genre, simpleView = false }) => {
  const formatColors = {
    "Físico": colors.green,
    "Digital": colors.skyBlue,
    "Wattpad": colors.orange,
    "Audiolibro": colors.yellow
  }

  const formatColor = formatColors[format]

  return (
    <>
      {value ? (
        <View style={styles.row}>
          <View style={styles.chaptersPages}>
            <Text style={styles.chaptersPagesText}>{value} {text}</Text>
          </View>
        </View>
      ) : (
        <View style={[
            !simpleView ? styles.formatContainer : styles.dataContainerSimpleView,
            { backgroundColor: format ? formatColor : colors.white}
          ]}
        >
          <Text style={[!simpleView ? styles.formatText : styles.dataTextSimpleView]}>{format} {genre}</Text>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  row: {
    width: "50%",
    paddingHorizontal: 20
  },
  chaptersPages: {
    height: 50,
    marginTop: -6,
    marginBottom: 24,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center"
  },
  chaptersPagesText: {
    fontFamily: "Roboto-regular-italic",
    fontSize: 17,
    color: colors.white
  },
  formatContainer: {
    width: "40%",
    height: 50,
    marginBottom: 20,
    marginHorizontal: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  formatText: {
    fontFamily: "Roboto-regular",
    fontSize: 17,
    color: colors.black
  },
  dataContainerSimpleView: {
    marginBottom: 4,
    marginRight: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    color: colors.black,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  dataTextSimpleView: {
    fontFamily: "Roboto-medium",
    fontSize: 12,
    color: colors.black
  }
})