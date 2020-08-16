import React, { Component }  from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import styles from "../design/styles";
console.disableYellowBox = true;
class SelectFind extends Component {

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
      <SafeAreaView style={{flex: 1}}>
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
              <AntDesign name="back" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.MainSpace}>
      
        <View style={{flex:1,flexDirection:'row',marginTop:'25%'}}>
            <View style={{flex:1,alignItems : 'center',marginTop : 
            '25%',}}>
              <TouchableOpacity onPress={() => {this.props.navigation.navigate('FindID')}} >
              <Text style={{fontSize:25}}>
              아이디 찾기
              </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex:1,alignItems : 'center',marginTop : 
            '25%',}}>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('FindPass')}}>
              <Text style={{alignContent : 'center',fontSize:25}} onChange={this.notequal2}>
              비밀번호 찾기
              </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      </SafeAreaView>
    )
  }
}

export default SelectFind;