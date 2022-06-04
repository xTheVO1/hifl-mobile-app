import React from "react";
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

const UpdateFan = () => {
  return (
    <SafeAreaView style={tw`bg-secondary h-full relative`}>
      <ScrollView style={tw`flex flex-col bg-secondary`}>
        <View style={tw`h-[200px] flex flex-col justify-end pb-5`}>
          <View style={tw`flex flex-row justify-between items-center px-6`}>
            <Image source={require("../assets/icons/home.png")} style={tw``} />
            <Text style={tw`text-[#fff] font-bold text-2xl`}>Update Fan</Text>
            <Image source={require("../assets/hifl_icon.png")} style={tw`w-[50px]`} />
          </View>
        </View>

        <View style={tw`h-[498px] bg-[#fff] rounded-t-[25px] py-15 px-6`}>
          <View style={tw``}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateFan;
