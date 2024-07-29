import { StyleSheet, View } from "react-native"
import { colors } from "../../global/colors.js"
import { ProfileDetail } from "../../components/Profile/ProfileDetail.jsx"

export const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ProfileDetail navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.black
  }
})