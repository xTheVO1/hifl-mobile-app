import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import React from "react";
import FocusedStatusBar from "../components/FocusedStatusBar";
import { COLORS, assets } from "../constants";
import tw from "../lib/tailwind";

const SplashScreen = () => {
  return (
    <SafeAreaView style={tw`flex flex-row justify-center items-center h-full bg-[#000000] px-10`}>
      <Text style={tw`text-accent font-bold text-4xl text-center`}>Hello, welcome to HiFL App</Text>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   safearea: {
//     flex: 1,
//     backgroundColor: COLORS.primary,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   focusedStatusBar: {
//     backgroundColor: COLORS.primary,
//   },
//   main: {
//     flex: 1,
//     backgroundColor: COLORS.primary,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logo: { position: "absolute", width: "50%", height: "50%" },
// });

export default SplashScreen;
