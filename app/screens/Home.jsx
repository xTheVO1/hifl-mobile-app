import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  Pressable,
} from "react-native";
import tw from "../lib/tailwind";

const Home = ({ navigation }) => {
  const initialState = { email: "", password: "" };
  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    console.log("Clicked");
  };

  const createNewFan = () => {
    navigation.navigate("newFan");
  };

  return (
    <SafeAreaView style={tw`bg-secondary h-full relative`}>
      <ScrollView style={tw`flex flex-col bg-secondary`}>
        <View style={tw`h-[200px] flex flex-col justify-end pb-5`}>
          <View style={tw`flex flex-row justify-between items-center px-6`}>
            <Text style={tw`text-[#fff] font-bold text-2xl`}>Hi Feji</Text>
            <Image source={require("../assets/hifl_icon.png")} style={tw`w-[50px]`} />
          </View>
        </View>

        <View style={tw`h-[498px] bg-[#fff] rounded-t-[25px] py-15 px-6`}>
          <View style={tw``}></View>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={createNewFan} style={tw`absolute bottom-8 right-6`}>
          <Image source={require("../assets/icons/add.png")} style={tw`w-[60px] h-[60px]`} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
