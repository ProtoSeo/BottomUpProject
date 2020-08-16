import React, { Component } from 'react';
import Swiper from "react-native-web-swiper";
import { AntDesign } from '@expo/vector-icons';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView, 
  Alert
} from 'react-native';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogButton,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import StarRating from 'react-native-star-rating';
import * as firebase from "firebase";
import "firebase/database";
import FoodImage from './FoodImage';
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
var database = firebase.database();
var showComponent = [true, true, true, true, true, true];
console.disableYellowBox = true;
class Sijang extends Component {
  constructor(props) {
    super(props);
    const specialtyList = this.props.navigation.getParam("specialtyList")
    specialtyList.forEach((specialty, key) => {
      if (specialty == '') {
        showComponent[key] = false;
      }
    });
    this.state = {
      menuDialog: false,
      LoginDialog: false,
      market: false,
      starCount: 3.5,
      MarketName: '',
      SubName: '',
      uri: '',
      place: '',
      marketList: this.props.navigation.getParam("marketList"),
      specialtyList : specialtyList
    }
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
  home = () => {
    this.setState({ menuDialog: false });
    this.props.navigation.navigate('Home');
  }
  test = () => {
    this.props.navigation.goBack();
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  openmodal = () => {
    this.setState({
      market: true,
    })
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
      favoriteList = Object.values(favoriteSnapshot.val());
    }
    this.setState({ menuDialog: false });
    this.props.navigation.navigate('UserInfo', { uid: uid, userName: userName, userID: userID, userPhone: userPhone, favoriteList: favoriteList });
  }

  favorite = async (key) => {
    var marketList = this.state.marketList;
    const uid = this.props.navigation.getParam('uid');
    if (marketList[key]["선호"] == true) {  //true 
      marketList[key]["선호"] = false;
      this.setState({ marketList: marketList });
      var marketName = marketList[key]["상가이름"];
      var marketLocation = marketList[key]["주소도로명"];
      var updateList = []
      const snapshot = await database.ref(`Users/UserInfo/${uid}/favorite/list`).once('value');

      snapshot.forEach(childSnapshot => {
        var key = childSnapshot.key
        var marketData = childSnapshot.child("상가이름").val();
        var locData = childSnapshot.child("주소도로명").val();
        if (marketData != marketName || locData != marketLocation) {
          updateList[key] = childSnapshot.val();
        }
      })
      await database.ref(`Users/UserInfo/${uid}/favorite/list`).set(updateList);
    } else {  //false  
      marketList[key]["선호"] = true;
      this.setState({ marketList: marketList });
      const foodTag = marketList[key]["음식태그"].split(' ');
      for (const tag of foodTag) {
        const tasteSnapshot = await database.ref(`Users/UserInfo/${uid}/taste`).child(`${tag}`).once('value');
        var score = tasteSnapshot.val() + 2;
        await database.ref(`Users/UserInfo/${uid}/taste`).child(`${tag}`).set(score);
      }
      const snapshot = await database.ref(`Users/UserInfo/${uid}/favorite/count`).once('value');
      var count = snapshot.val();
      await database.ref(`Users/UserInfo/${uid}/favorite/list/${count}`).set(
        marketList[key]
      );
      await database.ref(`Users/UserInfo/${uid}/favorite/count`).set(++count);
    }
  }
  returnFoodTag(dict){
    var tagList = dict['음식태그'].split(' ');
    return tagList[0];
  }
  shouldComponentUpdate(nextProps,nextState){
      return this.state.marketList == nextState.marketList;
  }
  render() {
    const { marketList,specialtyList } = this.state;
    console.log("Sijang");
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
                      <AntDesign name="home" size={30} color="#799FA7" />
                      <Text style={styles.small_text}>홈으로</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.dialog_Button} onPress={this.mypage}>
                      <AntDesign name="user" size={30} color="#799FA7" />
                      <Text style={styles.small_text}>마이페이지</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.dialog_Button} onPress={this.logout}>
                      <AntDesign name="deleteuser" size={30} color="#799FA7" />
                      <Text style={styles.small_text}>로그아웃</Text>
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

            <Dialog
              onTouchOutside={() => {
                this.setState({ market: false });
              }}
              width={0.9}
              visible={this.state.market}
              dialogAnimation={new ScaleAnimation()}
              onHardwareBackPress={() => {
                console.log('onHardwareBackPress');
                this.setState({ market: false });
                return true;
              }}
              dialogTitle={
                <DialogTitle
                  title='Market Info'
                  hasTitleBar={true}
                  style={{ color: '#6A6F75', fontSize: 30 }}
                />
              }
              actions={[
                <DialogButton
                  text="DISMISS"
                  onPress={() => {
                    this.setState({ market: false });
                  }}
                  key="button-1"
                />,
              ]}
            >
              {/* 음식점을 눌렀을 때 나오는 Dialog state 이용 */}
              <DialogContent>
                <ScrollView>
                  <View style={{ height: '100%' }}>

