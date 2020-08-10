import React from 'react';
import { StyleSheet,View,StatusBar } from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import JeonGuk from './screens/JeonGuk';
import Sijang from './screens/SiJang';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import FindID from './screens/FindID';
import SelectFind from './screens/SelectFind';
import FindPass from './screens/FindPass';
import City from './screens/City'
import * as firebase from "firebase";
// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCipbhAk-bVbgdubYf_lLvRPXsSHFQhZS4",
  authDomain: "bottom-up-project.firebaseapp.com",
  databaseURL: "https://bottom-up-project.firebaseio.com",
  projectId: "bottom-up-project",
  storageBucket: "bottom-up-project.appspot.com",
  messagingSenderId: "109120495683",
  appId: "1:109120495683:web:84487d9538b2de43a5f4f6",
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
// Get a reference to the database service

// 회원가입할때 필요할것
// function writeUserData(userId, name, email, imageUrl) {    
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }

class First extends React.Component {
  render() {

    return (
      <View style={styles.container}>
        <StatusBar Constants = {Constants} />
        <JeonGuk navigation = {this.props.navigation}/>
      </View>
    );
  }
}

const App = createStackNavigator(
  {
    City:{
      screen : City,
      navigationOptions: {
        headerShown: false
      }
    },
    Sijang : {
      screen: Sijang,
      navigationOptions: {
        headerShown: false
      }
    },
    Home: {
      screen: First,
      navigationOptions: {
        headerShown: false
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false
      }
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        headerShown: false
      }
    },
    SelectFind: {
      screen: SelectFind,
      navigationOptions: {
        headerShown: false
      }
    },
    FindID: {
      screen: FindID,
      navigationOptions: {
        headerShown: false
      }
    },
    FindPass : {
      screen : FindPass,
      navigationOptions: {
        headerShown: false
      }
    },
  },
  {
    initialRouteName: 'Login' // 처음 보여 줄 화면을 설정합니다.
  },
);

const AppContainer = createAppContainer(App);

export default () => (
  <AppContainer />
);


const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#C2185B',
    height: Constants.statusBarHeight
  },
  container: {
    flex: 1
  }
});