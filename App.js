import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./app/screens/splashscreen";

const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};
export default function App() {
  const [loaded] = useFonts({
    InterBold: require("./app/assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./app/assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./app/assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./app/assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./app/assets/fonts/Inter-Light.ttf"),
  });

  if (!loaded) return null;
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screnOptions={{ headerShown: false }}
        initialRouteName="splashscreen"
      >
        <Stack.Screen name="splashscreen" component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
