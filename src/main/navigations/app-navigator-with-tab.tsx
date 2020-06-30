import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/home/HomePage';
import {SettingsScreen} from '../screens/settings/SettingsPage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export const NavigatorWithTabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
