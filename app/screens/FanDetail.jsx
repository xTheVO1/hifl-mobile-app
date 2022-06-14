import React, { useCallback, useState } from "react";
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
  SectionList,
} from "react-native";
import tw from "../lib/tailwind";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/auth.slice";
import { fetchSingleFan, updateFan } from "../redux/features/fan.slice";
import { format } from "date-fns";
import { useFocusEffect } from "@react-navigation/native";

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

const FanDetail = ({ navigation, route }) => {
  const initialState = {
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: undefined,
    Tickets: [{ TicketNo: "45678", TicketDate: "2022-06-08" }],
    NewTicket: "",
  };
  const [fan, setFan] = useState(initialState);
  const [open, setOpen] = useState(false);
  const { fanLoading } = useSelector((state) => state.fan);
  const dispatch = useDispatch();
  const fanId = route.params.id;

  const handleSubmit = () => {
    const date = format(new Date(), "yyyy-MM-dd");
    const ticket = fan.NewTicket ? [{ TicketNo: fan.NewTicket, TicketDate: date }] : "";
    const payload = {
      id: fanId,
      FirstName: fan.FirstName.trim(),
      LastName: fan.LastName.trim(),
      Email: fan.Email.trim(),
      Phoneumber: fan.PhoneNumber.trim(),
      Tickets: [...fan.Tickets, ...ticket],
    };
    console.log(payload);
    //dispatch(registerFan({ payload, AsyncStorage, alertModal, navigation }));
  };
  const handleHome = () => {
    navigation.navigate("home");
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  const addTicket = () => {
    setFanTickets([...fanTickets]);
  };

  const getSingleFan = () => {
    dispatch(fetchSingleFan({ fanId, setFan }));
  };

  useFocusEffect(
    useCallback(() => {
      getSingleFan();
      return () => {
        // add cleanup here to erase fan state
      };
    }, [])
  );

  return (
    <SafeAreaView style={tw`bg-secondary h-full relative`}>
      <ScrollView style={tw`flex flex-col`}>
        <View style={tw`h-[200px] bg-secondary flex flex-col justify-end pb-5`}>
          <View style={tw`flex flex-row justify-between items-center px-6`}>
            <Pressable onPress={handleHome}>
              <Image source={require("../assets/icons/home.png")} style={tw``} />
            </Pressable>
            <Text style={tw`text-[#fff] font-bold text-2xl`}> Fan Profile</Text>

            <Pressable onPress={handleLogout}>
              <Image source={require("../assets/hifl_icon.png")} style={tw`w-[50px]`} />
            </Pressable>
          </View>
        </View>

        <View style={tw`h-[100%] bg-[#fff] rounded-t-[25px] py-5 px-6`}>
          <View style={tw`flex flex-col  w-full h-[100%]`}>
            {fanLoading ? (
              <View style={tw`mt-10 flex justify-center items-center`}>
                <ActivityIndicator size="large" color="#000229" />
              </View>
            ) : (
              <View style={tw`my-6`}>
                <TextInput
                  style={tw`py-3 text-sm border w-full border-[#E5E5E5] focus:border-primary rounded px-4 mb-6 focus:outline-none`}
                  placeholder="First Name"
                  name="firstName"
                  onChangeText={(value) => setFan({ ...fan, FirstName: value })}
                  value={fan.FirstName}
                  autoComplete="off"
                />
                <TextInput
                  style={tw`py-3 text-sm border w-full border-[#E5E5E5] focus:border-primary rounded px-4 mb-6 focus:outline-none`}
                  placeholder="Last Name"
                  name="lastName"
                  onChangeText={(value) => setFan({ ...fan, LastName: value })}
                  value={fan.LastName}
                  autoComplete="off"
                />
                <TextInput
                  style={tw`py-3 text-sm border w-full border-[#E5E5E5] focus:border-primary rounded px-4 mb-6 focus:outline-none`}
                  placeholder="Phone Number"
                  name="phonenumber"
                  onChangeText={(value) => setFan({ ...fan, PhoneNumber: value })}
                  value={JSON.stringify(fan.PhoneNumber)}
                  keyboardType="number-pad"
                  maxLength={11}
                  autoComplete="off"
                />
                <TextInput
                  style={tw`py-3 text-sm border w-full border-[#E5E5E5] focus:border-primary rounded px-4 focus:outline-none`}
                  placeholder="Email Address"
                  name="email"
                  onChangeText={(value) => setFan({ ...fan, Email: value })}
                  value={fan.Email}
                  keyboardType="email-address"
                  autoComplete="off"
                />
                <View style={tw`flex flex-row border-b border-b-[#F4C316] mt-5 mb-5 justify-between content-center`}>
                  <Text style={tw`text-2xl font-bold`}>Tickets</Text>
                  <TouchableOpacity activeOpacity={0.7} onPress={() => setOpen(true)}>
                    <Image source={require("../assets/icons/added.png")} style={tw`w-[48px] h-[48px]`} />
                  </TouchableOpacity>
                </View>

                {open && (
                  <TextInput
                    style={tw`py-3 text-sm border w-full border-[#E5E5E5] focus:border-primary rounded px-4 mb-4 focus:outline-none`}
                    placeholder="Ticket Number"
                    name="ticket"
                    onChangeText={(value) => setFan({ ...fan, NewTicket: value })}
                    value={fan.NewTicket}
                    keyboardType="number-pad"
                    autoComplete="off"
                  />
                )}

                {/* display current tickets here as a box */}
                <TextInput
                  style={tw`py-3 text-sm border w-full border-[#E5E5E5] focus:border-primary rounded px-4 mb-10 focus:outline-none`}
                  placeholder="Ticket Number"
                  name="ticket"
                  onChangeText={(value) => setFan({ ...fan, ticket: value })}
                  value={fan.Tickets[0].TicketNo}
                  keyboardType="number-pad"
                  autoComplete="off"
                />

                <TouchableOpacity
                  style={tw`py-4 w-full bg-primary flex flex-row justify-center rounded-md`}
                  activeOpacity={0.7}
                  // disabled={}
                  onPress={handleSubmit}
                >
                  {fanLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={tw`text-[#fff] text-sm font-bold capitalize`}>Submit</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FanDetail;
