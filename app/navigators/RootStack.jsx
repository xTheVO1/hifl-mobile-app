import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";

import Login from "../screens/Login";
import Home from "../screens/Home";
import NewFan from "../screens/NewFan";
import FanDetail from "../screens/FanDetail";
import AppLoading from "expo-app-loading";
import { setUser } from "../redux/features/auth.slice";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RootStack = () => {
  const [appReady, setAppReady] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const Stack = createNativeStackNavigator();

  const persistUser = () => {
    AsyncStorage.getItem("user")
      .then((res) => {
        if (res !== null) {
          console.log("logged in");
          dispatch(setUser(JSON.parse(res)));
        }
      })
      .catch((e) => console.log(e));
  };

  //keep showing the splash icon until the app determines if the user is logged in or not
  if (!appReady) {
    return <AppLoading startAsync={persistUser} onFinish={() => setAppReady(true)} onError={console.warn} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ presentation: "transparentModal" }} initialRouteName="login">
        {!user ? (
          <Stack.Screen name="login" component={Login} options={{ title: "", headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="home" component={Home} options={{ title: "", headerShown: false }} />
            <Stack.Screen name="newFan" component={NewFan} options={{ title: "", headerShown: false }} />
            <Stack.Screen name="fanDetail" component={FanDetail} options={{ title: "", headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
