import { StatusBar } from "expo-status-bar";
import { DefaultTheme } from "@react-navigation/native";
import { useDeviceContext } from "twrnc";
import tw from "twrnc";
import { useFonts } from "expo-font";
import RootStack from "./app/navigators/RootStack";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};
export default function App() {
  useDeviceContext(tw);

  const [loaded] = useFonts({
    InterBold: require("./app/assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./app/assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./app/assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./app/assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./app/assets/fonts/Inter-Light.ttf"),
  });

  if (!loaded) return null;
  return (
    <>
      <StatusBar backgroundColor="#F4F4F4" />
      <RootStack />
    </>
  );
}
