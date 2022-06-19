import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import tw from "../lib/tailwind";
import { format } from "date-fns";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { fetchFans } from "../redux/features/fan.slice";
import EmptyList from "../components/EmptyList";
import { logout } from "../redux/features/auth.slice";

const Item = ({ item }) => (
  <View style={tw`w-full p-5 my-1 flex flex-col content-center bg-[#FAFAFA]`}>
    <View style={tw`flex flex-row justify-between items-center`}>
      <View style={tw`flex flex-row `}>
        <Image source={require("../assets/icons/girl.png")} style={tw`w-[48px] h-[48px] mr-5`} />
        <View style={tw`flex flex-col content-center`}>
          <Text style={tw`text-[#000229] text-lg font-light	`}>
            {item?.FirstName} {item.LastName}
          </Text>
          <Text style={tw`text-xs text-[#0013FF] font-light	uppercase`}>
            {item.Tickets.length} {item.Tickets.length > 1 ? "Tickets" : "Ticket"}
          </Text>
        </View>
      </View>
      <View style={tw`flex flex-col `}>
        <Text style={tw`text-xs font-light`}>Last Updated</Text>
        <Text style={tw`text-xs	font-extralight	`}>{format(new Date(item.updatedAt), "MMM dd, yyyy")}</Text>
      </View>
    </View>
  </View>
);

const Home = ({ navigation }) => {
  const [searchValue, setsearchValue] = useState("");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { fans, loading } = useSelector((state) => state.fan);
  const [filteredData, setFilteredData] = useState([]);
  // console.log(user, "fan det");

  const handleSearch = (value) => {
    setsearchValue(value);
    let result = [];
    result = fans.filter((data) => data.FirstName.toLowerCase().includes(value.toLowerCase()));
    if (value) {
      setFilteredData(result);
    } else {
      setFilteredData(fans);
    }
  };
  const handleSubmit = () => {
    navigation.navigate("newFan");
  };
  const handleFan = (id) => {
    navigation.navigate("fanDetail", { id });
    console.log(id);
  };
  const getFans = () => {
    const userId = user.User._id;
    dispatch(fetchFans({ userId, setFilteredData }));
  };
  const handleLogout = () => {
    dispatch(logout());
  };

  useFocusEffect(
    useCallback(() => {
      getFans();
      setsearchValue("");
      return () => {};
    }, [])
  );

  const renderItem = ({ item }) => (
    <Pressable onPress={() => handleFan(item._id)}>
      <Item item={item} />
    </Pressable>
  );

  return (
    <SafeAreaView style={tw`bg-secondary h-full relative`}>
      <View style={tw`h-[200px] flex flex-col justify-end pb-5`}>
        <View style={tw`flex flex-row justify-between items-center px-6`}>
          <Text style={tw`text-[#fff] font-bold text-2xl capitalize`}>Hi {user?.User.Firstname || "there"},</Text>
          <Pressable onPress={handleLogout}>
            <Image source={require("../assets/hifl_icon.png")} style={tw`w-[50px]`} />
          </Pressable>
        </View>
      </View>

      <View style={tw`h-[100%]  bg-[#fff] rounded-t-[25px] py-10 items-center`}>
        <TextInput
          style={tw`bg-[#FAFAFA]  py-3 text-sm border w-[90%] border-[#F4C316] focus:border-primary rounded-full px-4 mb-4 focus:outline-none`}
          placeholder="Find a fan!"
          name="search"
          value={searchValue}
          onChangeText={(value) => handleSearch(value)}
          keyboardType="email-address"
          autoComplete="off"
        />

        <View style={tw`flex flex-col mt-4 mb-30 w-full`}>
          {loading ? (
            <View style={tw`mt-10 flex justify-center items-center`}>
              <ActivityIndicator size="large" color="#000229" />
            </View>
          ) : (
            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              ListEmptyComponent={<EmptyList />}
            />
          )}
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={handleSubmit} style={tw`absolute bottom-8 right-6`}>
        <Image source={require("../assets/icons/add.png")} style={tw`w-[60px] h-[60px]`} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
