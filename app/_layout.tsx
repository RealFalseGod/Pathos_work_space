import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import "./globals.css";
import { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { auth } from "../firebaseConfig";
import Sign_in from "./(roots)/(tabs)/sign_in";
import Sign_up from "./(roots)/(tabs)/sign_up";
import Index from "./(roots)/(tabs)/index";
import Start from "./(roots)/(tabs)/Start";
import Bottom_nav from "./(roots)/(tabs)/_layout";
import BackgroundFetch from "react-native-background-fetch";
import { resetScheduledTasks, isTaskDue } from "./Scheduled";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
export default function RootLayout() {
  const Stack = createStackNavigator();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [fontsLoaded] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    // Add other fonts as needed
  });

  const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="index"
        component={Index}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="sign_in"
        component={Sign_in}
        options={{
          headerTransparent: false, // Makes the header transparent
          headerTitle: "Enter Your details", // Removes the title
          headerShadowVisible: false, // Removes the shadow
          headerTitleAlign: "center",
          headerTintColor: "#A4A4A2",
          headerStyle: { backgroundColor: "#E9F8D8" },
        }}
      />
      <Stack.Screen
        name="sign_up"
        component={Sign_up}
        options={{
          headerTransparent: false, // Makes the header transparent
          headerShadowVisible: false, // Removes the shadow
          headerTitleAlign: "center",
          headerTitle: "", // Removes the title
          headerTintColor: "#A4A4A2",
          headerStyle: { backgroundColor: "#E9F8D8" },
        }}
      />
      <Stack.Screen name="Start" component={Start} />
    </Stack.Navigator>
  );

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User logged in");
        setIsLoggedIn(true);
      } else {
        console.log("User not logged in");
        setIsLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);

  // Configure Background Fetch
  useEffect(() => {
    const configureBackgroundFetch = async () => {
      const status = await BackgroundFetch.configure(
        {
          minimumFetchInterval: 15, // Run every 15 minutes
          stopOnTerminate: false, // Continue running even if the app is terminated
          startOnBoot: true, // Start automatically when the device boots
        },
        async (taskid) => {
          console.log("[BackgroundFetch] Task started");
          const now = new Date();
          if (now.getHours() === 12 && now.getMinutes() === 0) {
            console.log("[BackgroundFetch] It is 12 PM, executing task...");
            await resetScheduledTasks(); // Call the reset function
          } else {
            console.log("[BackgroundFetch] Not 12 PM, skipping task...");
          }
          BackgroundFetch.finish(taskid);
        },
        (error) => {
          console.error("[BackgroundFetch] Failed to configure", error);
        }
      );

      console.log("[BackgroundFetch] Status:", status);
    };

    configureBackgroundFetch();

    return () => {
      BackgroundFetch.stop(); // Stop background fetch when the component unmounts
    };
  }, []);

  // Reset Scheduled Tasks Function

  // Helper Function to Check if a Task is Due
  const isTaskDue = (
    dueDate: string,
    currentDate: Date,
    intervalDays: number
  ) => {
    const due = new Date(dueDate);
    const differenceInTime = currentDate.getTime() - due.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays >= intervalDays;
  };

  if (!fontsLoaded || isLoggedIn === null) return null;

  return (
    <View className="flex-1 bg-[#FFFFFD]">
      <StatusBar style="dark" backgroundColor="#FFFFFD" />
      {isLoggedIn ? <Bottom_nav /> : <AuthStack />}
    </View>
  );
}
