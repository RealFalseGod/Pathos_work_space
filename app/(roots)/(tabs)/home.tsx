import { View, Text,Button } from 'react-native'
import React from 'react'
import { Link } from "expo-router";
import Index from './index'

const Home = () => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Link href='./(tabs)/Start'> start  </Link>
    </View>
  )
}

export default Home