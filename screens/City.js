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

const Gu = ['강남구','강동구','강북구',
'강서구','관악구','광진구','구로구','금천구','노원구','도봉구','동대문구','동작구','마포구','서대문구','서초구','성동구','성북구','송파구','양천구','영등포구','용산구','은평구','종로구','중구','중랑구']

class City extends React.Component {
  state = {
    searchString: '시장을 검색하세요',
    name : Gu, 
    dataList :[]
  }
  test = (e) => {
    this.props.navigation.goBack();
  }
  getData = async() =>{
    var regionList = [];
    const snapshot = await database.ref(`Data/${this.props.navigation.getParam('name')}`).once('value')
      snapshot.forEach(childSnapshot=>{
      var key = childSnapshot.key;
      var childData =childSnapshot.child("시군구").val()
      regionList.push(childData);
    }
    )
    Promise.all(regionList);
    let resultList = new Set([...regionList])
    // console.log( [...resultList])
    return [...resultList]
  }
  componentDidMount() {
    this.getData()
    .then((data) => {
      this.setState({
        dataList:data,
      })  
    })
  }
  render () {
    console.log(this.props.navigation.getParam('name'))
    const regionName = this.props.navigation.getParam('name')
    const {dataList} = this.state; 
    console.log("data",dataList)
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
          {dataList.map((i) => {
              return (
                <GradientButton key={i}  style={{ marginVertical: 8 ,marginLeft : 30}} text = {i} 
                prev = {i} onPressAction={() => this.props.navigation.navigate('Market',{name : '서울광역시 ' + i} )}width='80%' deepBlue impact />
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