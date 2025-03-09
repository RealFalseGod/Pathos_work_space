import { View, Text, ScrollView, Image,Button} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from "expo-router";
const startHome = () => {
  return (
    
    <View className='flex-1 justify-center items-center'>
  <View>
    <Text className="pt-10 text-8xl  font-Poppins-semiBold text-center text-[#58cc02] ">
    Pathos
  </Text>
  
   <Text className="text-xl  font-Poppins-semiBold text-center text-[#58cc02] ">
    Level Up Your Mental Health
    </Text>   
    </View>
    <View className='flex-2 justify-end items-center p-4'>
      <Link href='./sign_up'> GET STARTED </Link>
      <Link href='./sign_in'> I ALREADY HAVE AN ACCOUNT  </Link>
      
    </View>
    </View>
  )
}

export default startHome