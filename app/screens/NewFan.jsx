import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from "react-native";
import tw from "../lib/tailwind";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/auth.slice";
import { registerFan } from "../redux/features/fan.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { alertModal } from "../helpers/utils";

const Gender = [
  {
    title: "Gender",
    data: ["Male", "Female"],
  },
];

const Item = ({ title }) => (
  <View style={tw``}>
    <Text style={tw``}>{title}</Text>
  </View>
);

const NewFan = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(null);

  //console.log(currentUser, "volunteer is saved bro!!");
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    createdBy: "",
  };
  const [fan, setFan] = useState(initialState);
  const { loading } = useSelector((state) => state.fan);
  const dispatch = useDispatch();

  const handleHome = () => {
    navigation.navigate("home");
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleSubmit = () => {
    const tickets = [{ ticketNo: fan.ticket, ticketDate: new Date() }];
    const payload = { ...fan, createdBy: currentUser._id, tickets };
    // console.log(payload, "payload");
    dispatch(registerFan({ payload, AsyncStorage, alertModal }));
  };
  useEffect(() => {
    AsyncStorage.getItem("user").then((res) => {
      if (res !== null) {
        console.log(JSON.parse(res).data.accessToken);
        setCurrentUser(JSON.parse(res).data.User);
      }
    });
  }, []);

  return (
    <SafeAreaView style={tw`bg-secondary h-full relative`}>
      <ScrollView style={tw`flex flex-col bg-secondary`}>
        <View style={tw`h-[200px] flex flex-col justify-end pb-5`}>
          <View style={tw`flex flex-row justify-between items-center px-6`}>
            <Pressable onPress={handleHome}>
              <Image source={require("../assets/icons/home.png")} style={tw``} />
            </Pressable>
            <Text style={tw`text-[#fff] font-bold text-2xl`}>New Fan</Text>

            <Pressable onPress={handleLogout}>
              <Image source={require("../assets/hifl_icon.png")} style={tw`w-[50px]`} />
            </Pressable>
          </View>
        </View>

        <View style={tw` bg-[#fff] rounded-t-[25px] py-5 px-6`}>
          <View style={tw`my-6`}>
            <TextInput
              style={tw`py-3 text-sm border w-full border-[#E5E5E5] focus:border-primary rounded px-4 mb-6 focus:outline-none`}
              placeholder="First Name"
              name="firstName"
              onChangeText={(value) => setFan({ ...fan, firstName: value })}
              value={fan.firstName}
              autoComplete="off"
            />
            <TextInput
              style={tw`py-3 text-sm border w-full border-[#E5E5E5] focus:border-primary rounded px-4 mb-6 focus:outline-none`}
              placeholder="Last Name"
              name="lastName"
              onChangeText={(value) => setFan({ ...fan, lastName: value })}
              value={fan.lastName}
              autoComplete="off"
            />
            <TextInput
              style={tw`py-3 text-sm border w-full border-[#E5E5E5] focus:border-primary rounded px-4 mb-6 focus:outline-none`}
              placeholder="Phone Number"
              name="phoneNumber"
              onChangeText={(value) => setFan({ ...fan, phoneNumber: value })}
              value={fan.phoneNumber}
              keyboardType="number-pad"
              maxLength={11}
              autoComplete="off"
            />
            <TextInput
              style={tw`py-3 text-sm border w-full border-[#E5E5E5] focus:border-primary rounded px-4 mb-6 focus:outline-none`}
              placeholder="Email Address"
              name="email"
              onChangeText={(value) => setFan({ ...fan, email: value })}
              value={fan.email}
              keyboardType="email-address"
              autoComplete="off"
            />

            <TextInput
              style={tw`py-3 text-sm border w-full border-[#E5E5E5] focus:border-primary rounded px-4 mb-10 focus:outline-none`}
              placeholder="Ticket Number"
              name="ticket"
              onChangeText={(value) => setFan({ ...fan, ticket: value })}
              value={fan.ticket}
              secureTextEntry
              keyboardType="number-pad"
              autoComplete="off"
            />
            <TouchableOpacity
              style={tw`py-4 w-full bg-primary flex flex-row justify-center rounded-md`}
              activeOpacity={0.7}
              // disabled={}
              onPress={handleSubmit}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={tw`text-[#fff] text-sm font-bold capitalize`}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewFan;
