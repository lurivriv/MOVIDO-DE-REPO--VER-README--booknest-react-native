import { StyleSheet, View } from "react-native"
import { colors } from "../../global/colors.js"
import { BookForm } from "../../components/Books/BookForm.jsx"

export const CustomBook = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <BookForm navigation={navigation} route={route} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black
  }
})