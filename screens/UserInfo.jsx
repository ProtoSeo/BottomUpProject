import React, { Component }  from 'react';
import { SearchBar } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  FlatList,
  Image
} from 'react-native';
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

const DATA = [
    {
      name: '중리시장',
      subname: '춘천365닭갈비, 오늘은 닭, 마인하우스',
      icon: './icon/chicken.png',
      number : 1,
    },
    {
      name: '중앙시장',
      subname: '오씨네 칼국수, 국수',
      icon: '.icon/soup'
    },
    {
      name: '유성시장',
      subname: '학생회관',
      icon: './icon/rice.png'
    },
    {
      name: '태평전통시장',
      subname: '충남통닭, 깻잎치킨',
      icon: './icon/chicken.png'
    },
    {
      name: '내 시장',
      subname: '마루, 배재원',
      icon: './icon/rice.png'
    }
  ]
const Item = ({ name, subname, func }) => (
    <TouchableOpacity style={styles.item_view} onPress={func}>
      <View style={{flex: 7, flexDirection: 'row'}}>
        <Image style={styles.item_icon} source={require('./icon/rice.png')}/>
        <Text style={styles.item_title}>{name}</Text>
      </View>
      <View style={{flex: 3}}>
        <Text style={styles.item_subtitle}>{subname}</Text>
      </View>
    </TouchableOpacity>
  )
  


class UserInfo extends Component {
  state = {
  
  };
  
  updateSearch = ( search) => {
    this.setState({ search });
  };
  
  test = () => {
    this.props.navigation.goBack();
  }

  render() {
    const renderItem = ({ item }) => (
        <Item name={item.name} subname={item.subname} icon={item.icon} func = {() => this.props.navigation.navigate('Sijang',{name:item.name})} />
      )
    const userName = this.props.navigation.getParam("userName");
    const userID = this.props.navigation.getParam("userID");
    return (
      <View style={styles.container}>
        <View style={styles.TopBar}>
          <View style={{flex: 2}}>
          </View>
          <View style={{flex: 3, alignItems: 'center'}}>
            <Text style={styles.TopBarText}>
              사용자 정보
            </Text>
          </View>
          <View style={{flex: 2}}>
            <TouchableOpacity style={styles.TopButton} onPress={this.test}>
              <AntDesign name="back" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.MainSpace}>
        <View style={{marginTop : '5%',marginLeft:'5%'}}>
         <Text style={{fontSize : 46}}>
             {userName}
         </Text>
        </View>
        <View style={{marginTop : '5%',marginLeft:'5%'}}>
         <Text style={{fontSize : 46}}>
             {userID}
         </Text>
         </View>
         <View style={{height: '65%'}}>
         <Text style={{fontSize : 46}}>
             선호도 리스트
         </Text>
         <ScrollView >
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.name}
          />
         </ScrollView>
         </View>
        </View>

        <View style={{height: 20}}></View>

       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  myStarStyle: {
    color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    height : 300,
 
  },
  myEmptyStarStyle: {
    color: 'white',
  },
  TopBar: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#81888F',
    flexDirection: 'row'
  },

  TopBarText: {
    fontSize: 25, 
    marginTop: 25,
    color: 'white'
  },

  MainSpace: {
    height: '100%',
    backgroundColor: '#E8EAEB'
  },

  SearchSpace: {
    height: 100,
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15
  },

  TopButton: {
    alignItems: 'center',
    backgroundColor: '#6A6F75',
    padding: 10,
    width : 60,
    height : 50,
    marginLeft: 20,
    marginRight: 40,
    marginTop: 70,
    marginBottom: 40
  },

  StatusButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 20,
    width: 30,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10
  },

  item_view: {
    backgroundColor: '#DDDDDD',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 120
  },

  item_title: {
    marginTop: 8,
    fontSize: 24,
  },

  item_subtitle: {
    fontSize: 14,
  },

  item_icon: {
    height: 20,
    width: 20,
    padding: 20,
    marginRight: 20
  },

  menu_dialogContentView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  menu_dialog_button: {
    width: '40%',
    height: 30,
  },

  dialog_Button: {
    alignItems: 'center',
    backgroundColor: '#6A6F75',
    padding: 10,
    marginVertical: 20,
    marginHorizontal: 20,
    flex: 1
  },

})

export default UserInfo;