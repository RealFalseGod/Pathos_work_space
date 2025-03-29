import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Profile_page from './Profile_page';
import Home from './home';
import Taskbar from './taskbar'
import Day_assess from './check_in';
import Daily_log from './daily_log';
export default function Bottom_nav() {
    
    const Tab = createBottomTabNavigator();
    return (
    
            <Tab.Navigator>
                <Tab.Screen name="Check_in" component={Day_assess} />
                <Tab.Screen name="Journal Log" component={Daily_log} />
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Profile_page" component={Profile_page} />
                <Tab.Screen name="Tasks" component={Taskbar} />
            </Tab.Navigator>
    );
};

