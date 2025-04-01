import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Alert,
  Animated,
  Easing,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import DateTimePicker from "@react-native-community/datetimepicker";
import { NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [isBirthdateSelected, setIsBirthdateSelected] = useState(false);
  const [birthdate, setBirthDate] = useState(new Date());

  const [mood, setMood] = useState("");
  const [show, setShow] = useState(false);
  const [selectedMood, setSelectedMood] = useState(""); // Add state for selectedMood
  const [scaleSignUp] = useState(new Animated.Value(1));
  const [opacity] = useState(new Animated.Value(0)); // Define opacity as an animated value
  const [translateY] = useState(new Animated.Value(50)); // Define translateY as an animated value
  const [scaleBack] = useState(new Animated.Value(1));
  const [errorMessage, setErrorMessage] = useState(""); // Add state for errorMessage
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();

    Animated.timing(translateY, {
      toValue: 0,
      duration: 1000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, []);
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
  const handlePressInBack = () => {
    Animated.spring(scaleBack, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOutBack = () => {
    Animated.spring(scaleBack, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    if (selectedDate) {
      setBirthDate(selectedDate);
      setIsBirthdateSelected(true); // Mark birthdate as selected
    }
    setShow(false);
  };

  const handleSignUp = async () => {
    const profileData = {
      name,
      birthdate: birthdate.toISOString(), // Save birthdate as a string
      mood,
      email,
    };
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem("profileData", JSON.stringify(profileData));
      console.log("Profile data saved to local storage!");
      console.log("User registered successfully!");
      navigation.navigate("Start");
    } catch (error: any) {
      console.log("SignUp Error:", error.message);

      // Handle specific Firebase error codes
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage(
          "This email is already registered. Please try logging in."
        );
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("Invalid email address. Please enter a valid email.");
      } else if (error.code === "auth/weak-password") {
        setErrorMessage(
          "Password is too weak. Please use a stronger password."
        );
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
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
            Hey! Ready to Level up?
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
                  YEAHHHH
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      )}
      {step === 2 && (
        <View className="flex-1 justify-center items-center bg-[#E9F8D8] mb-35">
          <View className="w-4/5 bg-[#FFFFFD] p-8 rounded-3xl shadow-xl items-center">
            <Text className="text-3xl font-Poppins-bold text-[#57CC02] mb-6">
              Who are you?
            </Text>
            <TextInput
              className="w-full font-Poppins-regular bg-gray-100 p-4 rounded-xl text-lg shadow-sm"
              placeholder="Enter your name"
              placeholderTextColor="#aaa"
              value={name}
              onChangeText={setName}
            />

            <Text className="text-3xl font-Poppins-bold text-[#57CC02] mt-6">
              Birthdate
            </Text>
            <TouchableOpacity
              className="bg-[#57CC02] px-5 py-3 rounded-xl mt-3 active:scale-95 transition-al"
              onPress={() => setShow(true)}
            >
              <Text className="text-white font-[Poppins-Bold] text-lg">
                Select Birthdate
              </Text>
            </TouchableOpacity>

            {show && (
              <DateTimePicker
                value={birthdate || new Date()}
                mode="date"
                onChange={handleDateChange}
              />
            )}

            {birthdate &&
              birthdate.toDateString() !== new Date().toDateString() && (
                <Text className="text-2xl font-Poppins-bold text-[#4A772F] mt-2 p-5">
                  🎂 Born on {birthdate.toDateString()}
                </Text>
              )}
            <View className="w-full items-center">
              <Text className="text-3xl font-Poppins-bold text-[#57CC02] mt-8 mb-3">
                How are You Always?
              </Text>

              <View className="flex-row justify-center w-4/5  p-3 rounded-2xl ">
                {[
                  { mood: "Happy", emoji: "😄" },
                  { mood: "Sad", emoji: "😢" },
                  { mood: "Angry", emoji: "😡" },
                  { mood: "Anxious", emoji: "😰" },
                  { mood: "Tired", emoji: "😴" },
                  { mood: "Confused", emoji: "😕" },
                ].map(({ mood: moodOption, emoji }, index) => (
                  <TouchableOpacity
                    key={moodOption} // Use the mood as the unique key
                    onPress={() => {
                      setMood(moodOption);
                      setSelectedMood(moodOption); // Update selectedMood when a mood is selected
                    }}
                    style={[
                      {
                        padding: 8,
                        borderRadius: 50,
                        transform: [
                          { scale: selectedMood === moodOption ? 1.5 : 1 },
                        ],
                      },
                    ]}
                  >
                    <Text style={{ fontSize: 30 }}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View className="w-full px-4 flex-row gap-4 pt-5">
              {/* Back Button */}
              <Animated.View
                style={{ transform: [{ scale: scaleBack }] }}
                className="flex-1"
              >
                <TouchableOpacity
                  activeOpacity={
                    name && selectedMood && isBirthdateSelected ? 1 : 0.7
                  } // Reduce opacity if disabled
                  onPressIn={
                    name && selectedMood && isBirthdateSelected
                      ? handlePressInSignUp
                      : undefined
                  }
                  onPressOut={
                    name && selectedMood && isBirthdateSelected
                      ? handlePressOutSignUp
                      : undefined
                  }
                  onPress={
                    name && selectedMood && isBirthdateSelected
                      ? () => setStep(step + 1)
                      : undefined
                  }
                  disabled={!name || !selectedMood || !isBirthdateSelected} // Disable the button if fields are empty
                  className={`rounded-t-[10px] rounded-b-[8px] transition-all px-4 py-3 ${
                    name && selectedMood && isBirthdateSelected
                      ? "bg-[#93D334] border-[#77B62A]" // Enabled button styles
                      : "bg-gray-400 border-gray-300" // Disabled button styles
                  } border-t-[1px] border-l-[1px] border-r-[1px] border-b-[6px] relative`}
                >
                  <Text
                    className={`text-center font-Poppins-bold text-2xl ${
                      name && selectedMood && isBirthdateSelected
                        ? "text-[#FFFFFD]"
                        : "text-gray-200"
                    }`}
                  >
                    Continue
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </View>
      )}
      {step === 3 && (
        <View className="flex-1 justify-center items-center bg-[#E9F8D8] mb-35">
          <View className="w-4/5 bg-[#FFFFFD] p-8 rounded-3xl shadow-xl items-center">
            <Text className="text-3xl font-Poppins-bold text-[#57CC02] mb-6">
              SIGN UP
            </Text>
            <TextInput
              placeholder="Enter your email"
              onChangeText={setEmail}
              value={email}
              className="w-full font-Poppins-regular bg-gray-100 p-4 rounded-t-xl text-lg"
            />
            <TextInput
              placeholder="Enter your password"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
              className="w-full font-Poppins-regular bg-gray-100 p-4 rounded-b-xl text-lg mb-4"
            />
            {/* Error Message */}
            {errorMessage ? (
              <Text className="text-red-500 text-center m-4">
                {errorMessage}
              </Text>
            ) : null}

            <View className="w-full px-4 flex-row gap-4 pt-1">
              {/* Back Button */}
              <Animated.View
                style={{ transform: [{ scale: scaleBack }] }}
                className="flex-1"
              >
                <TouchableOpacity
                  activeOpacity={1}
                  onPressIn={handlePressInBack}
                  onPressOut={handlePressOutBack}
                  onPress={() => setStep(step - 1)}
                  className="rounded-t-[10px] rounded-b-[8px] transition-all bg-[#93D334] px-4 py-3 border-t-[1px] border-l-[1px] border-r-[1px] border-b-[6px] border-[#77B62A] relative"
                >
                  <Text className="text-center font-Poppins-bold text-2xl text-[#FFFFFD]">
                    Back
                  </Text>
                </TouchableOpacity>
              </Animated.View>

              {/* Continue Button */}
              <Animated.View
                style={{ transform: [{ scale: scaleSignUp }] }}
                className="flex-1"
              >
                <TouchableOpacity
                  activeOpacity={email && password ? 1 : 0.7} // Reduce opacity if disabled
                  onPressIn={
                    email && password ? handlePressInSignUp : undefined
                  }
                  onPressOut={
                    email && password ? handlePressOutSignUp : undefined
                  }
                  onPress={email && password ? handleSignUp : undefined}
                  disabled={!email || !password} // Disable the button if fields are empty
                  className={`rounded-t-[10px] rounded-b-[8px] transition-all px-4 py-3 ${
                    email && password
                      ? "bg-[#93D334] border-[#77B62A]" // Enabled button styles
                      : "bg-gray-400 border-gray-300" // Disabled button styles
                  } border-t-[1px] border-l-[1px] border-r-[1px] border-b-[6px] relative`}
                >
                  <Text
                    className={`text-center font-Poppins-bold text-2xl ${
                      email && password ? "text-[#FFFFFD]" : "text-gray-200"
                    }`}
                  >
                    Register
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default SignUp;
