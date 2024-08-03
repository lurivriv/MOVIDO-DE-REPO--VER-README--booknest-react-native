import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { colors } from "../../global/colors.js"
import { Books } from "../../screens/Books/Books.jsx"
import { BookDetail } from "../../screens/Books/BookDetail.jsx"
import { CustomBook } from "../../screens/Books/CustomBook.jsx"
import { ImgSelector } from "../../screens/ImgSelector.jsx"

const Stack = createNativeStackNavigator()

export const BooksStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Books"
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
        name="Books"
        component={Books}
        options={{ title: "Libros" }}
      />
      <Stack.Screen
        name="BookDetail"
        component={BookDetail}
        options={{ title: "Detalle del libro" }}
      />
      <Stack.Screen
        name="CustomBook"
        component={CustomBook}
        options={({ route }) => ({ title: route.params?.bookId ? "Actualizar libro" : "Agregar libro" })}
      />
      <Stack.Screen
        name="ImgSelector"
        component={ImgSelector}
        options={{ title: "Seleccionar imagen" }}
      />
    </Stack.Navigator>
  )
}