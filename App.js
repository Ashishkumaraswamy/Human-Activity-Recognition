import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Home from './components/Home'
import Data from './components/Data';
import Prediction from './components/Prediction'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()
const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Data"
          component={Data}
        />
        <Stack.Screen
          name="Predictions"
          component={Prediction}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStack;