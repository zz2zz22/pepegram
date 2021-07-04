import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import firebase from 'firebase/app'

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
import CommentScreen from './components/main/Comment'

const Stack = createStackNavigator();

export class App extends Component {
constructor(props){
  super(props);

  this.state = {
    loaded: false,
  }
}

componentDidMount(){
  firebase.auth().onAuthStateChanged((user) => {
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
        <View style={styles.bgHeader}>
          <Image 
          style={styles.tinyLogo}
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/pepegram-5488f.appspot.com/o/icon%2F5845ca7c1046ab543d25238b.png?alt=media&token=94b53295-7a8f-47b1-8285-92740303e339'
            }}/>
          <Text style={styles.titleStyle}>PepeGram</Text>
        </View>
        <Stack.Navigator initialRouteName="Landing" >
         <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }}/>
         <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}/>
         <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/>
         <Stack.Screen name="Comment" component={CommentScreen} navigation={this.props.navigation}/>
       </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
}

const styles = StyleSheet.create({
  bgHeader:{
    marginTop: 25,
    backgroundColor: '#33CC33',
    justifyContent:'flex-start',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  titleStyle:{
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Roboto',
    margin: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  tinyLogo: {
    width: 35,
    height: 35,
    marginLeft: 15,
  }
})

export default App
