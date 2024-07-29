import { NavigationContainer } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { BottomTabNavigator } from "./BottomTabNavigator.jsx"
import { AuthStackNavigator } from "./AuthStackNavigator.jsx"

export const Navigator = () => {
  const { user } = useSelector(state => state.auth.value)

  return (
    // <NavigationContainer>
    //   {user ? <BottomTabNavigator /> : <AuthStackNavigator />}
    // </NavigationContainer>
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  )
}