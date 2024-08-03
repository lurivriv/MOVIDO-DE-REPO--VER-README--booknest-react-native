import { NavigationContainer } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { AuthStackNavigator } from "./AuthStackNavigator.jsx"
import { BottomTabNavigator } from "./BottomTabNavigator.jsx"

export const Navigator = () => {
  const { user } = useSelector(state => state.auth.value)

  return (
    <NavigationContainer>
      {user ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  )
}