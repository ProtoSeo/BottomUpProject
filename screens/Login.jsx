import React, { Component }  from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Alert
} from 'react-native';
import { Button,} from 'react-native-elements'
import * as firebase from "firebase";
import "firebase/database";
import { TextInput } from 'react-native-gesture-handler';

import styles from "../design/styles";

const firebaseConfig = {
  apiKey: "AIzaSyCipbhAk-bVbgdubYf_lLvRPXsSHFQhZS4",
  authDomain: "bottom-up-project.firebaseapp.com",
  databaseURL: "https://bottom-up-project.firebaseio.com",
  projectId: "bottom-up-project",
  storageBucket: "bottom-up-project.appspot.com",
  messagingSenderId: "109120495683",
  appId: "1:109120495683:web:84487d9538b2de43a5f4f6",
};

// 회원가입할때 필요할것
// function writeUserData(userId, name, email, imageUrl) {    
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
var database = firebase.database()

class Login extends Component {
  state = {
    search: '',
    menuDialog: false,
    ID : '',
    Password : ''
  };
  updateId = (id) => {
    this.setState({ID : id})
  }
  updatepas = (pas) => {
    this.setState({Password : pas})
  }
  test = () => {
    this.props.navigation.goBack();
  }


  render() {
    const { search,ID,Password } = this.state;

    const renderItem = ({ item }) => (
      <Item name={item.name} subname={item.subname} icon={item.icon} />
    )
    
    return (
      
      <SafeAreaView style={{flex : 1}}>
      <View style={styles.container}>
        <View style={styles.login_TopBar}>
          <View style={{flex: 3, alignItems: 'center'}}>
            <Text style={styles.login_TopBarText}>
              우리시소
            </Text>
            <Text style={{fontSize: 20, color: 'white', marginTop: '5%'}}>
              우리나라 전통시장을 소개합니다.
            </Text>
          </View>
        </View>
     
        <View style={styles.MainSpace}>
        <Text style={{textAlign : 'center', marginBottom : '10%', fontSize:25, color:'#6466E3', fontWeight:'bold'}}>
              Log In
        </Text>

          <TextInput
            value={this.state.ID}
            onChangeText={this.updateId}
            Label='ID'
            placeholder='ID'
            style={styles.input}
          />
          <TextInput
            value={this.state.Password}
            onChangeText={this.updatepas}
            Label='password'
            placeholder='password'
            style={styles.input}
          />
          
          <View style={{flexDirection : 'row',marginLeft:'8%',marginTop:'10%'}}>
          <Button style={styles.login_buttons} 
            titleStyle={{color: "white",fontSize: 15,}} 
            buttonStyle={{backgroundColor: "#7E64CC",height: '50%',}} title='로그인' onPress = {
            async () =>{ 
              console.log("login")
              const snapshot = await database.ref('Users/UserInfo').once('value')
              var loginCheck = false;
              var loginKey = 0;
              snapshot.forEach(childSnapshot=>{
                const child = childSnapshot.val();
                if(child.id === ID&&child.password === Password){
                  loginKey = childSnapshot.key;
                  loginCheck = true;    
                }
              })
              if(loginCheck===true){
                console.log(snapshot.val()[loginKey])
                this.setState({
                  search: '',
                  menuDialog: false,
                  ID : '',
                  Password : ''
                })
                this.props.navigation.navigate('Home',{uid:loginKey})
              }else{
                Alert.alert("가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.")
              }
            }
          } />
          <Button style={styles.login_buttons} titleStyle={{color: "white",fontSize: 15,}} 
          buttonStyle={{backgroundColor: "#7E64CC",height: '50%'}} title='회원가입'
          onPress = {() => {
            this.setState({
              search: '',
              menuDialog: false,
              ID : '',
              Password : ''
            })
            this.props.navigation.navigate('SignUp')}
          } />
          <Button style={styles.login_buttons} titleStyle={{color: "white",fontSize: 15,}} 
          buttonStyle={{width : '100%',backgroundColor: "#7E64CC",height: '50%'}} title={`아이디/${'\n'}비밀번호찾기`} 
          onPress = {() =>{
            
            this.setState({
              search: '',
              menuDialog: false,
              ID : '',
              Password : ''
            })
            this.props.navigation.navigate('SelectFind')}
          }/>

        </View>
       
      </View>
      <View style={{flex: 1, alignItems: 'center', marginBottom: "20%"}}>
        <Text>
          CNU BottomUp Project
          {"\n"}
        </Text>
        <Text>
          ProtoSeo
        </Text>
        <Text>
          whdgusdl48
        </Text>
        <Text>
          Deokk
        </Text>

      </View>
      </View>
      </SafeAreaView>
    
    )
  }
}

export default Login;
