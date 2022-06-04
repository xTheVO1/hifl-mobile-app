import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import tw from "../lib/tailwind";

import Login from "../screens/Login";
import Home from "../screens/Home";
import NewFan from "../screens/NewFan";
import UpdateFan from "../screens/UpdateFan";

const RootStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      {/* <View style={tw`flex flex-row bg-secondary justify-center h-full`}> */}
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{ headerShown: false, presentation: "transparentModal" }}
      >
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="newFan" component={NewFan} />
        <Stack.Screen name="updateFan" component={UpdateFan} />
      </Stack.Navigator>
      {/* </View> */}
    </NavigationContainer>
  );
};

export default RootStack;
