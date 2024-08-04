import { Navigator } from "./src/navigation/Navigator.jsx"

export default function App() {
  StatusBar.setBackgroundColor(colors.black)
  StatusBar.setBarStyle("light-content")

  const [fontsLoaded, fontError] = useFonts({
    "Roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-regular-italic": require("./assets/fonts/Roboto-Italic.ttf"),
	@@ -27,7 +25,7 @@ export default function App() {
      <Provider store={store}>
        <Navigator />
      </Provider>
      <Toast />
    </SafeAreaView>
  )
}
