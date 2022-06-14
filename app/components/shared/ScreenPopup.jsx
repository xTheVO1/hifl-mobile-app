import React from "react";
import { View, Text, Image, Modal } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import tw from "../../lib/tailwind";

const ScreenPopup = ({ type, message, visible, onClose }) => {
  const src =
    type == "error" ? require("../../assets/icons/close_square.png") : require("../../assets/icons/tick_square.png");

  // useFocusEffect(
  //   useCallback(() => {
  //     // Do something when the screen is focused
  //     const timer = setTimeout(() => {
  //       navigate("home");
  //     }, 2000);
  //     return () => {
  //       // Do something when the screen is unfocused
  //       clearTimeout(timer);
  //     };
  //   }, [])
  // );

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
      onShow={() => console.log("modal shown")}
      statusBarTranslucent
    >
      <View style={tw`flex flex-row justify-center items-center h-full`}>
        <View style={tw`flex flex-col items-center px-8`}>
          <Image source={src} style={tw`w-[120px] h-[120px]`} />
          <Text style={tw`text-secondary font-bold text-3xl my-3`}>{type == "error" ? "Ooopsy!!" : "Awesome!"}</Text>
          <Text style={tw`text-secondary font-semibold text-base text-center`}>
            {type == "error"
              ? "Sorry, there was an error with your request. Please try again."
              : message
              ? message
              : "Fan was successfully created."}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default ScreenPopup;
