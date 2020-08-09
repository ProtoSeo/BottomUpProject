import React from 'react'
import { StyleSheet, Text, ScrollView,TouchableOpacity,TextInput,View, KeyboardAvoidingView, } from 'react-native';
import { Icon } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GradientButton from 'react-native-gradient-buttons';
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

class City extends React.Component {
  state = {
    searchString: '시장을 검색하세요',
    dataList :[]
  }
  test = (e) => {
    this.props.navigation.goBack();
  }
  // getData = async() =>{
  //   var regionList = [];
  //   const snapshot = await database.ref(`Data/${this.props.navigation.getParam('name')}`).once('value')
  //     snapshot.forEach(childSnapshot=>{
  //     var key = childSnapshot.key;
  //     var childData =childSnapshot.child("시군구").val()
  //     regionList.push(childData);
  //   })
  //   Promise.all(regionList);
  //   let resultList = new Set([...regionList])
  //   return [...resultList]
  // }
  // async componentDidMount() {
  //   let data = await this.getData();
  //   this.setState({dataList:data})  
  // }
  render () {
    console.log(this.props.navigation.getParam('name'))
    const regionName = this.props.navigation.getParam('name')
    const regionList = this.props.navigation.getParam("regionList")
    return(
      <View>
        <View style={styles.one}>
          <Text style={styles.title}>우리 시소</Text>
        </View>
        <View>
        <TouchableOpacity onPress={this.test} value={regionName}>
              <Text>뒤로가기</Text>
            </TouchableOpacity>
        </View>
        <KeyboardAvoidingView behavior={'height'}> 
       
        <View style={styles.view}>
        <TextInput
            placeholder="Email"
            style={{alignItems:'center',justifyContent:'center',backgroundColor:'white',borderWidth : 1, padding : 10,}}
         />  
        <ScrollView >
          {regionList.map((region,i) => {
              return (
                <GradientButton key={i}  style={{ marginVertical: 8 ,marginLeft : 30}} text = {region} 
                prev = {region} onPressAction={() => this.props.navigation.navigate('Market',{name :regionName+ " " + region} )} width='80%' deepBlue impact />
              )
          })}
        </ScrollView>

        </View>
        <View style={{flexDirection:'row', flex : 1, marginTop:'10%',}}>
        <View>
      <TextInput
        placeholder="Email"
        style={{alignItems:'center',justifyContent:'center',backgroundColor:'white',marginLeft : '50%',borderWidth : 1, padding : 10,}}
        
      />
  </View>
          <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}} underlayColor = 'transparent'>
            <View>
              <Icon name="search" size = {20} color = "#4285F4" />
            </View>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
      </View>
    
    )
  }
}

const styles = StyleSheet.create({
  title : {
    marginTop : 22,
    textAlign : 'center',
    fontSize :24,
  },
  text : {
    marginTop : '15%',
    width : 35,
    marginLeft : 65,
  },
  image : {
    flex : 1,
  },
  view : {
    width : '80%',
    height: '75%',
    borderColor : 'black',
    backgroundColor: 'skyblue',
    textAlign : 'center',
    marginTop : '10%',
    marginLeft : '10%',
    borderWidth : 1,
    borderColor : 'black',
  
  },
  one : {
    flex : 1,
  }
});

export default City;