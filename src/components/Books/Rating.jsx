import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import StarRating from "react-native-star-rating-widget"
import { AntDesign, Ionicons } from "@expo/vector-icons"
import { colors } from "../../global/colors.js"

const emotions = [
  { type: "romance", iconFilled: "heart", iconOutline: "hearto", iconLib: AntDesign, color: colors.red },
  { type: "hot", iconFilled: "flame", iconOutline: "flame-outline", iconLib: Ionicons, color: colors.orange },
  { type: "sadness", iconFilled: "water", iconOutline: "water-outline", iconLib: Ionicons, color: colors.skyBlue },
  { type: "fun", iconFilled: "happy", iconOutline: "happy-outline", iconLib: Ionicons, color: colors.green }
]

export const Rating = ({ type, rating, onRatingChange }) => {
  const handleRatingChange = (value, emotionType) => onRatingChange(emotionType || "star", value)

  return (
    <View style={styles.ratingContainer}>
      {type === "star" ? (
        <>          
          <View style={styles.ratingItem}>
            <StarRating
              rating={rating}
              onChange={value => handleRatingChange(value, "star")}
              color={colors.yellow}
              starSize={40}
            />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>Emociones</Text>
          {emotions?.map(({ type, iconFilled, iconOutline, iconLib: Icon, color }) => (
            <View key={type}>              
              <View style={styles.ratingItem}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <TouchableOpacity
                    style={styles.ratingBtn}
                    key={value}
                    onPress={() => handleRatingChange(value, type)}
                  >
                    <Icon 
                      name={rating[type] >= value ? iconFilled : iconOutline}
                      color={color}
                      size={36}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  ratingContainer: {
    width: "100%",
    paddingHorizontal: 20
  },
  subtitle: {
    fontFamily: "Roboto-medium",
    fontSize: 17,
    marginBottom: 6,
    color: colors.white,
    textAlign: "center"
  },
  ratingItem: {
    marginTop: 6,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "center"
  },
  ratingBtn: {
    marginHorizontal: 12
  }
})