import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Link, router, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { NavigationProp } from "@react-navigation/native";

const Sign_in = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [scaleSignUp] = useState(new Animated.Value(1));
  const [step, setStep] = useState(1);
  const [opacity] = useState(new Animated.Value(0)); // Define opacity as an animated value
  const [translateY] = useState(new Animated.Value(50)); // Define translateY as an animated value
  const isButtonDisabled = !email || !password;
  useEffect(() => {
    // Trigger the animation when the component mounts
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1, // Fully visible
        duration: 1000, // Animation duration in milliseconds
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0, // Move to its original position
        duration: 1000, // Animation duration in milliseconds
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  useEffect(() => {
    if (step === 1) {
      navigation.setOptions({ headerTitle: "" }); // Hide the title
    } else {
      navigation.setOptions({ headerTitle: "Enter Your details" }); // Show the title
    }
  }, [step]);

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
    <View className="flex-1 bg-[#E9F8D8]">
      {step === 1 && (
        <View className="flex-1 justify-center items-center">
          <Animated.Text
            className="text-4xl font-Poppins-bold text-[#57CC02] -mt-56"
            style={{
              opacity,
              transform: [{ translateY }],
            }}
          >
            Welcome Back! Let's Start Again?
          </Animated.Text>
          <View className="absolute bottom-5 w-full px-4">
            <Animated.View style={{ transform: [{ scale: scaleSignUp }] }}>
              <TouchableOpacity
                activeOpacity={1}
                onPressIn={handlePressInSignUp}
                onPressOut={handlePressOutSignUp}
                onPress={() => setStep(step + 1)}
                className="min-w-full rounded-t-[10px] rounded-b-[8px] my-2 transition-all bg-[#93D334] px-4 py-3 border-t-[1px] border-l-[1px] border-r-[1px] border-b-[6px] border-[#77B62A] relative"
              >
                <Text className="text-center font-Poppins-bold text-2xl text-[#FFFFFD]">
                  Let's Go
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      )}

      {step === 2 && (
        <View className="flex-1 bg-[#E9F8D8] font-Poppins-Regular">
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
                onPressOut={
                  !isButtonDisabled ? handlePressOutSignUp : undefined
                }
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
      )}
    </View>
  );
};

export default Sign_in;
