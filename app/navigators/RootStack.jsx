import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login, Home, NewFan, FanDetail } from "../screens";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/auth.slice";

const RootStack = () => {
  const [appReady, setAppReady] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const Stack = createNativeStackNavigator();

  // const persistUser = () => {
  //   AsyncStorage.getItem("user")
  //     .then((res) => {
  //       if (res !== null) {
  //         console.log("logged in");
  //         dispatch(setUser(JSON.parse(res.data)));
  //       }
  //     })
  //     .catch((e) => console.log(e, "errrr"));
  // };

  //keep showing the splash icon until the app determines if the user is logged in or not
  // if (!appReady) {
  //   return <AppLoading startAsync={persistUser} onFinish={() => setAppReady(true)} onError={console.warn} />;
  // }

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await AsyncStorage.getItem("user").then((res) => {
          if (res !== null) {
            // console.log(JSON.parse(res).data, "logged in");
            dispatch(setUser(JSON.parse(res).data));
          }
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
        await SplashScreen.hideAsync();
        // console.log(user, "userrrrrrrrr");
      }
    }

    prepare();
  }, []);

  if (!appReady) {
    return null;
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
