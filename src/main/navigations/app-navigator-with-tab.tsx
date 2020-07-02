import React from 'react';
import {NavigationContainer, getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomePage';
import SettingsScreen from '../screens/settings/SettingsPage';
import ShopListScreen from '../screens/shop_list/ShopListPage';
import {HOME_NAVIGATOR_KEY, NEW_SHOP_LIST_NAVIGATOR_KEY, SETTINGS_NAVIGATOR_KEY} from '../config/constants';


export type RootStackParamList = {
    Home: undefined;
    Settings: undefined
    NewShopList: undefined;
};

export class NavigationRouteProp<T, U> {
}


const getHeaderTitle = (route) => {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? HOME_NAVIGATOR_KEY;

    switch (routeName) {
        case HOME_NAVIGATOR_KEY:
            return 'Shop List';
        case SETTINGS_NAVIGATOR_KEY:
            return 'My Settings';
        case NEW_SHOP_LIST_NAVIGATOR_KEY:
            return 'New List';

    }
};

const Tab = createBottomTabNavigator();

const HomeTabs = () => (
    <Tab.Navigator>
        <Tab.Screen name={HOME_NAVIGATOR_KEY} component={HomeScreen}/>
        <Tab.Screen name={SETTINGS_NAVIGATOR_KEY} component={SettingsScreen}/>
    </Tab.Navigator>
);

const Stack = createStackNavigator();

export const NavigatorWithTabs = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name={HOME_NAVIGATOR_KEY}
                    component={HomeTabs}
                    options={({ route }) => ({
                        headerTitle: getHeaderTitle(route),
                    })}
                />
                <Stack.Screen name={NEW_SHOP_LIST_NAVIGATOR_KEY} component={ShopListScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
