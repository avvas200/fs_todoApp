import AnimatedLottieView from "lottie-react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";

export default function AppLoader() {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <AnimatedLottieView
        source={require("../assets/loading.json")}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1,
  },
});
