import React, { Component } from 'react';
import { AntDesign } from '@expo/vector-icons';
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView
} from 'react-native';
import * as firebase from "firebase";
import "firebase/database";

import styles from "../design/styles";

const firebaseConfig = {
  apiKey: "AIzaSyCipbhAk-bVbgdubYf_lLvRPXsSHFQhZS4",
  authDomain: "bottom-up-project.firebaseapp.com",
  databaseURL: "https://bottom-up-project.firebaseio.com",
  projectId: "bottom-up-project",
  storageBucket: "bottom-up-project.appspot.com",
  messagingSenderId: "109120495683",
  appId: "1:109120495683:web:84487d9538b2de43a5f4f6",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
var database = firebase.database()

class UserInfo extends Component {
  state = {
    search: '',
    menuDialog: false,
    market: false,
    MarketName: '',
    SubName: '',
    uri: '',
    place: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  test = () => {
    this.props.navigation.goBack();
  }

  render() {
    const userName = this.props.navigation.getParam("userName");
    const userID = this.props.navigation.getParam("userID");
    const userPhone = this.props.navigation.getParam("userPhone");
    const favoriteList = this.props.navigation.getParam("favoriteList");
    return (
      <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.TopBar}>
          <View style={{ flex: 2 }}>
          </View>
          <View style={{ flex: 3, alignItems: 'center' }}>
            <Text style={styles.TopBarText}>
              마이페이지
            </Text>
          </View>
          <View style={{ flex: 2 }}>
            <TouchableOpacity style={styles.TopButton} onPress={this.test}>
              <AntDesign name="back" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.MainSpace}>
          <View style={{ marginTop: '5%', marginLeft: '5%' }}>
            <Text style={{ fontSize: 24, }}>
              ID : {userID}
            </Text>
          </View>
          <View style={{ marginTop: '5%', marginLeft: '5%' }}>
            <Text style={{ fontSize: 24 }}>
              이름 : {userName}
            </Text>
          </View>
          <View style={{ marginTop: '5%', marginLeft: '5%' }}>
            <Text style={{ fontSize: 24 }}>
              전화번호 : {userPhone}
            </Text>
          </View>
          <View style={{ height: '75%' }}>
            <Text style={{ fontSize: 24, marginLeft: '5%', marginTop: '10%' }}>
              담아둔 시장
         </Text>

            <ScrollView style={styles.MainSpace}>
              {
              favoriteList.length==0? <View style={styles.list_like_view}><Text style={styles.title_text}>리스트가 비어있습니다.</Text></View>
               : (favoriteList.map((favoriteDict, key) =>
                <TouchableOpacity style={styles.item_view} onPress={
                  () => {
                    this.setState({
                      market: true,
                      MarketName: favoriteDict["상가이름"],
                      starCount: favoriteDict["평점"],
                      SubName: favoriteDict["음식"],
                      uri: favoriteDict['uri'],
                      place: favoriteDict['주소도로명'],
                    })
                  }
                } >
                  <View style={{ flex: 7, flexDirection: 'row' }}>
                    <Image style={styles.item_icon} source={require('./icon/rice.png')} />
                    <Text style={styles.item_title}>{favoriteDict["상가이름"]}</Text>
                  </View>
                  <View style={{ flex: 3 }}>
                    <Text style={styles.item_subtitle}>{favoriteDict["음식"]}</Text>
                  </View>
                </TouchableOpacity>
              ))
              }
            </ScrollView>
          </View>
        </View>
      </View>
      </SafeAreaView>
    )
  }
}

export default UserInfo;