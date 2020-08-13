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

    const { search, ID ,Name} = this.state;

    const renderItem = ({ item }) => (
      <Item name={item.name} subname={item.subname} icon={item.icon} />
    )
    
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
          <View style={{flex: 2}}>
            <TouchableOpacity style={styles.TopButton} onPress={this.test}>
              <AntDesign name="back" size={15} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.MainSpace}>
        <Text style={{textAlign : 'center',marginBottom : '10%',fontSize:25,}}>
              비밀번호 찾기
        </Text>
          <View>
          <SearchBar
            showCancel
            round
            lightTheme
            placeholder="아이디를 입력하세요"
            containerStyle={{width:'85%',marginLeft:'7.5%',marginBottom :'5%'}}
            onChangeText={this.updateId}
            value={this.state.ID}
          />
          <SearchBar
            showCancel
            round
            lightTheme
            placeholder="이름을 입력하세요"
            containerStyle={{width:'85%',marginLeft:'7.5%',}}
            onChangeText={this.updateName}
            value={this.state.Name}
          />
          </View>
          <Button style={{width:'30%',alignContents:'center',marginTop : '25%',marginLeft:'35%',marginBottom:'10%'}} titleStyle={{color: "white",fontSize: 15, padding :'5%'}} 
          buttonStyle={{backgroundColor: "gray",height: '50%'}} title={`비밀번호 찾기`} onPress=
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
                alert('회원님의 비밀번호는 \n'+ PasswordValue +'\n 이것입니다.');
                this.props.navigation.navigate('Login')
              }else{
                alert('회원님의 비밀번호를 찾을 수 없습니다.');
              }
             
            }
          } /> 
        </View>
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
    fontSize: 25, 
    marginTop: '25%',
    color: 'white'
  },

  input :{
    alignItems: 'center',
    width : 60,
  },

  MainSpace: {
    flex: 1,
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
    padding: '8%',
    marginHorizontal: '32%',
    marginTop: '38%',
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