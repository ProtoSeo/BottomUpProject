import React from 'react'
import { StyleSheet, Text, ScrollView,TouchableOpacity,TextInput,View, KeyboardAvoidingView, } from 'react-native';
import { Icon } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GradientButton from 'react-native-gradient-buttons';

const Gu = 
['강서구','금정구','남구','동구','동래구','부산진구','북구','사상구','사하구','서구','수영구','연제구','영도구','중구','해운대구']


class Busan extends React.Component {
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
        <TouchableOpacity onPress={this.test} >
              <Text>뒤로가기</Text>
            </TouchableOpacity>
        </View>
        <KeyboardAvoidingView behavior={'height'}> 
       
        <View style={styles.view}>
        <TextInput
            placeholder="시/군/구를 검색하세요"
            style={{alignItems:'center',justifyContent:'center',backgroundColor:'white',borderWidth : 1, padding : 10,}}
         />  
        <ScrollView >
          
          {Gu.map((i) => {
              return (
                <GradientButton key={i} style={{ marginVertical: 8 ,marginLeft : 30}} text = {i} 
                onPressAction={() => this.props.navigation.navigate('Sijang',{name : '부산광역시 ' + i} )}width='80%' deepBlue impact />
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

export default Busan;