import { StyleSheet, View, ScrollView, Text } from "react-native"
import { colors } from "../../global/colors.js"
import { Titles } from "../Home/Titles.jsx"
import { BookItem } from "../Books/BookItem.jsx"

export const ScrollHorizontalBooksList = ({ navigation, title, noBooksText, data, onPress }) => {
  const sortedData = data.sort((a, b) => new Date(b.endDate) - new Date(a.endDate))

  return (
    <View style={styles.container}>
      <Titles title={title} onPress={onPress} />
      {sortedData?.length === 0 ? (
        <Text style={styles.noBooksText}>{noBooksText}</Text>
      ) : ( 
        <ScrollView
          style={styles.scrollViewHorizontal}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {sortedData.map((book, index) => (
            <BookItem
              key={book.id}
              book={book}
              navigation={navigation}
              simpleView={true}
              isFirstItem={index === 0}
              isLastItem={index === sortedData.length - 1}
            />
          ))}
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 20
  },
  scrollViewHorizontal: {
    marginHorizontal: -20
  },
  contentContainer: {
    paddingHorizontal: 20
  },
  noBooksText: {
    fontFamily: "Roboto-regular",
    fontSize: 18,
    marginTop: 20,
    color: colors.lightGray,
    textAlign: "center"
  }
})