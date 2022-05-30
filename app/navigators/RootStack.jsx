import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/splashscreen";

const RootStack = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="splashscreen" component={SplashScreen} options={{ title: "", headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
