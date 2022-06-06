import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Home from "../screens/Home";
import NewFan from "../screens/NewFan";
import FanDetail from "../screens/FanDetail";

const RootStack = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={Login}
          options={{ title: "", headerShown: false }}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={{ title: "", headerShown: false }}
        />
        <Stack.Screen
          name="newFan"
          component={NewFan}
          options={{ title: "", headerShown: false }}
        />
        <Stack.Screen
          name="fanDetail"
          component={FanDetail}
          options={{ title: "", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
