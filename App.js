import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { DefaultTheme } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useDeviceContext } from "twrnc";
import tw from "twrnc";
import { useFonts } from "expo-font";
import RootStack from "./app/navigators/RootStack";
import { Provider, useDispatch } from "react-redux";
import { store } from "./app/redux/store";
import { setUser } from "./app/redux/features/auth.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const App = () => {
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
    <Provider store={store}>
      <StatusBar backgroundColor="#F4F4F4" />
      <RootStack />
    </Provider>
  );
};

export default App;
