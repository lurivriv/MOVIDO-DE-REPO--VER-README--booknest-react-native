import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { colors } from "../../global/colors.js"
import { Home } from "../../screens/Home/Home.jsx"
import { FavoriteBooksList } from "../../screens/Home/FavoriteBooksList.jsx"
import { BooksByGenreList } from "../../screens/Home/BooksByGenreList.jsx"

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
        options={{ title: "Booknest" }}
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
    </Stack.Navigator>
  )
}