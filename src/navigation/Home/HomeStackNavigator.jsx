import { StyleSheet, View, Image } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { colors } from "../../global/colors.js"
import { Home } from "../../screens/Home/Home.jsx"
import { FavoriteBooksList } from "../../screens/Home/FavoriteBooksList.jsx"
import { BooksByGenreList } from "../../screens/Home/BooksByGenreList.jsx"
import { BookDetail } from "../../screens/Books/BookDetail.jsx"

const Stack = createNativeStackNavigator()

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleStyle: { fontFamily: "Roboto-medium" },
        headerStyle: {
          backgroundColor: colors.darkGray,
          borderBottomColor: colors.darkGray
        },
        headerTintColor: colors.white
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => (
            <View style={styles.logoImgContainer}>
              <Image style={styles.logoImg} source={require("../../../assets/logo.png")} resizeMode="contain" />
            </View>
          )
        }}
      />
      <Stack.Screen
        name="FavoriteBooksList"
        component={FavoriteBooksList}
        options={{ title: "Tus favoritos" }}
      />
      <Stack.Screen
        name="BooksByGenreList"
        component={BooksByGenreList}
        options={({ route }) => ({ title: route.params?.genre })}
      />
      <Stack.Screen
        name="BookDetail"
        component={BookDetail}
        options={{ title: "Detalle del libro" }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  logoImgContainer: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  logoImg: {
    width: "37%",
    height: "100%"
  }
})