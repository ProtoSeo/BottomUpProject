import React, { Component }  from 'react';
import { SearchBar } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
    const { search } = this.state;

    const renderItem = ({ item }) => (
      <Item name={item.name} subname={item.subname} icon={item.icon} />
    )
    
    return (
      <View style={styles.container}>
        <View style={styles.TopBar}>
          <View style={{flex: 3, alignItems: 'center'}}>
            <Text style={styles.TopBarText}>
              우리시소
            </Text>
          </View>
        </View>
        
        <View style={styles.MainSpace}>
        <Text style={{textAlign : 'center',marginBottom : '10%',fontSize:25,}}>
              로그인
        </Text>
          <View>
          <SearchBar
            showCancel
            round
            lightTheme
            placeholder="아이디"
            containerStyle={{width:'85%',marginLeft:'7.5%',marginBottom :'5%'}}
            onChangeText={this.updateId}
            value={this.state.ID}
          />
          <SearchBar
            showCancel
            round
            lightTheme
            placeholder="비밀번호"
            containerStyle={{width:'85%',marginLeft:'7.5%',}}
            onChangeText={this.updatepas}
            value={this.state.Password}
          />
          </View>

          <View style={{flexDirection : 'row',marginLeft:'8%',marginTop:'10%'}}>
          <Button style={{width:100,marginLeft:'5%',marginTop:'15%'}} titleStyle={{color: "white",fontSize: 15,}} 
          buttonStyle={{backgroundColor: "gray",height: '50%',}} title='로그인' onPress = {() => {this.props.navigation.navigate('Home')}} />
          <Button style={{width:100,marginLeft:'5%',marginTop:'15%'}} titleStyle={{color: "white",fontSize: 15,}} 
          buttonStyle={{backgroundColor: "gray",height: '50%'}} title='회원가입'
          onPress = {() => {this.props.navigation.navigate('SignUp')}} />
          <Button style={{width:100,marginLeft:'5%',marginTop:'15%'}} titleStyle={{color: "white",fontSize: 15,}} 
          buttonStyle={{width : '100%',backgroundColor: "gray",height: '50%'}} title={`아이디/${'\n'}비밀번호찾기`} 
          onPress = {() =>{this.props.navigation.navigate('SelectFind')}}/>
          </View>
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


export default Login;