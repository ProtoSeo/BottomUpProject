import React, { Component } from 'react';
import { AntDesign } from '@expo/vector-icons';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  ScrollView,
  Alert,
  SafeAreaView
} from 'react-native';
import { Button } from 'react-native-elements'
import * as firebase from "firebase";
import "firebase/database";
import { TextInput } from 'react-native-gesture-handler';

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

Array.prototype.clean = function (deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};
const FoodTagData =
{
  '한식': ['국수', '국밥'],
  '치킨': ['후라이드치킨', '닭강정'],
  '간식,분식': ['떡볶이', '돈까스'],
  '족발,보쌈,닭발': ['족발', '보쌈'],
  '아시안,양식': ['스테이크', '쌀국수'],
  '중식': ['짜장면', '짬뽕'],
  '고기,곱창': ['삼겹살', '곱창'],
  '회,일식,해산물': ['회', '초밥']
}
const ScoreData = [1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 8, 8, 11, 15]

var Fooduri = {
  '국수': 'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F215F0F3B590299982C',
  '국밥': 'https://post-phinf.pstatic.net/MjAxODEyMjFfMTgy/MDAxNTQ1MzczODQ0NzEw.5RIUL0OeLrelR9fTVFJwFeC4VXgvF8BdF-cq0tunm6wg.Z_0wCU6_GLpmMMgmNM4XSJH6NnIRuxfQfeIVAC17XGAg.JPEG/%EC%B5%9C%EB%AF%B8%EC%9E%90%EC%86%8C%EB%A8%B8%EB%A6%AC%EA%B5%AD%EB%B0%A5_%281%29_woooo__jung2_%EB%8B%98_%EC%9D%B8%EC%8A%A4%ED%83%80%EA%B7%B8%EB%9E%A8.jpg?type=w1200',
  '후라이드치킨': 'https://www.newscj.com/news/photo/202004/newscj_%EC%B2%9C%EC%A7%80%EC%9D%BC%EB%B3%B4_724514_750707_338.jpg',
  '닭강정': 'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F180953504F697E2529',
  '떡볶이': 'https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile30.uf.tistory.com%2Fimage%2F99FCD33359944F6532641B',
  '돈까스': 'https://freshdon.com/wp-content/uploads/2017/09/K-006.jpg',
  '족발': 'https://image.yes24.com/momo/TopCate2049/MidCate10/204897291.jpg',
  '보쌈': 'https://cdndept.galleria.co.kr/upload/dept/gourmet/au/to/00000000/gourmet-store/zw102435366ie.jpg',
  '스테이크': 'https://img.hankyung.com/photo/201712/BD.15504213.1.jpg',
  '쌀국수': 'https://pds.joins.com//news/component/htmlphoto_mmdata/201710/11/fc5305ca-da46-43f5-85b8-db7d783d44a0.jpg',
  '짜장면': 'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/2JVJ/image/vEBttMW9x_W027VoICmrbHh3fY4.png',
  '짬뽕': 'https://t1.daumcdn.net/cfile/tistory/9919F64C5D841C2A25',
  '삼겹살': 'https://t1.daumcdn.net/cfile/tistory/9942B3395A3501C304',
  '곱창': 'https://th1.tmon.kr/thumbs/image/83b/f24/95d/b81a7d388_700x700_95_FIT.jpg',
  '회': 'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99297C3359ED446C01',
  '초밥': 'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/00/a0000370/img/basic/a0000370_main.jpg?20200702132805&q=80&rw=750&rh=536'
}

var Food = ['국수', '국밥', '후라이드치킨', '닭강정', '떡볶이',
  '돈까스', '족발', '보쌈',
  '스테이크', '쌀국수', '짜장면', '짬뽕',
  '삼겹살', '곱창', '회', '초밥'].sort(function () { return 0.5 - Math.random() });

const FoodCopy = ['국수', '국밥', '후라이드치킨', '닭강정', '떡볶이',
  '돈까스', '족발', '보쌈',
  '스테이크', '쌀국수', '짜장면', '짬뽕',
  '삼겹살', '곱창', '회', '초밥'].sort(function () { return 0.5 - Math.random() });
