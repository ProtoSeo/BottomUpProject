import React from 'react';
import { Text, TextInput, ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Alert, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import GradientButton from 'react-native-gradient-buttons';
import * as firebase from "firebase";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogButton,
  ScaleAnimation,
} from 'react-native-popup-dialog';
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

class City extends React.PureComponent {
  
  state = {
    searchString: '',
    dataList: [],
    region: [],
    searchreg: [],
    menuDialog:false,
  }
  componentDidMount() {
    var arr = []
    const reg = this.props.navigation.getParam('regionList');
    for (var i = 0; i < reg.length; i++) {
      var region1 = reg[i].split('/')[0];
      arr.push(region1)
    }
    this.setState({
      region: arr
    })
  }

  home = () => {
    this.setState({ menuDialog: false });
    this.props.navigation.navigate('Home');
  }

  back = (e) => {
    this.props.navigation.goBack();
  }

  mypage = async () => {
    var uid = this.props.navigation.getParam("uid");
    const snapshot = await database.ref(`Users/UserInfo/${uid}`).once('value');
    const favoriteSnapshot = await database.ref(`Users/UserInfo/${uid}/favorite/list`).once('value');
    
    var userName = snapshot.val()["name"];
    var userID = snapshot.val()["id"];
    var userPhone = snapshot.val()['phone'];
    var favoriteList = []
    if(favoriteSnapshot.exists && favoriteSnapshot.val() !== null){
      favoriteList = favoriteSnapshot.val();
    }
    this.setState({ menuDialog: false });
    this.props.navigation.navigate('UserInfo', { uid: uid, userName: userName, userID: userID, userPhone: userPhone, favoriteList: favoriteList });
  }

  gotoNextView = async (region) => {
    console.log(region)
    const regionName = this.props.navigation.getParam('name')
    const uid = this.props.navigation.getParam("uid");
    const prevData = region.split('/');
    const userDataSnapshot = await database.ref(`Users/UserInfo/${uid}`).child("taste").once('value');
    var userTasteDict = userDataSnapshot.val();
    var userTasteList = Object.keys(userTasteDict).map(function (key) {
      return [key, userTasteDict[key]];
    });
    userTasteList.sort(function (first, second) {
      return second[1] - first[1];
    });
    userTasteList = userTasteList.map(function (value, index) { return value[0]; });
    console.log("사용자의 취향 리스트", userTasteList);
    var marketList = [];
    const snapshot = await database.ref(`Data/${regionName}`).once('value');
    snapshot.forEach(childSnapshot => {
      var regionData = childSnapshot.child("시군구").val();
      var marketData = childSnapshot.child("시장명").val();
      if (regionData == prevData[0] && marketData == prevData[1]) {
        var marketDict = {}
        marketDict["상가이름"] = childSnapshot.child("상가이름").val();
        marketDict["음식"] = childSnapshot.child("음식").val();
        marketDict["음식태그"] = childSnapshot.child("음식태그").val();
        marketDict["주소도로명"] = childSnapshot.child("주소도로명").val();
        marketDict["평점"] = childSnapshot.child("평점").val();
        marketDict["특징"] = childSnapshot.child("특징").val();
        marketDict["uri"] = childSnapshot.child("uri").val();
        marketDict["선호"] = false;
        marketList.push(marketDict);
      }
    })
    await Promise.all(marketList);
    var resultMarketList = []
    userTasteList.forEach(tasteInfo => {
      for (var i = 0; i < marketList.length; i++) {
        var chk = true;
        if (marketList[i]["음식태그"].indexOf(tasteInfo) !== -1) {
          // resultMarketList를 한 번더 순회해서 만약에 이미 저장되어있는 데이터라면 chk = false
          resultMarketList.forEach(result => {
            if (result == marketList[i]) {
              chk = false;
            }
          })
          if (chk) {
            resultMarketList.push(marketList[i]);
          }
        }
      }
    })
    const favoriteSnapshot = await database.ref(`Users/UserInfo/${uid}/favorite/list`).once('value');
    favoriteSnapshot.forEach(childSnapshot => {
      var marketData = childSnapshot.child("상가이름").val();
      var locData = childSnapshot.child("주소도로명").val();
      resultMarketList.forEach(result => {
        if (result["상가이름"] == marketData && result["주소도로명"] == locData) {
          result["선호"] = true;
        }
      })
    })
    var seasonList = ["봄","여름","가을","겨울","연중"];
    var specialtyList = [];
    const marketInfoSnapshot = await database.ref(`Market`).once('value');
    marketInfoSnapshot.forEach(marketInfo=>{
      var regionData = marketInfo.child("시군구").val();
      var marketData = marketInfo.child("시장명").val();
      if (regionData == prevData[0] && marketData == prevData[1]){
        specialtyList.push(marketInfo.val()["시장정보"]);
      } 
    });
    const specialtySnapshot = await database.ref(`Specialty`).once('value');
    console.log(region,prevData[0])
    specialtySnapshot.forEach(specialtyInfo=>{
      var regionData = specialtyInfo.child("시도").val();
      var cityData = specialtyInfo.child("시군구").val();
      
      if (regionData == regionName && cityData == prevData[0]){
        seasonList.forEach(season=>{
          specialtyList.push(specialtyInfo.val()[`${season}`])
        })
      } 
    });
    console.log(specialtyList)
    
    this.props.navigation.navigate('Sijang', { name: `${prevData[1]}`, marketList: resultMarketList,specialtyList:specialtyList, uid: uid })
  }
  logout = () => {
    Alert.alert(
      '로그아웃',
      '로그아웃 하시겠습니까?',
      [
        {
          text: 'Yes', style: 'cancel', onPress: () => {
            this.setState({ menuDialog: false });
            this.props.navigation.navigate('Login');
          }
        },
        { text: 'NO', onPress: () => { }, style: 'cancel' },
      ]
    )
  }

