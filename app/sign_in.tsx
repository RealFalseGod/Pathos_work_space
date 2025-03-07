import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const sign_in = () => {
  return (
    <View className='bg-white h-full flex items-center'>
    <Image source={require('../assets/images/logo.png')} resizeMode='contain' className='w-1/2'/>
    <Text className="-mt-50 text-lg font-semibold text-center">
    Level up and improve
  </Text>
   
      
    </View>
  )
}

export default sign_in