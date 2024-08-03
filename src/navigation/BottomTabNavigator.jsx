import { StyleSheet, View, Text } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons"
import { colors } from "../global/colors.js"
import { HomeStackNavigator } from "./Home/HomeStackNavigator.jsx"
import { BooksStackNavigator } from "./Books/BooksStackNavigator.jsx"
import { ProfileStackNavigator } from "./Profile/ProfileStackNavigator.jsx"

const Tab = createBottomTabNavigator()

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarHideOnKeyboard: true
      }}
    >
      <Tab.Screen
        name="HomeBtn"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: ({ focused }) => <Text style={focused ? styles.tabBarLabelActive : styles.tabBarLabelInactive}>Inicio</Text>,
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Ionicons name="home-outline" size={24} color={focused ? colors.skyBlue : colors.lightGray} />
              </View>
            )
          }
        }}
      />
      <Tab.Screen
        name="BooksBtn"
        component={BooksStackNavigator}
        options={{
          tabBarLabel: ({ focused }) => <Text style={focused ? styles.tabBarLabelActive : styles.tabBarLabelInactive}>Libros</Text>,
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <AntDesign name="book" size={24} color={focused ? colors.skyBlue : colors.lightGray} />
              </View>
            )
          }
        }}
      />
      <Tab.Screen
        name="ProfileBtn"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: ({ focused }) => <Text style={focused ? styles.tabBarLabelActive : styles.tabBarLabelInactive}>Perfil</Text>,
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <Feather name="user" size={24} color={focused ? colors.skyBlue : colors.lightGray}/>
              </View>
            )
          }
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    height: 64,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: colors.darkGray,
    borderTopColor: colors.darkGray
  },
  tabBarLabelActive: {
    fontFamily: "Roboto-medium",
    fontSize: 14,
    color: colors.skyBlue
  },
  tabBarLabelInactive: {
    fontFamily: "Roboto-regular",
    fontSize: 13,
    color: colors.lightGray
  }
})