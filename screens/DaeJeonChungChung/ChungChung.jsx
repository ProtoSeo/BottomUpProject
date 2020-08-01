import React from 'react'
import { StyleSheet, Text, ScrollView,TouchableOpacity,TextInput,View, KeyboardAvoidingView, } from 'react-native';
import { Icon } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GradientButton from 'react-native-gradient-buttons';

const Gu = 
['세종시','과천시','제천시','청주시','충주시','계룡시','공주시','논산시','당진시','보령시','서산시','아산시','천안시',
'괴산군','단양군','보은군','영동군','옥천군','음성군','증평군','진천군','금산군','부여군','서천군','예산군','청양군','태안군','홍성군'
]


class ChungChung extends React.Component {
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
        <GradientButton key={'대전광역시'} style={{ marginVertical: 8 ,marginLeft : 30}} text = "대전광역시" 
        onPressAction={() => this.props.navigation.navigate('대전광역시')}width='80%' deepBlue impact />
          {Gu.map((i) => {
              return (
                <GradientButton key={i} style={{ marginVertical: 8 ,marginLeft : 30}} text = {i} prev = {i} 
                onPressAction={() => this.props.navigation.navigate('Sijang',{name : i})}width='80%' deepBlue impact />
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

export default ChungChung;