console.disableYellowBox = true;
class SignUp extends Component {
  state = {
    idCheck: false,
    search: '',
    menuDialog: false,
    ID: '',
    Password: '',
    Phone: '',
    PhoneLen: 0,
    Name: '',
    initialFood: Food,
    SecondFood: [],
    SemiFinalFood: [],
    FinalFood: [],
    RealFinalFood: '',
    selectedchooseFood1: Food[0],
    selectedchooseFood2: Food[1],
    notSelected: [],
    i: 0,
  }
  updateId = (id) => {
    this.setState({ ID: id })
  }
  updatepas = (pas) => {
    this.setState({ Password: pas })
  }
  updatePhone = (phone) => {
    if(phone.length>=this.state.PhoneLen){
      if(phone.length==3||phone.length==8){
        phone += "-";
      }
    }
    this.setState({Phone : phone ,PhoneLen : phone.length})
  }
  updateName = (name) => {
    this.setState({ Name: name })
  }
  test = () => {
    this.props.navigation.goBack();
  }

  componentWillUnmount() {
    Food = JSON.parse(JSON.stringify(FoodCopy));
    this.setState({
      search: '',
      menuDialog: false,
      ID: '',
      Password: '',
      Phone: '',
      name: '',
      initialFood: Food,
      SecondFood: [],
      SemiFinalFood: [],
      FinalFood: [],
      RealFinalFood: '',
      selectedchooseFood1: Food[0],
      selectedchooseFood2: Food[1],
      notSelected: [],
      i: 0,
    })
  }
  ChooseFood1 = () => {
    if (this.state.i == 0) {
      this.state.SecondFood.push(this.state.initialFood[0]);
      this.state.notSelected.push(this.state.initialFood[1]);
      this.state.initialFood.splice(0, 2)
      console.log(this.state.SecondFood.length);
      this.setState({
        selectedchooseFood1: this.state.initialFood[0],
        selectedchooseFood2: this.state.initialFood[1]
      })
      if (this.state.SecondFood.length == 8) {
        alert('8강을 시작합니다.');
        this.state.i = 1;
        this.setState({
          selectedchooseFood1: this.state.SecondFood[0],
          selectedchooseFood2: this.state.SecondFood[1]
        })
        console.log(this.state.i, this.state.SecondFood)
      }
    }
    else if (this.state.i == 1) {
      this.state.SemiFinalFood.push(this.state.SecondFood[0]);
      this.state.notSelected.push(this.state.SecondFood[1]);
      this.state.SecondFood.splice(0, 2)
      console.log(this.state.SemiFinalFood.length);
      this.setState({
        selectedchooseFood1: this.state.SecondFood[0],
        selectedchooseFood2: this.state.SecondFood[1]
      })
      if (this.state.SemiFinalFood.length == 4) {
        alert('4강을 시작합니다.');
        this.state.i = 2;
        this.setState({
          selectedchooseFood1: this.state.SemiFinalFood[0],
          selectedchooseFood2: this.state.SemiFinalFood[1]
        })
        console.log(this.state.i, this.state.SemiFinalFood)
      }
    }
    else if (this.state.i == 2) {
      this.state.FinalFood.push(this.state.SemiFinalFood[0]);
      this.state.notSelected.push(this.state.SemiFinalFood[1]);
      this.state.SemiFinalFood.splice(0, 2)
      console.log(this.state.FinalFood.length);
      this.setState({
        selectedchooseFood1: this.state.SemiFinalFood[0],
        selectedchooseFood2: this.state.SemiFinalFood[1]
      })
      if (this.state.FinalFood.length == 2) {
        alert('결승입니다!!');
        this.state.i = 3;
        this.setState({
          selectedchooseFood1: this.state.FinalFood[0],
          selectedchooseFood2: this.state.FinalFood[1]
        })
        console.log(this.state.i, this.state.FinalFood)
      }
    }
    else if (this.state.i == 3) {
      this.state.RealFinalFood = this.state.FinalFood[0]
      this.state.notSelected.push(this.state.FinalFood[1]);
      this.state.notSelected.push(this.state.RealFinalFood);
      this.state.FinalFood.splice(0, 2)
      console.log(this.state.FinalFood.length);
      this.setState({
        selectedchooseFood1: this.state.FinalFood[0],
        selectedchooseFood2: this.state.FinalFood[1]
      })
      alert(`당신의 입맛이 정해졌습니다 당신의 입맛은 ${this.state.RealFinalFood}!!!`);
      const deepCopy = JSON.parse(JSON.stringify(FoodCopy))
      Food = deepCopy;
    }
  }

