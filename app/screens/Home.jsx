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
  FlatList,
} from "react-native";
import tw from "../lib/tailwind";
const DATA = [
  {
    id: "908",
    firstName: "Victor",
    lastName: "Olaitan",
    phoneNumber: "0908098765",
    email: "vivo@gmail.com",
  },
  {
    id: "108",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "0809876543",
    email: "jdoe@gmail.com",
  },
  {
    id: "0098",
    firstName: "Jane",
    lastName: "Doe",
    phoneNumber: "08156533938",
    email: "janedoe@gmail.com",
  },
  {
    id: "978",
    firstName: "Victor",
    lastName: "Olaitan",
    phoneNumber: "0908098765",
    email: "vivo@gmail.com",
  },
  {
    id: "208",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "0809876543",
    email: "jdoe@gmail.com",
  },
  {
    id: "098",
    firstName: "Jane",
    lastName: "Doe",
    phoneNumber: "08156533938",
    email: "janedoe@gmail.com",
  },
  {
    id: "9008",
    firstName: "Victor",
    lastName: "Olaitan",
    phoneNumber: "0908098765",
    email: "vivo@gmail.com",
  },
  {
    id: "1083",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "0809876543",
    email: "jdoe@gmail.com",
  },
  {
    id: "134",
    firstName: "Jane",
    lastName: "Doe",
    phoneNumber: "08156533938",
    email: "janedoe@gmail.com",
  },
  {
    id: "9748",
    firstName: "Victor",
    lastName: "Olaitan",
    phoneNumber: "0908098765",
    email: "vivo@gmail.com",
  },
  {
    id: "2058",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "0809876543",
    email: "jdoe@gmail.com",
  },
  {
    id: "04968",
    firstName: "Jane",
    lastName: "Doe",
    phoneNumber: "08156533938",
    email: "janedoe@gmail.com",
  },
];

const Item = ({ firstName, lastName }) => (
  <View style={tw`w-full p-5 my-1 flex flex-col content-center bg-[#FAFAFA]`}>
    <View style={tw`flex flex-row justify-between`}>
      <View style={tw`flex flex-row `}>
        <Image
          source={require("../assets/icons/girl.png")}
          style={tw`w-[48px] h-[48px] mr-5`}
        />
        <View style={tw`flex flex-col content-center`}>
          <Text style={tw`text-[#000229] text-lg font-light	`}>
            {firstName} {lastName}
          </Text>
          <Text style={tw`text-xs text-[#0013FF] font-light	`}>10 TICKETS</Text>
        </View>
      </View>
      <View style={tw`flex flex-col `}>
        <Text style={tw`text-xs font-light`}>Last Updated</Text>
        <Text style={tw`text-xs	font-extralight	`}>June 01, 2022</Text>
      </View>
    </View>
  </View>
);

const Home = ({ navigation }) => {
  const initialState = { email: "", password: "" };
  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    navigation.navigate("newFan");
  };
  const handleFan = () => {
    navigation.navigate("fanDetail");
  };
  const renderItem = ({ item }) => (
    <Pressable onPress={handleFan}>
      <Item
        firstName={item.firstName}
        lastName={item.lastName}
        phoneNumber={item.phoneNumber}
      />
    </Pressable>
  );

  return (
    <SafeAreaView style={tw`bg-secondary h-full relative`}>
      <View style={tw`h-[200px] flex flex-col justify-end pb-5`}>
        <View style={tw`flex flex-row justify-between items-center px-6`}>
          <Text style={tw`text-[#fff] font-bold text-2xl`}>Hi Feji,</Text>
          <Image
            source={require("../assets/hifl_icon.png")}
            style={tw`w-[50px]`}
          />
        </View>
      </View>

      <View style={tw`h-[100%]  bg-[#fff] rounded-t-[25px] py-10 items-center`}>
        <TextInput
          style={tw`bg-[#FAFAFA]  py-3 text-sm border w-[90%] border-[#F4C316] focus:border-primary rounded-full px-4 mb-4 focus:outline-none`}
          placeholder="Find a fan!"
          name="search"
          keyboardType="email-address"
          autoComplete="off"
        />

        <View style={tw`my-8 w-full`}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleSubmit}
        style={tw`absolute bottom-8 right-6`}
      >
        <Image
          source={require("../assets/icons/add.png")}
          style={tw`w-[60px] h-[60px]`}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
