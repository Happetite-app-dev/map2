import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

import MapStackScreen from './src/screens/MapStackScreen';
import MapListScreen from './src/screens/MapListScreen';
import Setting from './src/screens/Setting';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName='MapSrceen' screenOptions={screenOptions}>
      <Tab.Screen name="MapStackScreen" component={MapStackScreen}/>
      <Tab.Screen name="MapList" component={MapListScreen}/>
      <Tab.Screen name="Setting" component={Setting}/>
    </Tab.Navigator>
  );
}






const screenOptions=({ route }) => ({
  headerShown:false,
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'MapStackScreen') {
      iconName = focused ? 'md-map' : 'md-map';
      color = focused ? 'blue' : 'gray';
      size = focused ? 28: 20;
    } else if (route.name === 'MapList') {
      iconName = focused ? 'ios-list' : 'ios-list';
      color = focused ? 'blue' : 'gray';
      size = focused ? 28: 20;
    } else if (route.name === 'Setting') {
      iconName = focused ? 'settings' : 'settings';
      color = focused ? 'blue' : 'gray';
      size = focused ? 28: 20;
    }

    // You can return any component that you like here!
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  
  tabBarActiveTintColor: 'blue',
  tabBarInactiveTintColor: 'gray',
})

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}