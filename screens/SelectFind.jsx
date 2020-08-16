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
            <TouchableOpacity style={styles.TopButton} onPress={this.test}>
              <AntDesign name="left" size={25} color="white" />
            </TouchableOpacity>
          </View>

          <View style={{flex: 3, alignItems: 'center'}}>
            <Text style={styles.TopBarText}>
              Find ID/PW
            </Text>
          </View>

          <View style={{flex: 2}}>
          </View>

        </View>
        
        <View style={styles.MainSpace}>
      
        <View style={{flexDirection: 'row' ,flex: 1, marginTop: '40%'}}>
            <View style={{flex:1, alignItems : 'center'}}>
              <TouchableOpacity onPress={() => {this.props.navigation.navigate('FindID')}} style={styles.touchableopacity_1} >
              <Text style={{fontSize:25, margin: '10%', color: 'white'}}>
              아이디 찾기
              </Text>
              </TouchableOpacity>
            </View>

            <View style={{flex:1, alignItems : 'center'}}>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('FindPass')}} style={styles.touchableopacity_1} >
              <Text style={{fontSize:25, margin: '10%', color: 'white'}} onChange={this.notequal2}>
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