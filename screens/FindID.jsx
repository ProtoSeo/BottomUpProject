import React, { Component }  from 'react';
import { SearchBar } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Button } from 'react-native-elements'
import * as firebase from "firebase";
import "firebase/database";

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
    Phone : ''
  };

  updateName = (name) => {
    this.setState({Name : name})
  }
  updatePhone = (phone) => {
    this.setState({Phone : phone})
  }
  
  test = () => {
    this.props.navigation.goBack();
  }
  render() {
    const { search,Name,Phone } = this.state;
    
    return (
      <View style={styles.container}>
        <View style={styles.TopBar}>
        <View style={{flex: 2}}>
            </View>
          <View style={{flex: 3, alignItems: 'center'}}>
            <Text style={styles.TopBarText}>
              우리시소
            </Text>
          </View>
          <TouchableOpacity style={styles.TopButton} onPress={this.test}>
              <AntDesign name="back" size={30} color="white" />
            </TouchableOpacity>
        </View>
        
        <View style={styles.MainSpace}>
        <Text style={{textAlign : 'center',marginBottom : '10%',fontSize:25,}}>
              아이디 찾기
        </Text>
          <View>
          <SearchBar
            showCancel
            round
            lightTheme
            placeholder="이름을 입력하세요"
            containerStyle={{width:'85%',marginLeft:'7.5%',marginBottom :'5%'}}
            onChangeText={this.updateName}
            value={this.state.Name}
          />
          <SearchBar
            showCancel
            round
            lightTheme
            placeholder="전화번호를 입력하세요"
            containerStyle={{width:'85%',marginLeft:'7.5%',}}
            onChangeText={this.updatePhone}
            value={this.state.Phone}
          />
          </View>
          <Button style={{width:'30%',alignContents:'center',marginTop : '25%',marginLeft:'35%',marginBottom:'10%'}} titleStyle={{color: "white",fontSize: 15, padding :'5%'}} 
          buttonStyle={{backgroundColor: "gray",height: '50%'}} title={`아이디 찾기`} onPress=
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
                alert('회원님의 아이디는 \n'+ IdValue +'\n 이것입니다.');
                this.props.navigation.navigate('Login')
              }else{
                alert('회원님의 아이디를 찾을 수 없습니다.');
              }
            }
          } /> 
        </View>
        
        <View style={{height: 20}}></View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  TopBar: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#81888F',
    flexDirection: 'row'
  },

  TopBarText: {
    fontSize: 33, 
    marginTop: 25,
    color: 'white'
  },

  input :{
    alignItems: 'center',
    width : 60,
  },

  MainSpace: {
    height: 545,
    backgroundColor: '#E8EAEB',
    paddingTop : 50
  },

  SearchSpace: {
    height: 100,
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15
  },

  TopButton: {
    alignItems: 'center',
    backgroundColor: '#6A6F75',
    padding: 10,
    width : 50,
    height : 50,
    marginLeft: 20,
    marginRight: 40,
    marginTop: 70,
    marginBottom: 40
  },

  StatusButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 20,
    width: 30,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10
  },

  item_view: {
    backgroundColor: '#DDDDDD',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 120
  },

  item_title: {
    marginTop: 8,
    fontSize: 24,
  },

  item_subtitle: {
    fontSize: 14,
  },

  item_icon: {
    height: 20,
    width: 20,
    padding: 20,
    marginRight: 20
  },

  menu_dialogContentView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  menu_dialog_button: {
    width: '40%',
    height: 30,
  },

  dialog_Button: {
    alignItems: 'center',
    backgroundColor: '#6A6F75',
    padding: 10,
    marginVertical: 20,
    marginHorizontal: 20,
    flex: 1
  },

})


export default FindID;