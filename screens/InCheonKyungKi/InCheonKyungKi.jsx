import React from 'react'
import { StyleSheet, Text, ScrollView,TouchableOpacity,TextInput,View, KeyboardAvoidingView, } from 'react-native';
import { Icon } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GradientButton from 'react-native-gradient-buttons';

const Gu = 
['인천광역시','고양시','과천시','광명시','광주시','구리시',
'군포시','김포시','남양주시','동두천시','부천시',
'성남시','수원시','시흥시','안산시','안성시',
'안양시','양주시','여주시','오산시','용인시',
'의왕시','의정부시','이천시','파주시','평택시',
'포천시','하남시','화성시']


class InCheonKyungKi extends React.Component {
  state = {
    searchString: '시장을 검색하세요',
    name : Gu, 
  }
  test = (e) => {
    this.props.navigation.goBack();
  }
    

  render () {
    return(

      <View>
        <View style={styles.one}>
          <Text style={styles.title}>우리 시소</Text>
        </View>
        <View>
        <TouchableOpacity onPress={this.test} value="서울/경기">
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
          {console.log(this.props.prev)}
          {Gu.map((i) => {
              return (
                <GradientButton style={{ marginVertical: 8 ,marginLeft : 30}} text = {i} prev = {i} onPressAction={() => this.props.navigation.navigate(i,{name : i})}width='80%' deepBlue impact />
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

export default InCheonKyungKi;