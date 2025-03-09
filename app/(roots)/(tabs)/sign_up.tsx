import { StyleSheet, Text, TextInput, View,Button } from 'react-native'
import React,{ useState } from 'react'
import { Link,useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { Alert } from 'react-native';
const sign_up = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const handleSignUp = async () => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User registered successfully!");
        Alert.alert("Userddd registered successfully!");
        router.push('./sign_in');
      } catch (error: any) {
        
        console.error("Sign dadsfUp Error:", error.message);
        Alert.alert("Sign adfadsfUp Error:", error.message);
      }
    }
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
            onChangeText={text => setPassword(text)}
            value={password}/>
            <Button title="Sign Up" onPress={handleSignUp} />
            </View>
              
    </View>
    
  )
}

export default sign_up

const styles = StyleSheet.create({})