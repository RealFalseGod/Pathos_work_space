import { View, Text,Button } from 'react-native'
import { useRouter } from 'expo-router';
import React from 'react'
import { auth } from '../../../firebaseConfig';
import {signOut} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Sign_in from './sign_in';
const Profile_page = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User loggdded out");
      
    } catch (error : any) {
      console.error("Logout Error:", error.message);
    }
  };
  return (
    <View>
      <Text>Profile page</Text>
      <Text>Log out</Text>
      <Button title='Logout' onPress={handleLogout}/>
    </View>
  )
}

export default Profile_page