                    <View style={{marginBottom: '15%', alignItems: 'center'}}>

                    <Text style={styles.title_text}>
                      {this.state.MarketName}
                    </Text>

                    <Text style={styles.explain_text}>
                      예상 평점 : {this.state.starCount}
                    </Text>

                      <StarRating
                        disabled={false}
                        emptyStar={require('./images/starEmpty.png')}
                        fullStar={require('./images/starFilled.png')}
                        halfStar={require('./images/starHalf.png')}
                        iconSet={'Ionicons'}
                        maxStars={5}
                        rating={this.state.starCount}
                        selectedStar={(rating) => this.onStarRatingPress(rating)} />
                    </View>
                    <Text style={styles.explain_text}>
                      판매 상품 : {this.state.SubName}
                    </Text>
                    <Text style={styles.explain_text}>
                      매장 위치 : {this.state.place}
                    </Text>
                    <Text style={styles.explain_text}>
                      [사용가능한 지역화폐]
                    </Text>
                    <Image source={{ uri: `${this.state.uri}` }} style={{ marginBottom: '5%', height: 200, resizeMode: 'cover' }} />

                    <TouchableOpacity
                      style={{ alignItems: 'center' }}
                      onPress={() => {
                        this.setState({ market: false });
                      }}>
                      <Text style={{ fontSize: 20, color: "#81888F" }}>CLOSE</Text>

                    </TouchableOpacity>

                  </View>
                </ScrollView>
              </DialogContent>
            </Dialog>

          </View>

          <View style={{ flex: 3, alignItems: 'center' }}>
            <Text style={styles.TopBarText}>
              {this.props.navigation.getParam('name')}
            </Text>
          </View>

          <View style={{ flex: 2 }}>
            <TouchableOpacity style={styles.TopButton} onPress={this.test}>
              <AntDesign name="back" size={25} color="white" />
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.SlideSpace}>
          <Swiper showsButtons={true} nextButton={false}>
            {showComponent[0] && <View style={[styles.slideContainer, styles.slide1]}>
              <Text>시장의 정보 : {specialtyList[0]}</Text>
            </View>}
            {showComponent[1]&&<View style={[styles.slideContainer, styles.slide2]}>
              <Text style={{marginTop: "10%", fontSize: 25}}>봄 특산물 : {specialtyList[1]}</Text>
            </View>}
            {showComponent[2]&&<View style={[styles.slideContainer, styles.slide2]}>
              <Text style={{marginTop: "10%", fontSize: 25}}>여름 특산물 : {specialtyList[2]}</Text>
            </View>}
            {showComponent[3]&&<View style={[styles.slideContainer, styles.slide2]}>
              <Text style={{marginTop: "10%", fontSize: 25}}>가을 특산물 : {specialtyList[3]}</Text>
            </View>}
            {showComponent[4]&&<View style={[styles.slideContainer, styles.slide2]}>
              <Text style={{marginTop: "10%", fontSize: 25}}>겨울 특산물 : {specialtyList[4]}</Text>
            </View>}
            {showComponent[5]&&<View style={[styles.slideContainer, styles.slide2]}>
              <Text style={{marginTop: "10%", fontSize: 25}}>연중 특산물 : {specialtyList[5]}</Text>
            </View>}
          </Swiper>
          {/* 여기가 Swiper 텍스트 사용가능 터치블 사용가능*/}
        </View>

        <ScrollView style={styles.MainSpace}>
          {marketList.map((marketDict, key) =>
            <View key={key} style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.item_view} onPress={
                () => {
                  this.setState({
                    market: true,
                    MarketName: marketDict["상가이름"],
                    starCount: marketDict["평점"],
                    SubName: marketDict["음식"],
                    uri: marketDict['uri'],
                    place: marketDict['주소도로명'],
                  })
                }
              } >
                <View style={{ flex: 7, flexDirection: 'row' }}>
                  <Image style={styles.item_icon} source={FoodImage[this.returnFoodTag(marketDict)].src} />
                  <Text style={styles.item_title}>{marketDict["상가이름"]}</Text>
                </View>
                <View style={{ flex: 3 }}>
                  <Text style={styles.item_subtitle}>{marketDict["음식"]}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item_heart} onPress={()=>this.favorite(key)}>
                {
                  marketDict["선호"] ?
                    <AntDesign name="heart" size={30} color="#D62B83" /> :
                    <AntDesign name="hearto" size={30} color="#D62B83" />
                }
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
      </SafeAreaView>
    )
  }
}

export default Sijang;