import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from "react-native"
import { colors } from "../../global/colors.js"

export const ReadingFormatSelector = ({ readingFormats, selectedReadingFormat, onSelect, error = "" }) => {
  return (
    <View style={styles.formatContainer}>
      <Text style={styles.subtitle}>Formato</Text>
      <ScrollView 
        style={styles.formatScrollView}
        contentContainerStyle={styles.contentFormatContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {readingFormats.map((format) => (
          <TouchableOpacity
            style={[styles.formatBtn, selectedReadingFormat === format && styles.selectedFormatBtn]}
            key={format}
            onPress={() => onSelect(format)}
          >
            <Text style={[styles.formatBtnText, selectedReadingFormat === format && styles.selectedFormatBtnText]}>{format}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  formatContainer: {
    width: "100%",
    paddingHorizontal: 20
  },
  subtitle: {
    fontFamily: "Roboto-medium",
    fontSize: 17,
    color: colors.white
  },
  formatScrollView: {
    marginTop: 6,
    marginBottom: 16,
    marginHorizontal: -28
  },
  contentFormatContainer: {
    paddingHorizontal: 20
  },
  formatBtn: {
    width: 98,
    height: 50,
    marginHorizontal: 8,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center"
  },
  formatBtnText: {
    fontFamily: "Roboto-regular",
    fontSize: 17,
    color: colors.white
  },
  selectedFormatBtn: {
    backgroundColor: colors.skyBlue,
    borderColor: colors.skyBlue
  },
  selectedFormatBtnText: {
    color: colors.black
  },
  error: {
    fontFamily: "Roboto-regular-italic",
    fontSize: 15,
    marginTop: -6,
    marginBottom: 16,
    color: colors.red,
    textAlign: "center"
  }
})