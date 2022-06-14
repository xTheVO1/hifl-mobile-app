import React from "react";
import { View, Text } from "react-native";
import tw from "../lib/tailwind";

const EmptyList = () => {
  return (
    <View style={tw`flex flex-row justify-center items-center`}>
      <Text>You have not registered a fan</Text>
    </View>
  );
};

export default EmptyList;
