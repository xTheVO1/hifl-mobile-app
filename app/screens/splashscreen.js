import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import React from "react";
import FocusedStatusBar from "../components/FocusedStatusBar";
import { COLORS, assets } from "../constants";

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.safearea}>
      <FocusedStatusBar styles={styles.focusedStatusBar} />
      <View style={styles.main}>
        <View style={styles.logo}>
          <Image source={assets.hifl_logo} />
        </View>
        <View></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  focusedStatusBar: {
    backgroundColor: COLORS.primary,
  },
  main: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { position: "absolute", width: "50%", height: "50%" },
});

export default SplashScreen;
