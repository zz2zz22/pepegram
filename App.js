import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as firebase from 'firebase'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk))

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
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'

const Stack = createStackNavigator();

export class App extends Component {
constructor(props){
  super(props);

  this.state = {
    loaded: false,
  }
}

componentDidMount(){
  firebase.default.auth().onAuthStateChanged((user) => {
    if(!user){
      this.setState({
        loggedIn: false,
        loaded: true,
      })
    }else{
      this.setState({
        loggedIn: true,
        loaded: true,
      })
    }
  })
}
render() {
  const {loggedIn, loaded} = this.state
  if(!loaded){
    return(
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>Loading</Text>
      </View>
    )
  }

  if(!loggedIn){
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    );
  }   
  return(
    <Provider store= {store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
         <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }}/>
         <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}/>
         <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/>
       </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
}

export default App
