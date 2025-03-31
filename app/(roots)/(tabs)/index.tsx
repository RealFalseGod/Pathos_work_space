import { Text, View, TouchableOpacity, Animated, Image } from "react-native";
import { useState } from "react";
import { NavigationProp } from "@react-navigation/native";

export default function Index({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [scaleSignUp] = useState(new Animated.Value(1));
  const [scaleSignIn] = useState(new Animated.Value(1));

  const handlePressInSignUp = () => {
    Animated.spring(scaleSignUp, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOutSignUp = () => {
    Animated.spring(scaleSignUp, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePressInSignIn = () => {
    Animated.spring(scaleSignIn, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOutSignIn = () => {
    Animated.spring(scaleSignIn, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View className="flex-1 bg-[#FFFFFD]">
      {/* Title Section */}
      <View className="flex-1 justify-center items-center pb-10">
        <Image
          source={require("../../../assets/images/cherry.png")} // Adjust the path to your image
          className="w-100 h-full
          " // Tailwind classes for width, height, and margin-bottom
          resizeMode="contain" // Ensures the image scales properly
        />
        <Text className="pt-12 text-8xl font-Poppins-bold text-center text-[#58cc02]">
          Pathos
        </Text>
        <Text className="text-xl font-Poppins-semiBold text-center text-[#B2B2B0]">
          Level Up Your Productivity
        </Text>
      </View>

      {/* Buttons Section */}
      <View className="flex-1 justify-end items-center p-4">
        <Animated.View style={{ transform: [{ scale: scaleSignUp }] }}>
          <TouchableOpacity
            activeOpacity={1}
            onPressIn={handlePressInSignUp}
            onPressOut={handlePressOutSignUp}
            onPress={() => navigation.navigate("sign_up")}
            className="min-w-full rounded-t-[10px] rounded-b-[8px] my-2 transition-all px-4 py-4 bg-[#93D334] border-t-[1px] border-l-[1px] border-r-[1px] border-b-[6px] border-[#77B62A] relative"
          >
            <Text className="text-center font-Poppins-bold text-xl text-[#FFFFFD]">
              GET STARTED
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: scaleSignIn }] }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("sign_in")}
            onPressIn={handlePressInSignIn}
            onPressOut={handlePressOutSignIn}
            className="min-w-full rounded-t-[10px] rounded-b-[8px] my-2 transition-all px-4 py-4 bg-[#FFFFFD] border-t-[1px] border-l-[1px] border-r-[1px] border-b-[6px] border-[#E5E5E3] relative"
          >
            <Text className="text-center text-[#93D334] font-Poppins-bold">
              I ALREADY HAVE AN ACCOUNT
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}
