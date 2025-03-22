import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import './globals.css';
import { useEffect } from "react";
import { FontAwesome } from '@expo/vector-icons';
import Home from './(roots)/(tabs)/Home';
import Index from './(roots)/(tabs)/index';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
export default function RootLayout() {
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
  
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

  useEffect( () =>
  {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]
  );
  if (!fontsLoaded) return null;
  return <Stack screenOptions={{headerShown:false}} />;
}