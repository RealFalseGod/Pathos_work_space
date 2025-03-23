import { SplashScreen, Stack,router } from "expo-router";
import { useFonts } from "expo-font";
import './globals.css';
import { useEffect,useState } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from '../firebaseConfig';
import Sign_in from "./(roots)/(tabs)/sign_in";
import Sign_up from "./(roots)/(tabs)/sign_up";
import Home from "./(roots)/(tabs)/home"
import Index from "./(roots)/(tabs)/index"
import Profile_page from "./(roots)/(tabs)/Profile_page"
import Start from "./(roots)/(tabs)/Start"
import StartHome from "./(roots)/(tabs)/StartHome";
import Bottom_nav from './(roots)/(tabs)/_layout';

export default function RootLayout() {
  const Stack = createStackNavigator();
  const [isLoggedIn, setIsLoggedIn] =  useState<boolean | null>(null);
  const [fontsLoaded] = useFonts( {
"Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
  "Poppins-BlackItalic": require("../assets/fonts/Poppins-BlackItalic.ttf"),
  "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  "Poppins-BoldItalic": require("../assets/fonts/Poppins-BoldItalic.ttf"),
  "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
  "Poppins-ExtraBoldItalic": require("../assets/fonts/Poppins-ExtraBoldItalic.ttf"),
  "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
  "Poppins-ExtraLightItalic": require("../assets/fonts/Poppins-ExtraLightItalic.ttf"),
  "Poppins-Italic": require("../assets/fonts/Poppins-Italic.ttf"),
  "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
  "Poppins-LightItalic": require("../assets/fonts/Poppins-LightItalic.ttf"),
  "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  "Poppins-MediumItalic": require("../assets/fonts/Poppins-MediumItalic.ttf"),
  "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  "Poppins-SemiBoldItalic": require("../assets/fonts/Poppins-SemiBoldItalic.ttf"),
  "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  "Poppins-ThinItalic": require("../assets/fonts/Poppins-ThinItalic.ttf"),
  })
  
  const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" component={Index} />
      <Stack.Screen name="sign_in" component={Sign_in} />
      <Stack.Screen name="sign_up" component={Sign_up} />
      <Stack.Screen name="Start" component={Start} />
    </Stack.Navigator>
  );

  useEffect( () =>
  {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]
  );


  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log("user hmmm logged in");
        setIsLoggedIn(true);
      
      } else {
        console.log("user not logged in");
        setIsLoggedIn(false);
       
      }
    });

   
    return unsubscribe;
  }, []);
  if (!fontsLoaded|| isLoggedIn === null) return null;

  return (
    <>
      {isLoggedIn ? <Bottom_nav /> : <AuthStack />} 
    </>
  );


}