import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVBLdVqWG_OkE2xk9kOoqfRO_-Fe3xGX0",
  authDomain: "pepegram-5488f.firebaseapp.com",
  projectId: "pepegram-5488f",
  storageBucket: "pepegram-5488f.appspot.com",
  messagingSenderId: "875650020500",
  appId: "1:875650020500:web:e8f2fa21bda60ae8b3b081",
  measurementId: "G-JZY3EJL8NB"
};

if(firebase.apps.length == 0){
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'


const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
