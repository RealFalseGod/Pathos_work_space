import { StyleSheet, Text, TextInput, View,Button } from 'react-native'
import React,{ useState } from 'react'
import { Link,router,useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

const Sign_in = ({ navigation }: { navigation: NavigationProp<any> }) => {

      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const router = useRouter();
      const handleSignin = async () => {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          console.log("User Signed In");
          Alert.alert("User Signed In!");
        } catch (error: any) {
          
          console.error("Sign in Error:", error.message);
          Alert.alert("Sign in Error:", error.message);
        }
      }
  return (
    <View className='flex-1 justify-center p-4'>
          
          <Text className='p-4 text-center'>Sign In</Text>
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
                <Button title="Sign in" onPress={handleSignin} />
                </View>
                  
        </View>
  )
}

export default Sign_in