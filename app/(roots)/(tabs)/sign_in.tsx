import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState } from "react";
import { Link, router, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { Alert } from "react-native";
import { NavigationProp } from "@react-navigation/native";

const Sign_in = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [scaleSignUp] = useState(new Animated.Value(1));

  const isButtonDisabled = !email || !password;
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

  const handleSignin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User Signed In");
      setErrorMessage("");
    } catch (error: any) {
      console.error("Sign in Error:", error.message);
      setErrorMessage("Wrong username or password");
    }
  };
  return (
    <View className="flex-1 bg-[#FFFFFD] font-Poppins-Regular">
      <View className=" px-3 py-4">
        <TextInput
          className="w-full  h-12 bg-[#F5F5F5] rounded-t-[10px] px-5 text-lg border border-gray-300"
          placeholder="Enter your email"
          placeholderTextColor="#B2B2B0"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />

        <TextInput
          className="w-full h-12 bg-[#F5F5F5] rounded-b-[10px] px-5 text-lg border border-gray-300"
          placeholder="Enter your password"
          placeholderTextColor="#B2B2B0"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
      </View>
      {errorMessage ? (
        <Text className="text-red-500 text-center mt-1 mb-1">
          {errorMessage}
        </Text>
      ) : null}
      <View className="px-3">
        <Animated.View style={{ transform: [{ scale: scaleSignUp }] }}>
          <TouchableOpacity
            activeOpacity={isButtonDisabled ? 1 : 0.7} // Reduce opacity if disabled
            onPressIn={!isButtonDisabled ? handlePressInSignUp : undefined}
            onPressOut={!isButtonDisabled ? handlePressOutSignUp : undefined}
            onPress={!isButtonDisabled ? handleSignin : undefined}
            disabled={isButtonDisabled} // Disable the button if fields are empty
            className={`min-w-full rounded-t-[10px] rounded-b-[8px] my-2 transition-all px-4 py-4 ${
              isButtonDisabled
                ? "bg-gray-400 border-gray-300" // Disabled button styles
                : "bg-[#93D334] border-[#77B62A]" // Enabled button styles
            } border-t-[1px] border-l-[1px] border-r-[1px] border-b-[6px] relative`}
          >
            <Text
              className={`text-center font-Poppins-bold text-xl ${
                isButtonDisabled ? "text-gray-200" : "text-[#FFFFFD]"
              }`}
            >
              SIGN IN
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default Sign_in;
