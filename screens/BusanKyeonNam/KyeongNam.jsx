import React from 'react'
import { StyleSheet, Text, ScrollView,TouchableOpacity,TextInput,View, KeyboardAvoidingView, } from 'react-native';
import { Icon } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GradientButton from 'react-native-gradient-buttons';

const Gu = 
['거제시','김해시','밀양시','사천시','양산시','진주시','창원시','통영시',
'거창군','고성군','남해군','산청군','의령군','창녕군','하동군','함안군','함양군','합천군'
]


class KyeongNam extends React.Component {
  state = {
    searchString: '시장을 검색하세요',
    name : Gu, 
  }
  test = (e) => {
    this.props.navigation.goBack();
  }
    

  render () {
    return(

      <View style={{marginTop:15}}>
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
        <GradientButton key="부산광역시" style={{ marginVertical: 8 ,marginLeft : 30}} text = "부산광역시"
        onPressAction={() => this.props.navigation.navigate('부산광역시')}width='80%' deepBlue impact />
          {Gu.map((i) => {
              return (
                <GradientButton key={i} style={{ marginVertical: 8 ,marginLeft : 30}} text = {i} prev = {i}
                 onPressAction={() => this.props.navigation.navigate('Market',{name : '경남' + i})}width='80%' deepBlue impact />
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

export default KyeongNam;