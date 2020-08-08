import React from 'react'
import { StyleSheet, Text, ScrollView,TouchableOpacity,TextInput,View, KeyboardAvoidingView, } from 'react-native';
import { Icon } from 'react-native-elements'
import GradientButton from 'react-native-gradient-buttons';

const List =["서울","경기","대전","부산","강원","경북","경남","광주","충북","울산","충남","전남","전북","제주","인천","세종"].sort()

class JeonGuk extends React.Component {
  state = {
    searchString: '시장을 검색하세요',
  }
  render () {
    return(
      <View>
        <View style={styles.one}>
          <Text style={styles.title}>우리 시소</Text>
        </View>
        <KeyboardAvoidingView behavior={'height'}> 
        <View style={styles.view}>
        <TextInput
            placeholder="Email"
            style={{alignItems:'center',justifyContent:'center',backgroundColor:'white',borderWidth : 1, padding : 10,}}
         />  
        <ScrollView >
          {List.map((region,i)=><GradientButton key={i} style={{ marginVertical: 8 ,marginLeft : 30} } text={`${region}`}  onPressAction={() => this.props.navigation.navigate('City',{name :`${region}`})} width='80%' deepBlue impact/>)}
          <GradientButton style={{ marginVertical: 8 ,marginLeft : 30}} text="서울특별시" onPressAction={() => this.props.navigation.navigate('Seoul')}width='80%' deepBlue impact />
          <GradientButton style={{ marginVertical: 8 ,marginLeft : 30}} text="인천/경기" onPressAction={() => this.props.navigation.navigate('InCheonKyungKi')} prev = {'인천/경기'} width='80%' deepBlue impact />
          <GradientButton style={{ marginVertical: 8 ,marginLeft : 30}} text="대전/충청" onPressAction={() => this.props.navigation.navigate('ChungChung')} width='80%' deepBlue impact />
          <GradientButton style={{ marginVertical: 8 ,marginLeft : 30}} text="광주/전라" onPressAction={() => this.props.navigation.navigate('Jeonna')} width='80%' deepBlue impact />
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