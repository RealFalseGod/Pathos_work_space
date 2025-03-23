import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Profile_page from './Profile_page';
import Home from './home';
import { auth } from '../../../firebaseConfig';
export default function Bottom_nav() {
    
    const Tab = createBottomTabNavigator();
    return (
    
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Profile_page" component={Profile_page} />
            </Tab.Navigator>
    );
};