  ChooseFood2 = () => {
    if (this.state.i == 0) {
      this.state.SecondFood.push(this.state.initialFood[1]);
      this.state.notSelected.push(this.state.initialFood[0]);
      this.state.initialFood.splice(0, 2)
      console.log(this.state.SecondFood.length);
      this.setState({
        selectedchooseFood1: this.state.initialFood[0],
        selectedchooseFood2: this.state.initialFood[1]
      })
      if (this.state.SecondFood.length == 8) {
        alert('8강을 시작합니다.');
        this.state.i = 1;
        this.setState({
          selectedchooseFood1: this.state.SecondFood[0],
          selectedchooseFood2: this.state.SecondFood[1]
        })
        console.log(this.state.i, this.state.SecondFood)
      }
    }
    else if (this.state.i == 1) {
      this.state.SemiFinalFood.push(this.state.SecondFood[1]);
      this.state.notSelected.push(this.state.SecondFood[0]);
      this.state.notSelected.push(this.state.FinalFood[1]);
      this.state.SecondFood.splice(0, 2)
      console.log(this.state.SemiFinalFood.length);
      this.setState({
        selectedchooseFood1: this.state.SecondFood[0],
        selectedchooseFood2: this.state.SecondFood[1]
      })
      if (this.state.SemiFinalFood.length == 4) {
        alert('4강을 시작합니다.');
        this.state.i = 2;
        this.setState({
          selectedchooseFood1: this.state.SemiFinalFood[0],
          selectedchooseFood2: this.state.SemiFinalFood[1]
        })
        console.log(this.state.i, this.state.SemiFinalFood)
      }
    }
    else if (this.state.i == 2) {
      this.state.FinalFood.push(this.state.SemiFinalFood[1]);
      this.state.notSelected.push(this.state.SemiFinalFood[0]);
      this.state.SemiFinalFood.splice(0, 2)
      console.log(this.state.FinalFood.length);
      this.setState({
        selectedchooseFood1: this.state.SemiFinalFood[0],
        selectedchooseFood2: this.state.SemiFinalFood[1]
      })
      if (this.state.FinalFood.length == 2) {
        alert('결승입니다!!');
        this.state.i = 3;
        this.setState({
          selectedchooseFood1: this.state.FinalFood[0],
          selectedchooseFood2: this.state.FinalFood[1]
        })
        console.log(this.state.i, this.state.FinalFood)
      }
    }
    else if (this.state.i == 3) {
      this.state.RealFinalFood = this.state.FinalFood[1]
      this.state.notSelected.push(this.state.FinalFood[0]);
      this.state.notSelected.push(this.state.RealFinalFood);
      this.state.FinalFood.splice(0, 2)
      console.log(this.state.FinalFood.length);
      this.setState({
        selectedchooseFood1: this.state.FinalFood[0],
        selectedchooseFood2: this.state.FinalFood[1]
      })
      alert(`당신의 입맛이 정해졌습니다 당신의 입맛은 ${this.state.RealFinalFood}!!!`);
      const deepCopy = JSON.parse(JSON.stringify(FoodCopy))
      Food = deepCopy;
    }
  }
  overlap = async () => {
    var chk = false;
    if (this.state.ID == '') {
      Alert.alert("ID를 입력해주세요!");
      this.setState({ idCheck: false });
      return;
    }
    const snapshot = await database.ref('Users/UserInfo').once('value');
    snapshot.forEach(childSnapshot => {
      if (childSnapshot.val()["id"] == this.state.ID) {
        chk = true;
      }
    })
    if (chk == true) {
      Alert.alert("사용할 수 없는 ID입니다!")
      this.setState({ idCheck: false });
    } else {
      Alert.alert("사용가능한 ID 입니다!")
      this.setState({ idCheck: true });
    }
  }

