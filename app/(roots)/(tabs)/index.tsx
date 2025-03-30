import { Text, View,Button,Touchable,TouchableOpacity,Animated } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import { NavigationProp } from '@react-navigation/native';
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
export default function Index({ navigation }: { navigation: NavigationProp<any> }) {
  const [scale] = useState(new Animated.Value(1)); // Initial scale value set to 1
  const [scaleSignUp] = useState(new Animated.Value(1));
  const [scaleSignIn] = useState(new Animated.Value(1));

  // Animation functions for the "GET STARTED" button
  const handlePressInSignUp = () => {
    Animated.spring(scaleSignUp, {
      toValue: 0.95, // Shrink to 95%
      useNativeDriver: true,
    }).start();
  };

  const handlePressOutSignUp = () => {
    Animated.spring(scaleSignUp, {
      toValue: 1, // Return to normal size
      useNativeDriver: true,
    }).start();
  };

  // Animation functions for the "I ALREADY HAVE AN ACCOUNT" button
  const handlePressInSignIn = () => {
    Animated.spring(scaleSignIn, {
      toValue: 0.95, // Shrink to 95%
      useNativeDriver: true,
    }).start();
  };

  const handlePressOutSignIn = () => {
    Animated.spring(scaleSignIn, {
      toValue: 1, // Return to normal size
      useNativeDriver: true,
    }).start();
  };

  return (
    <View className='flex-1 justify-center items-center bg-[#FFFFFD]'>
      <View>
        <Text className="pt-10 text-8xl font-Poppins-bold text-center text-[#58cc02] ">
        Pathos
      </Text>
      
       <Text className="text-xl  font-Poppins-Bold text-center text-[#58cc02] ">
        Level Up Your Mental Health
        </Text>   
        </View>
        <View className='flex-2 justify-end items-center p-4'>
        <Animated.View style={{ transform: [{ scale: scaleSignUp }] }}>
        <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressInSignUp}
        onPressOut={handlePressOutSignUp}
  onPress={() => navigation.navigate('sign_up')}
  
  className="min-w-full rounded-t-[10px] rounded-b-[8px] my-2 transition-all px-4 py-4 bg-[#93D334] relative"
>
  
<View className="absolute bottom-0 left-0 right-0 mx-auto h-[5px] bg-[#77B62A] rounded-b-[20px]" />
<Text className="text-center text-black font-Poppins-bold  text-xl text-[#FFFFFD]">GET STARTED</Text>
</TouchableOpacity>
</Animated.View>
{/* Custom Button for "I ALREADY HAVE AN ACCOUNT" */}
<Animated.View style={{ transform: [{  scale: scaleSignIn  }] }}>
      <TouchableOpacity
      activeOpacity={1}
        onPress={() => navigation.navigate('sign_in')}
        onPressIn={handlePressInSignIn}
        onPressOut={handlePressOutSignIn}
        className="min-w-full rounded-[16px] border-2 my-2 px-4 py-3 transition-all"
      >
        <Text className="text-center text-black font-semibold">I ALREADY HAVE AN ACCOUNT</Text>
      </TouchableOpacity>
    </Animated.View>
      
        </View>
        </View>
  );
}
