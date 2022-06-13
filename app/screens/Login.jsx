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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "../lib/tailwind";
import { alertModal } from "../helpers/utils";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/features/auth.slice";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { loading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (userData.email == "" || userData.password == "") {
      return alertModal("Oops!", "Please all fields are required");
    }
    if (userData.email && userData.password) {
      const payload = { Email: userData.email.trim(), Password: userData.password.trim() };
      // console.log(payload);
      dispatch(login({ payload, AsyncStorage, alertModal }));
    }
  };

  //console.log(user, "user object saved in storage");

  return (
    <SafeAreaView style={tw`bg-secondary `}>
      <ScrollView>
        <View style={tw`h-[250px] flex flex-col justify-end pb-10`}>
          <View style={tw` px-6`}>
            <Image source={require("../assets/hifl_icon.png")} />
            <Text style={tw`text-[#fff] font-bold text-4xl mt-2`}>Welcome back</Text>
          </View>
        </View>

        <View style={tw` bg-[#fff] rounded-t-[25px] py-15 px-6`}>
          <View style={tw``}>
            <Text style={tw`text-secondary font-bold text-4xl`}>Login</Text>
            <View style={tw`my-6`}>
              <TextInput
                style={tw`py-3 text-sm border w-full border-[#E5E5E5] focus:border-primary rounded px-4 mb-6 focus:outline-none`}
                placeholder="Email Address"
                name="email"
                onChangeText={(value) => setUserData({ ...userData, email: value })}
                value={userData.email}
              />
              <TextInput
                style={tw`py-3 text-sm border w-full border-[#E5E5E5] focus:border-primary rounded px-4 mb-10 focus:outline-none`}
                placeholder="Password"
                name="password"
                onChangeText={(value) => setUserData({ ...userData, password: value })}
                value={userData.password}
                secureTextEntry
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
                  <Text style={tw`text-[#fff] text-sm font-bold capitalize`}>Log in</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
