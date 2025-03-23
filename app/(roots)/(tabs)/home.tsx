import { View, Text,Button } from 'react-native'
import React from 'react'
import { Link } from "expo-router";
import { useEffect,useState } from "react";
import Index from './index'
import { auth } from '../../../firebaseConfig';
const Home = () => {
  const [isLoggedIn, setIsLoggedIn] =  useState<boolean | null>(null);  ;
 useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log("user logged in");
        setIsLoggedIn(true);
      } else {
        console.log("user not logged in");
        setIsLoggedIn(false);
      }
    });

   
    return unsubscribe;
  }, []);
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  )
}

export default Home