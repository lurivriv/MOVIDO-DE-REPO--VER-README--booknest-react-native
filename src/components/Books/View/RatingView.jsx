import { StyleSheet, View, Text } from "react-native"
import { AntDesign, Ionicons } from "@expo/vector-icons"
import { colors } from "../../../global/colors.js"

const emotions = [
  { type: "romance", iconFilled: "heart", iconOutline: "hearto", iconLib: AntDesign, color: colors.red },
  { type: "hot", iconFilled: "flame", iconOutline: "flame-outline", iconLib: Ionicons, color: colors.orange },
  { type: "sadness", iconFilled: "water", iconOutline: "water-outline", iconLib: Ionicons, color: colors.skyBlue },
  { type: "fun", iconFilled: "happy", iconOutline: "happy-outline", iconLib: Ionicons, color: colors.green }
]

export const RatingView = ({ type, rating, style, styleIcon, simpleView = false }) => {
  const maxStars = 5

  return (
    <View style={!simpleView && styles.ratingContainer}>
      {type === "star" ? (
        <View style={[styles.ratingItem, style]}>
          {[...Array(maxStars)].map((_, index) => (
            <AntDesign
              style={styleIcon}
              key={index}
              name={index < rating ? "star" : "staro"}
              size={!simpleView ? 36 : 19}
              color={colors.yellow}
            />
          ))}
        </View>
      ) : (
        <>
          <Text style={styles.subtitle}>Emociones</Text>
          {emotions?.map(({ type: emotionType, iconFilled, iconOutline, iconLib: Icon, color }) => (
            <View key={emotionType} style={[styles.ratingItem, style]}>
              {[...Array(maxStars)].map((_, value) => (
                <Icon
                  style={styleIcon}
                  key={value}
                  name={rating[emotionType] >= value + 1 ? iconFilled : iconOutline}
                  color={color}
                  size={36}
                />
              ))}
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
    marginBottom: 12,
    paddingHorizontal: 20
  },
  ratingItem: {
    flexDirection: "row",
    justifyContent: "center"
  },
  subtitle: {
    fontFamily: "Roboto-medium",
    fontSize: 17,
    marginBottom: 6,
    color: colors.white,
    textAlign: "center"
  }
})