  render() {
    // console.log(Food)
    const { search, idCheck, ID, Name, Phone, Password, notSelected } = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.TopBar}>
          <View style={{ flex: 2 }}>
          </View>
          <View style={{ flex: 3, alignItems: 'center' }}>
            <Text style={styles.TopBarText}>
              회원가입
            </Text>
          </View>
          <View style={{ flex: 2 }}>
            <TouchableOpacity style={styles.TopButton} onPress={this.test}>
              <AntDesign name="back" size={25} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.MainSpace}>
          <ScrollView>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  placeholder="아이디"
                  onChangeText={this.updateId}
                  value={this.state.ID}
                  style={styles.input_ID}
                />
                <TouchableOpacity
                  title={'중복확인'}
                  onPress={this.overlap}
                  style={{ flex: 1 }}
                >
                  <Text style={{ alignItems: 'center', marginLeft: '20%' }}>
                    중복확인
              </Text>

                </TouchableOpacity>
              </View>
              <TextInput
                secureTextEntry={true}
                placeholder="비밀번호"
                onChangeText={this.updatepas}
                value={this.state.Password}
                style={styles.input_signup}
              />
              <TextInput
                placeholder="이름을 입력하세요"
                onChangeText={this.updateName}
                value={this.state.Name}
                style={styles.input_signup}
              />
              <TextInput
                placeholder="전화번호를 입력하세요"
                keyboardType = 'numeric'
                onChangeText={this.updatePhone}
                value={this.state.Phone}
                style={styles.input_signup}
              />

            </View>
            <Text style={{ flex: 1, textAlign: 'center', marginTop: 35, fontSize: 25 }}>
              음식 이상형월드컵
          </Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{
                flex: 1, alignItems: 'center', marginTop:
                  '25%',
              }}>
                <TouchableOpacity onPress={this.ChooseFood1} >
                  <Image source={{ uri: Fooduri[this.state.selectedchooseFood1] }}
                    style={{ width: 100, height: 100 }} />
                  <Text style={{ fontSize: 25 }}>
                    {this.state.selectedchooseFood1}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{
                flex: 1, alignItems: 'center', marginTop:
                  '25%',
              }}>
                <TouchableOpacity onPress={this.ChooseFood2}>
                  <Image source={{ uri: Fooduri[this.state.selectedchooseFood2] }}
                    style={{ width: 100, height: 100 }} />
                  <Text style={{ alignContent: 'center', fontSize: 25 }} onChange={this.notequal2}>
                    {this.state.selectedchooseFood2}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Button style={{ width: '30%', alignContents: 'center', marginTop: '25%', marginLeft: '35%', marginBottom: '10%' }} titleStyle={{ color: "white", fontSize: 15, padding: '5%' }}
              buttonStyle={{ backgroundColor: "#7E64CC", height: '45%' }} title={`가입하기`} onPress={
                async () => {
                  const snapshot = await database.ref('Users/UserCount').once('value')
                  var userCount = snapshot.val()
                  console.log("SingUp")
                  if (idCheck == false) {
                    Alert.alert("ID 중복검사를 진행해주세요.")
                  }
                  if (Password == '') {
                    Alert.alert("비밀번호를 입력해주세요.")
                    return;
                  }
                  if (Phone == '') {
                    Alert.alert("핸드폰 번호를 입력해주세요.")
                    return;
                  }
                  if (Name == '') {
                    Alert.alert("이름을 입력해주세요.")
                    return;
                  }
                  notSelected.clean(undefined);
                  var taste = {
                    '한식': 0,
                    '치킨': 0,
                    '간식,분식': 0,
                    '족발,보쌈,닭발': 0,
                    '아시안,양식': 0,
                    '중식': 0,
                    '고기,곱창': 0,
                    '회,일식,해산물': 0
                  };
                  if (notSelected.length == 16) {
                    for (var tmp1 = 15; tmp1 >= 0; tmp1--) {
                      var foodName = notSelected[tmp1];
                      for (var key in FoodTagData) {
                        for (var tmp2 = 0; tmp2 < 2; tmp2++) {
                          if (foodName == FoodTagData[key][tmp2]) {
                            taste[key] += ScoreData[tmp1];
                          }
                        }
                      }
                    }
                  } else {
                    Alert.alert("음식 이상형월드컵을 진행해주세요.")
                    return;
                  }
                  console.log(taste)
                  await database.ref(`Users/UserInfo/${userCount}`).set({
                    name: Name,
                    password: Password,
                    id: ID,
                    phone: Phone,
                    taste: taste,
                    favorite: {
                      count: 0
                    }
                  });
                  await database.ref(`Users/UserCount`).set(++userCount);
                  Alert.alert("회원가입이 완료되었습니다.");
                  this.props.navigation.navigate('Login');
                }
              } />
          </ScrollView>
        </View>
        <View style={{ height: 20 }}></View>
      </View>
      </SafeAreaView>
    )
  }
}

export default SignUp;