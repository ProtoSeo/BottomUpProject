import React, { Component } from 'react';
import Swiper from "react-native-web-swiper";
import { AntDesign } from '@expo/vector-icons';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView
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

class Sijang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      menuDialog: false,
      LoginDialog: false,
      market: false,
      starCount: 3.5,
      MarketName: '',
      SubName: '',
      uri: '',
      place: '',
      marketList: this.props.navigation.getParam("marketList"),
    }
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  test = () => {
    this.props.navigation.goBack();
  }

  changeState = () => {
    this.props.navigation.navigate('Home');
    this.setState({ menuDialog: false });
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
      favoriteList = favoriteSnapshot.val();
    }
    this.setState({ menuDialog: false });
    this.props.navigation.navigate('UserInfo', { uid: uid, userName: userName, userID: userID, userPhone: userPhone, favoriteList: favoriteList });
  }

  favorite = async (key) => {
    var marketList = this.state.marketList;
    const uid = this.props.navigation.getParam('uid');
    if (marketList[key]["선호"] == true) {  //true 
      marketList[key]["선호"] = false;

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
      var foodTag = marketList[key]["음식태그"].split(' ');
      for (var i = 0; i < foodTag.length; i++) {
        const tasteSnapshot = await database.ref(`Users/UserInfo/${uid}/taste`).child(`${foodTag[i]}`).once('value');
        var score = tasteSnapshot.val() + 2;
        await database.ref(`Users/UserInfo/${uid}/taste`).child(`${foodTag[i]}`).set(score);
      }
      const snapshot = await database.ref(`Users/UserInfo/${uid}/favorite/count`).once('value');
      var count = snapshot.val();
      await database.ref(`Users/UserInfo/${uid}/favorite/list/${count}`).set(
        marketList[key]
      );
      await database.ref(`Users/UserInfo/${uid}/favorite/count`).set(++count);
    }
    this.setState({ marketList: marketList });
  }

  shouldComponentUpdate(nextProps,nextState){
      return this.state.marketList == nextState.marketList;
  }
  render() {
    const { search, marketList } = this.state;
    const specialtyList = this.props.navigation.getParam("specialtyList")
    specialtyList.forEach((specialty, key) => {
      if (specialty == '') {
        console.log(key);
        showComponent[key] = false;
      }
    })
    console.log("Sijang")
    return (
      <View style={styles.container}>
        <View style={styles.TopBar}>
          <View style={{ flex: 2 }}>
            <TouchableOpacity style={styles.TopButton} onPress={() => {
              this.setState({
                menuDialog: true
              });
            }}>
              <AntDesign name="bars" size={15} color="white" />
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
                  title='Menu'
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
                    <TouchableOpacity style={styles.dialog_Button} onPress={this.changeState}>
                      <AntDesign name="home" size={20} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.dialog_Button} onPress={this.mypage}>
                      <AntDesign name="user" size={20} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.dialog_Button} onPress={this.onPress}>
                      <AntDesign name="setting" size={20} color="white" />
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
                  title={this.state.MarketName}
                  hasTitleBar={true}
                  style={{ color: '#6A6F75', fontSize: 24 }}
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
                  <View style={{ height: '50%' }}>

                    <View style={{ marginTop: '20%', marginBottom: '20%' }}>

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
                    <Text>
                      {this.state.starCount}
                    </Text>
                    <Text>
                      {this.state.MarketName}
                    </Text>
                    <Text>
                      {this.state.SubName}
                    </Text>
                    <Text>
                      {this.state.place}
                    </Text>
                    <Image source={{ uri: `${this.state.uri}` }} style={{ width: 300, height: 300, marginBottom: '5%' }} />

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
              <AntDesign name="back" size={15} color="white" />
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.SearchSpace}>
          <Swiper showsButtons={true} nextButton={false}>
            {showComponent[0] && <View style={[styles.slideContainer, styles.slide1]}>
              <Text>시장의 정보 : {specialtyList[0]}</Text>
            </View>}
            {showComponent[1] && <View style={[styles.slideContainer, styles.slide2]}>
              <Text>봄 : {specialtyList[1]}</Text>
            </View>}
            {showComponent[2] && <View style={[styles.slideContainer, styles.slide3]}>
              <Text>여름 : {specialtyList[2]}</Text>
            </View>}
            {showComponent[3] && <View style={[styles.slideContainer, styles.slide4]}>
              <Text>가을 : {specialtyList[3]}</Text>
            </View>}
            {showComponent[4] && <View style={[styles.slideContainer, styles.slide1]}>
              <Text>겨울 : {specialtyList[4]}</Text>
            </View>}
            {showComponent[5] && <View style={[styles.slideContainer, styles.slide2]}>
              <Text>연중 : {specialtyList[5]}</Text>
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
                  <Image style={styles.item_icon} source={require('./icon/rice.png')} />
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

        <View style={{ height: 20 }}></View>

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
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    height: 300,

  },
  slideContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  slide1: {
    backgroundColor: "rgba(20,20,200,0.3)"
  },
  slide2: {
    backgroundColor: "rgba(20,200,20,0.3)"
  },
  slide3: {
    backgroundColor: "rgba(215,178,116,0.3)"
  },
  slide4: {
    backgroundColor: "#50BCDF"
  },
  myEmptyStarStyle: {
    color: 'white',
  },
  TopBar: {
    height: '14%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#81888F',
    flexDirection: 'row'
  },

  TopBarText: {
    fontSize: 25,
    marginTop: '25%',
    color: 'white'
  },

  MainSpace: {
    height: '100%',
    backgroundColor: '#E8EAEB'
  },

  SearchSpace: {
    backgroundColor: '#E8EAEB',
    height: 120,
    justifyContent: 'center',

  },

  TopButton: {
    alignItems: 'center',
    backgroundColor: '#6A6F75',
    padding: '8%',
    marginHorizontal: '32%',
    marginTop: '38%',
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
    marginLeft: 12,
    height: 120,
    flex: 9
  },

  item_heart: {
    backgroundColor: '#E8EAEB',
    marginVertical: '12%',
    marginHorizontal: 20,
    height: 50,
    flex: 1
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

export default Sijang;