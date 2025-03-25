import { View, Text,Button } from 'react-native'
import React from 'react'
import { Link } from "expo-router";
import { useEffect,useState } from "react";
import Index from './index'
import { auth } from '../../../firebaseConfig';
const Home = () => {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  )
}

export default Home