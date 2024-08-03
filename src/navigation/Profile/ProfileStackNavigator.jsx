import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { colors } from "../../global/colors.js"
import { Profile } from "../../screens/Profile/Profile.jsx"
import { ImgSelector } from "../../screens/ImgSelector.jsx"

const Stack = createNativeStackNavigator()

export const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerTitleStyle: { fontFamily: "Roboto-medium" },
        headerStyle: {
          backgroundColor: colors.darkGray,
          borderBottomColor: colors.darkGray,
        },
        headerTintColor: colors.white
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Perfil" }}
      />
      <Stack.Screen
        name="ImgSelector"
        component={ImgSelector}
        options={{ title: "Seleccionar imagen" }}
      />
    </Stack.Navigator>
  )
}