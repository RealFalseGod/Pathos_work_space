import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Profile_page from "./Profile_page";
import Home from "./home";
import Taskbar from "./taskbar";
import Day_assess from "./check_in";
import Daily_log from "./daily_log";

export default function Bottom_nav() {
  const Tab = createBottomTabNavigator();

  // Custom Tab Bar Component
  const CustomTabBar = ({ state, descriptors, navigation }: any) => {
    return (
      <View style={styles.tabBarContainer}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
            >
              <Ionicons
                name={
                  route.name === "Home"
                    ? "home-outline"
                    : route.name === "Check_in"
                    ? "calendar-outline"
                    : route.name === "Journal Log"
                    ? "book-outline"
                    : route.name === "Profile_page"
                    ? "person-outline"
                    : "checkmark-done-outline"
                }
                size={24}
                color={isFocused ? "#57CC02" : "#A4A4A2"}
              />
              <Text
                style={[styles.tabLabel, isFocused && styles.tabLabelFocused]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: "Have a great day!", // Set the default header title
        headerTitleAlign: "center", // Center-align the title
        headerStyle: {
          backgroundColor: "#E9F8D8", // Optional: Change header background color
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
          color: "#57CC02", // Optional: Change header text color
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Check_in"
        component={Day_assess}
        options={{
          headerTitle: "Today's Reflection", // Title for the header
          tabBarLabel: "Check In",
        }}
      />
      <Tab.Screen
        name="Journal Log"
        component={Daily_log}
        options={{
          headerTitle: "Journal Logs", // Title for the header
          tabBarLabel: "Logs",
        }}
      />

      <Tab.Screen name="Profile_page" component={Profile_page} />
      <Tab.Screen name="Tasks" component={Taskbar} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    height: 70,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 12,
    color: "#A4A4A2",
    marginTop: 4,
  },
  tabLabelFocused: {
    color: "#57CC02",
    fontWeight: "bold",
  },
});
