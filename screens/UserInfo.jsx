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
var database = firebase.database()
console.disableYellowBox = true;
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
  returnFoodTag(dict){
    var tagList = dict['음식태그'].split(' ');
    return tagList[0];
  }
  render() {
    const userName = this.props.navigation.getParam("userName");
    const userID = this.props.navigation.getParam("userID");
    const userPhone = this.props.navigation.getParam("userPhone");
    const favoriteList = this.props.navigation.getParam("favoriteList");
    return (
      <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
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
        <View style={styles.TopBar}>

          <View style={{ flex: 2 }}>
            <TouchableOpacity style={styles.TopButton} onPress={this.test}>
              <AntDesign name="left" size={25} color="white" />
            </TouchableOpacity>
          </View>
          
          <View style={{ flex: 3, alignItems: 'center' }}>
            <Text style={styles.TopBarText}>
              마이페이지
            </Text>
          </View>

          <View style={{ flex: 2 }}>
          </View>

        </View>

        <View style={styles.MainSpace}>

          <View style={ styles.touchableopacity_3 }>

            <Text style={{ fontSize: 30, padding: 20, paddingLeft: '32.5%' }}>
              사용자 정보
            </Text>

            <Text style={{ fontSize: 24, padding: 10, }}>
              ID : {userID}
            </Text>
            
            <Text style={{ fontSize: 24, padding: 10,  }}>
              이름 : {userName}
            </Text>
            
            <Text style={{ fontSize: 24, padding: 10,  }}>
              전화번호 : {userPhone}
            </Text>
          </View>


          <View style={ styles.touchableopacity_1 }>
            <Text style={{ fontSize: 24, marginVertical: '5%', color: 'white'}}>
              담아둔 시장
            </Text>
          </View>

            <ScrollView style={styles.MainSpace}>
              {
              favoriteList.length==0? <View style={styles.list_like_view}><Text style={styles.title_text}>리스트가 비어있습니다.</Text></View>
               : (favoriteList.map((favoriteDict, key) =>
                <TouchableOpacity key = {key} style={styles.item_view} onPress={
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
                    <Image style={styles.item_icon} source={FoodImage[this.returnFoodTag(favoriteDict)].src} />
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
      </SafeAreaView>
    )
  }
}

export default UserInfo;