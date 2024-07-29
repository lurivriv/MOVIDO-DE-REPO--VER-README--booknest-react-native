import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Login } from "../screens/Login.jsx"
import { Signup } from "../screens/Signup.jsx"

const Stack = createNativeStackNavigator()

export const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        component={Login}
        name="Login"
      />
      <Stack.Screen
        component={Signup}
        name="Signup"
      />
    </Stack.Navigator>
  )
}