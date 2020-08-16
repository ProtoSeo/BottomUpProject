import React, { Component }  from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Button } from 'react-native-elements'
import * as firebase from "firebase";
import "firebase/database";

import styles from "../design/styles";
console.disableYellowBox = true;
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
    Name : '',
    Phone : '',
    PhoneLen : 0,
  };

  updateName = (name) => {
    this.setState({Name : name})
  }
  updatePhone = (phone) => {
    if(phone.length>=this.state.PhoneLen){
      if(phone.length==3||phone.length==8){
        phone += "-";
      }
    }
    this.setState({Phone : phone ,PhoneLen : phone.length})
  }
  
  test = () => {
    this.props.navigation.goBack();
  }
  render() {
    const { Name, Phone } = this.state;
    
    return (
      <SafeAreaView style={{flex : 1}}>
      <View style={styles.container}>
        <View style={styles.TopBar}>

        <View style={{flex: 2}}>
        </View>

          <View style={{flex: 3, alignItems: 'center'}}>
            <Text style={styles.TopBarText}>
              Find ID
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
              이름을 입력하세요
          </Text>
          <TextInput
            placeholder="ex): 홍길동"
            style={styles.input}
            onChangeText={this.updateName}
            value={this.state.Name}
          />
          <Text style={{textAlign : 'center', marginVertical: '5%', fontSize: 20,}}>
              전화번호를 입력하세요
          </Text>
          <TextInput
            keyboardType = 'numeric'
            placeholder="ex): 010-0000-0000"
            style={styles.input}
            onChangeText={this.updatePhone}
            value={this.state.Phone}
          />
          </View>
          <Button style={{width: '30%', alignContents:'center', marginTop : '10%', marginHorizontal: '35%', marginBottom:'10%'}} titleStyle={{color: "white",fontSize: 15, padding :'5%'}} 
          buttonStyle={{backgroundColor: "#7E64CC", height: '46%'}} title={`아이디 찾기`} onPress=
          {
            async () => 
            {
              // alert('비밀번호는 이것입니다.'); this.props.navigation.navigate('Login')
              console.log("FindId")
              const snapshot = await database.ref('Users/UserInfo').once('value')
              var loginKey = 0;
              var findID = false;
              var IdValue = "";
              snapshot.forEach(childSnapshot=>{
                const child = childSnapshot.val();
                if(child.phone === Phone&&child.name === Name){
                  findID = true;
                  loginKey = childSnapshot.key;
                  IdValue = child.id;
                }
              })
              if(findID==true){
                console.log(snapshot.val()[loginKey])
                Alert.alert('회원님의 아이디는 \n'+ IdValue +' 입니다.');
                this.props.navigation.navigate('Login')
              }else{
                Alert.alert('회원님의 아이디를 찾을 수 없습니다.');
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