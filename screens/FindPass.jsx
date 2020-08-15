import React, { Component }  from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Button } from 'react-native-elements'
import * as firebase from "firebase";
import "firebase/database";

import styles from "../design/styles";
import { TextInput } from 'react-native-gesture-handler';

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
var database = firebase.database()
class FindID extends Component {

  state = {
    search: '',
    menuDialog: false,
    ID : '',
    Name : ''
  };

  updateId = (id) => {
    this.setState({ID : id})
  }
  updateName = (name) => {
    this.setState({Name : name})
  }
  
  test = () => {
    this.props.navigation.goBack();
  }

  render() {

    const { ID, Name} = this.state;
    
    return (
      <SafeAreaView style={{flex : 1}}>
      <View style={styles.container}>
        <View style={styles.TopBar}>

        <View style={{flex: 2}}>
        </View>

          <View style={{flex: 3, alignItems: 'center'}}>
            <Text style={styles.TopBarText}>
              Find PassWord
            </Text>
          </View>
          <View style={{flex: 2}}>
            <TouchableOpacity style={styles.TopButton} onPress={this.test}>
              <AntDesign name="back" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.MainSpace}>
          <View>
          <Text style={{textAlign : 'center', marginVertical: '5%', fontSize: 20,}}>
              아이디를 입력하세요
          </Text>
          <TextInput
            placeholder="ex): dk_kling"
            style={styles.input}
            onChangeText={this.updateId}
            value={this.state.ID}
          />
          <Text style={{textAlign : 'center', marginVertical: '5%', fontSize: 20,}}>
              이름을 입력하세요
          </Text>
          <TextInput
            placeholder="ex): 홍길동"
            style={styles.input}
            onChangeText={this.updateName}
            value={this.state.Name}
          />
          </View>
          <Button style={{width: '30%', alignContents:'center', marginTop : '10%', marginHorizontal: '35%', marginBottom:'10%'}} titleStyle={{color: "white",fontSize: 15, padding :'5%'}} 
          buttonStyle={{backgroundColor: "#7E64CC", height: '46%'}} title={`비밀번호 찾기`} onPress=
          {
            async () => 
            {
              // alert('비밀번호는 이것입니다.'); this.props.navigation.navigate('Login')
              console.log("FindPass")
              const snapshot = await database.ref('Users/UserInfo').once('value')
              var loginKey = 0;
              var findPassword = false;
              var PasswordValue = "";
              snapshot.forEach(childSnapshot=>{
                const child = childSnapshot.val();
                if(child.id === ID&&child.name === Name){
                  findPassword = true;
                  PasswordValue = child.password;
                  loginKey = childSnapshot.key;
                }
              })
              if(findPassword==true){
                console.log(snapshot.val()[loginKey])
                alert('회원님의 비밀번호는 \n'+ PasswordValue +' 입니다.');
                this.props.navigation.navigate('Login')
              }else{
                alert('회원님의 비밀번호를 찾을 수 없습니다.');
              }
             
            }
          } /> 
        </View>
      </View>
      </SafeAreaView>
    )
  }
}

export default FindID;