import { StyleSheet, Text, TextInput, View } from 'react-native'
import React,{ useState } from 'react'
import { Link } from "expo-router";
const sign_up = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  return (
    <View className='flex-1 justify-center p-4'>
      <Text className='p-4 text-center'>Sign Up</Text>
        <View className='p-4'>
        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder="Enter your email"
            onChangeText={text => setEmail(text)}
            value={email}/>
            </View>
            <View className='p-4'>   
        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            placeholder="Enter your Password"
            onChangeText={text => setEmail(text)}
            value={email}/>
            </View>
    </View>
  )
}

export default sign_up

const styles = StyleSheet.create({})