import React from 'react'
import { StyleSheet, Text, ScrollView,TouchableOpacity,TextInput,View, KeyboardAvoidingView, Alert} from 'react-native';
import { Icon } from 'react-native-elements'
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

const List =["서울","경기","대전","부산","강원","경북","경남","광주","충북","울산","충남","전남","전북","제주","인천","세종"].sort()

class JeonGuk extends React.Component {
  state = {
    searchString: '시장을 검색하세요',
  }
  test = () => {
    
    Alert.alert(
      '로그아웃',
      '로그아웃 하시겠습니까?',
      [
        {text: 'Yes', onPress: () => this.props.navigation.navigate('Login'), style : 'cancle'},
        {text: 'NO', onPress: () => {}, style: 'cancel'},
        
      ]
    );
  }
  render () {
    return(
      <View>
        <View style={styles.one}>
          <Text style={styles.title}>우리 시소</Text>
        </View>
        <TouchableOpacity onPress={this.test} value="서울/경기">
              <Text>로그 아웃</Text>
            </TouchableOpacity>
        <KeyboardAvoidingView behavior={'height'}> 
        <View style={styles.view}>
        <TextInput
            placeholder="Email"
            style={{alignItems:'center',justifyContent:'center',backgroundColor:'white',borderWidth : 1, padding : 10,}}
         />  
        <ScrollView >
          {List.map((region,i)=><GradientButton key={i} style={{ marginVertical: 8 ,marginLeft : 30} } text={`${region}`}  
          onPressAction={
            async () => 
            {
              var regionList = [];
              const snapshot = await database.ref(`Data/${region}`).once('value')
              snapshot.forEach(childSnapshot=>{
              var key = childSnapshot.key;
              var childData = childSnapshot.child("시군구").val()
              regionList.push(childData);})
            await Promise.all(regionList);
            let resultList = new Set([...regionList])
            this.props.navigation.navigate('City',{name :`${region}`, regionList :[...resultList]})
            }
          } width='80%' deepBlue impact/>)}
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

export default JeonGuk;