  updateSearch = (text) => {
    this.setState({
      searchString: text
    })
    const reg = this.props.navigation.getParam('regionList');

    var arr = [];
    for (var i = 0; i < reg.length; i++) {
      if (text == this.state.region[i] && this.state.region[i] == reg[i].split('/')[0]) {
        arr.push(reg[i]);
      }
    }
    this.setState({
      searchreg: arr
    })
  }

  render() {
    const { searchString } = this.state;
    const regionName = this.props.navigation.getParam('name')
    const regionList = this.props.navigation.getParam("regionList")

    const uid = this.props.navigation.getParam("uid")
    return (
      <SafeAreaView style={{flex : 1}}>
      <View style={styles.container}>
        <View style={styles.TopBar}>

          <View style={{ flex: 2 }}>
            <TouchableOpacity style={styles.TopButton} onPress={() => {
              this.setState({
                menuDialog: true
              });
            }}>
              <AntDesign name="bars" size={25} color="white" />
            </TouchableOpacity>

            <Dialog
              onTouchOutside={() => {
                this.setState({ menuDialog: false });
              }}
              width={0.9}
              visible={this.state.menuDialog}
              dialogAnimation={new ScaleAnimation()}
              onHardwareBackPress={() => {
                console.log('onHardwareBackPress');
                this.setState({ menuDialog: false });
                return true;
              }}
              dialogTitle={
                <DialogTitle
                  title="Menu"
                  hasTitleBar={true}
                  style={{ color: '#6A6F75', fontSize: 24 }}
                />
              }
              actions={[
                <DialogButton
                  text="DISMISS"
                  onPress={() => {
                    this.setState({ menuDialog: false });
                  }}
                  key="button-1"
                />,
              ]}
            >
              <DialogContent>
                <View>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.dialog_Button} onPress={this.home}>
                      <AntDesign name="home" size={30} color="#6466E3" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.dialog_Button} onPress={this.mypage}>
                      <AntDesign name="user" size={30} color="#6466E3" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.dialog_Button} onPress={this.logout}>
                      <AntDesign name="deleteuser" size={30} color="#6466E3" />
                    </TouchableOpacity>

                  </View>

                  <TouchableOpacity
                    style={{ alignItems: 'center' }}
                    onPress={() => {
                      this.setState({ menuDialog: false });
                    }}>
                    <Text style={{ fontSize: 20, color: "#81888F" }}>CLOSE</Text>
                  </TouchableOpacity>
                </View>
              </DialogContent>
            </Dialog>

          </View>

          <View style={{ flex: 3, alignItems: 'center' }}>
            <Text style={styles.TopBarText}>
              시장 선택
          </Text>
          </View>

          <View style={{ flex: 2 }}>
            <TouchableOpacity style={styles.TopButton} onPress={this.back}>
              <AntDesign name="back" size={25} color="white" />
            </TouchableOpacity>
          </View>

        </View>

        <KeyboardAvoidingView behavior={'height'}>

          <View style={styles.view}>
            <ScrollView>
              {!this.state.region.includes(this.state.searchString) ? regionList.map((region, i) => {
                return (
                  <GradientButton key={i} style={{ marginVertical: 8, marginLeft: 30 }} text={region}
                    prev={region} onPressAction={
                      () => this.gotoNextView(region)
                    } width='80%' deepBlue impact />
                )
              }) : this.state.searchreg.map((region, i) => {
                return (
                  <GradientButton key={i} style={{ marginVertical: 8, marginLeft: 30 }} text={region}
                    prev={region} onPressAction={
                      () => this.gotoNextView(region)
                    } width='80%' deepBlue impact />
                )
              })}
            </ScrollView>
          </View>

          <View style={styles.SearchSpace}>
            <TextInput
              style={styles.input}
              placeholder="시장을 검색하세요"
              onChangeText={this.updateSearch}
              value={searchString}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
      </SafeAreaView>
    )
  }
}

export default City;