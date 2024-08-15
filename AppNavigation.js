import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Home from './Screens/Home';
import Search from './Screens/Search';
import Details from './Screens/Details';
import Splash from './Screens/Splash';
import RecipesByCategory from './Screens/RecipesByCategory';

const Stack=createStackNavigator();

export default function AppNavigation() {
  return (
   <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Search" component={Search} options={{headerShown:false}}/>
        <Stack.Screen name="Details" component={Details} options={{headerShown:false}}/>
        <Stack.Screen name="RecipesByCategory" component={RecipesByCategory} options={{headerShown:false}}/>
      </Stack.Navigator>
   </NavigationContainer>
  )
}