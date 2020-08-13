import React, { Component }  from 'react';
import { SearchBar } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Alert,
} from 'react-native';              
import { Button } from 'react-native-elements'
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

Array.prototype.clean = function(deleteValue){
  for(var i =0; i<this.length;i++){
    if(this[i] == deleteValue){
      this.splice(i,1);
      i--;
    }
  }
  return this;
};
const FoodTagData = 
{ '한식':['국수','국밥'],
  '치킨':['후라이드치킨','닭강정'],
  '간식,분식':['떡볶이','돈까스'],
  '족발,보쌈,닭발':['족발','보쌈'],
  '아시안,양식':['스테이크','쌀국수'],
  '중식':['짜장면','짬뽕'],
  '고기,곱창':['삼겹살','곱창'],
  '회,일식,해산물':['회','초밥']
}
const ScoreData = [1,1,1,1,1,1,1,1,4,4,4,4,8,8,11,15]
var Food = ['국수','국밥','후라이드치킨','닭강정','떡볶이',
'돈까스','족발','보쌈',
'스테이크','쌀국수','짜장면','짬뽕',
'삼겹살','곱창','회','초밥'].sort(function(){return 0.5-Math.random()});

const FoodCopy = ['국수','국밥','후라이드치킨','닭강정','떡볶이',
'돈까스','족발','보쌈',
'스테이크','쌀국수','짜장면','짬뽕',
'삼겹살','곱창','회','초밥'].sort(function(){return 0.5-Math.random()});

class SignUp extends Component {
  state = {
    idCheck:false,
    search: '',
    menuDialog: false,
    ID : '',
    Password : '',
    Phone : '',
    Name : '',
    initialFood : Food,
    SecondFood : [],
    SemiFinalFood : [],
    FinalFood : [],
    RealFinalFood : '',
    selectedchooseFood1 : Food[0],
    selectedchooseFood2 : Food[1],
    notSelected : [],
    i : 0,
 }
  updateId = (id) => {
    this.setState({ID : id})
  }
  updatepas = (pas) => {
    this.setState({Password : pas})
  }
  updatePhone = (phone) => {
    this.setState({Phone : phone})
  }
  updateName = (name) => {
    this.setState({Name: name})
  }
  test = () => {
    this.props.navigation.goBack();
  }

  componentWillUnmount(){
    Food = JSON.parse(JSON.stringify(FoodCopy));
    this.setState({
      search: '',
    menuDialog: false,
    ID : '',
    Password : '',
    Phone : '',
    name : '',
    initialFood : Food,
    SecondFood : [],
    SemiFinalFood : [],
    FinalFood : [],
    RealFinalFood : '',
    selectedchooseFood1 : Food[0],
    selectedchooseFood2 : Food[1],
    notSelected : [],
    i : 0,
    })
  }
  ChooseFood1 = () => {
    if (this.state.i == 0){
      this.state.SecondFood.push(this.state.initialFood[0]);
      this.state.notSelected.push(this.state.initialFood[1]);
      this.state.initialFood.splice(0,2)
      console.log(this.state.SecondFood.length);
      this.setState({
        selectedchooseFood1 : this.state.initialFood[0],
        selectedchooseFood2 : this.state.initialFood[1]
      })
        if(this.state.SecondFood.length == 8){
          alert('8강을 시작합니다.');
          this.state.i = 1;
          this.setState({
            selectedchooseFood1 : this.state.SecondFood[0],
            selectedchooseFood2 : this.state.SecondFood[1]
          })
          console.log(this.state.i,this.state.SecondFood)
        }
      }
      else if(this.state.i == 1){
        this.state.SemiFinalFood.push(this.state.SecondFood[0]);
        this.state.notSelected.push(this.state.SecondFood[1]);
        this.state.SecondFood.splice(0,2)
        console.log(this.state.SemiFinalFood.length);
        this.setState({
          selectedchooseFood1 : this.state.SecondFood[0],
          selectedchooseFood2 : this.state.SecondFood[1]
        })
          if(this.state.SemiFinalFood.length == 4){
            alert('4강을 시작합니다.');
            this.state.i = 2;
            this.setState({
              selectedchooseFood1 : this.state.SemiFinalFood[0],
              selectedchooseFood2 : this.state.SemiFinalFood[1]
            })
            console.log(this.state.i,this.state.SemiFinalFood)
          }
      }
      else if(this.state.i == 2){
        this.state.FinalFood.push(this.state.SemiFinalFood[0]);
        this.state.notSelected.push(this.state.SemiFinalFood[1]);
        this.state.SemiFinalFood.splice(0,2)
        console.log(this.state.FinalFood.length);
        this.setState({
          selectedchooseFood1 : this.state.SemiFinalFood[0],
          selectedchooseFood2 : this.state.SemiFinalFood[1]
        })
          if(this.state.FinalFood.length == 2){
            alert('결승입니다!!');
            this.state.i = 3;
            this.setState({
              selectedchooseFood1 : this.state.FinalFood[0],
              selectedchooseFood2 : this.state.FinalFood[1]
            })
            console.log(this.state.i,this.state.FinalFood)
          }
      }
      else if(this.state.i == 3){
        this.state.RealFinalFood = this.state.FinalFood[0]
        this.state.notSelected.push(this.state.FinalFood[1]);
        this.state.notSelected.push(this.state.RealFinalFood);
        this.state.FinalFood.splice(0,2)
        console.log(this.state.FinalFood.length);
        this.setState({
          selectedchooseFood1 : this.state.FinalFood[0],
          selectedchooseFood2 : this.state.FinalFood[1]
        })
        alert(`당신의 입맛이 정해졌습니다 당신의 입맛은 ${this.state.RealFinalFood}!!!`);
        const deepCopy = JSON.parse(JSON.stringify(FoodCopy))
        Food = deepCopy;
      }
  }
  
  ChooseFood2 = () => {
    if (this.state.i == 0){
      this.state.SecondFood.push(this.state.initialFood[1]);
      this.state.notSelected.push(this.state.initialFood[0]);
    this.state.initialFood.splice(0,2)
    console.log(this.state.SecondFood.length);
    this.setState({
      selectedchooseFood1 : this.state.initialFood[0],
      selectedchooseFood2 : this.state.initialFood[1]
    })
      if(this.state.SecondFood.length == 8){
        alert('8강을 시작합니다.');
        this.state.i = 1;
        this.setState({
          selectedchooseFood1 : this.state.SecondFood[0],
          selectedchooseFood2 : this.state.SecondFood[1]
        })
        console.log(this.state.i,this.state.SecondFood)
      }
    }
    else if(this.state.i == 1){
      this.state.SemiFinalFood.push(this.state.SecondFood[1]);
      this.state.notSelected.push(this.state.SecondFood[0]);
      this.state.notSelected.push(this.state.FinalFood[1]);
      this.state.SecondFood.splice(0,2)
      console.log(this.state.SemiFinalFood.length);
      this.setState({
        selectedchooseFood1 : this.state.SecondFood[0],
        selectedchooseFood2 : this.state.SecondFood[1]
      })
        if(this.state.SemiFinalFood.length == 4){
          alert('4강을 시작합니다.');
          this.state.i = 2;
          this.setState({
            selectedchooseFood1 : this.state.SemiFinalFood[0],
            selectedchooseFood2 : this.state.SemiFinalFood[1]
          })
          console.log(this.state.i,this.state.SemiFinalFood)
        }
    }
    else if(this.state.i == 2){
      this.state.FinalFood.push(this.state.SemiFinalFood[1]);
      this.state.notSelected.push(this.state.SemiFinalFood[0]);
      this.state.SemiFinalFood.splice(0,2)
      console.log(this.state.FinalFood.length);
      this.setState({
        selectedchooseFood1 : this.state.SemiFinalFood[0],
        selectedchooseFood2 : this.state.SemiFinalFood[1]
      })
        if(this.state.FinalFood.length == 2){
          alert('결승입니다!!');
          this.state.i = 3;
          this.setState({
            selectedchooseFood1 : this.state.FinalFood[0],
            selectedchooseFood2 : this.state.FinalFood[1]
          })
          console.log(this.state.i,this.state.FinalFood)
        }
    }
    else if(this.state.i == 3){
      this.state.RealFinalFood = this.state.FinalFood[1]
      this.state.notSelected.push(this.state.FinalFood[0]);
      this.state.notSelected.push(this.state.RealFinalFood);
      this.state.FinalFood.splice(0,2)
      console.log(this.state.FinalFood.length);
      this.setState({
        selectedchooseFood1 : this.state.FinalFood[0],
        selectedchooseFood2 : this.state.FinalFood[1]
      })
      alert(`당신의 입맛이 정해졌습니다 당신의 입맛은 ${this.state.RealFinalFood}!!!`);
      const deepCopy = JSON.parse(JSON.stringify(FoodCopy))
      Food = deepCopy;
    }
  }
  overlap = async () =>{
    var chk = false;
    if(this.state.ID==''){
      Alert.alert("ID를 입력해주세요!");
      this.setState({idCheck:false});
      return;
    }
    const snapshot = await database.ref('Users/UserInfo').once('value');
    snapshot.forEach(childSnapshot=>{
      if(childSnapshot.val()["id"]==this.state.ID){
        chk = true;
      }
    })
    if(chk==true){
      Alert.alert("사용할 수 없는 ID입니다!")
      this.setState({idCheck:false});
    }else{
      Alert.alert("사용가능한 ID 입니다!")
      this.setState({idCheck:true});
    }
  } 

  render() {
    // console.log(Food)
    const { search, idCheck,ID ,Name,Phone,Password ,notSelected} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.TopBar}>
          <View style={{flex: 2}}>
          </View>
          <View style={{flex: 3, alignItems: 'center'}}>
            <Text style={styles.TopBarText}>
              회원가입
            </Text>
          </View>
          <View style={{flex: 2}}>
            <TouchableOpacity style={styles.TopButton} onPress={this.test}>
              <AntDesign name="back" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.MainSpace}>
        <ScrollView>
          <View style={{flex:1}}>
          <View style={{flexDirection:'row'}}>
            <SearchBar
             showCancel
             round
             lightTheme
             placeholder="아이디"
             containerStyle={{width:'85%',marginLeft:'7.5%',marginBottom :'5%'}}
             onChangeText={this.updateId}
             value={this.state.ID}
            />
            <Button title={'중복확인'} onPress={
              this.overlap
            }></Button>
          </View>
          <SearchBar
            showCancel
            round
            lightTheme
            placeholder="비밀번호"
            containerStyle={{width:'85%',marginLeft:'7.5%',marginBottom :'5%'}}
            onChangeText={this.updatepas}
            value={this.state.Password}
          />
           <SearchBar
            showCancel
            round
            lightTheme
            placeholder="이름을 입력하세요"
            containerStyle={{width:'85%',marginLeft:'7.5%',marginBottom :'5%'}}
            onChangeText={this.updateName}
            value={this.state.Name}
          />
          <SearchBar
            showCancel
            round
            lightTheme
            placeholder="전화번호를 입력하세요"
            containerStyle={{width:'85%',marginLeft:'7.5%',marginBottom :'5%'}}
            onChangeText={this.updatePhone}
            value={this.state.Phone}
          />

          </View>
          <Text style={{flex:1,textAlign : 'center',marginTop : 35,fontSize:25}}>
            음식 이상형월드컵
          </Text>
          <View style={{flex:1,flexDirection:'row'}}>
            <View style={{flex:1,alignItems : 'center',marginTop : 
            '25%',}}>
              <TouchableOpacity onPress={this.ChooseFood1} >
              <Text style={{fontSize:25}}>
              {this.state.selectedchooseFood1}
              </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex:1,alignItems : 'center',marginTop : 
            '25%',}}>
            <TouchableOpacity onPress={this.ChooseFood2}>
              <Text style={{alignContent : 'center',fontSize:25}} onChange={this.notequal2}>
              {this.state.selectedchooseFood2 }
              </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button style={{width:'30%',alignContents:'center',marginTop : '25%',marginLeft:'35%',marginBottom:'10%'}} titleStyle={{color: "white",fontSize: 15, padding :'5%'}} 
          buttonStyle={{backgroundColor: "gray",height: '45%'}} title={`가입하기`} onPress={
            async () =>{ 
              const snapshot = await database.ref('Users/UserCount').once('value')
              var userCount = snapshot.val()
              console.log("SingUp")
              if(idCheck==false){
                Alert.alert("ID 중복검사를 진행해주세요.")
              }
              if(Password == ''){
                Alert.alert("비밀번호를 입력해주세요.")
                return ;
              }
              if(Phone == ''){
                Alert.alert("핸드폰 번호를 입력해주세요.")
                return ;
              }
              if(Name == ''){
                Alert.alert("이름을 입력해주세요.")
                return ;
              }
              notSelected.clean(undefined);
              var taste = { '한식': 0,
              '치킨':0,
              '간식,분식':0,
              '족발,보쌈,닭발':0,
              '아시안,양식':0,
              '중식':0,
              '고기,곱창':0,
              '회,일식,해산물':0};
              if(notSelected.length == 16){
                for(var tmp1 = 15; tmp1>=0; tmp1--){
                  var foodName = notSelected[tmp1];
                  for(var key in FoodTagData){                   
                    for(var tmp2 = 0; tmp2 < 2; tmp2++){  
                      if(foodName == FoodTagData[key][tmp2]){
                        taste[key] += ScoreData[tmp1];
                      }
                    }
                  }
                }
              }else {
                Alert.alert("음식 이상형월드컵을 진행해주세요.")
                return ;
              }
              console.log(taste)
              await database.ref(`Users/UserInfo/${userCount}`).set({
                name:Name,
                password :Password,
                id:ID,
                phone:Phone,
                taste:taste,
                favorite:{
                  count:0
                }
              });
              await database.ref(`Users/UserCount`).set(++userCount);
              Alert.alert("회원가입이 완료되었습니다.");
              this.props.navigation.navigate('Login');
            }
          } /> 
          </ScrollView>
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
  submit:{
    width:"80%",
    backgroundColor:"#fc5185",
    borderRadius:20,
    padding:10,
    alignItems:"center",
    marginTop:20,
    marginLeft : 25
  },
  header:{
    fontSize:25,
    fontWeight:"bold",
    color:"#364f6b",
    marginTop : 10,
    marginBottom:20,
    marginLeft : 40,
  },
  TopBar: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#81888F',
    flexDirection: 'row'
  },

  TopBarText: {
    fontSize: 33, 
    marginTop: 25,
    color: 'white'
  },

  input :{
    alignItems: 'center',
    width : 60,
  },
  item:{
    width:"80%",
    backgroundColor:"#fff",
    borderRadius:20,
    padding:10,
    marginBottom:10,
    flexDirection:"row",
    marginLeft : 25,
  },
  checkBoxTxt:{
    marginLeft:20
  },
  MainSpace: {
    height: 545,
    backgroundColor: '#E8EAEB',
    paddingTop : 30
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
    width : 50,
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


export default SignUp;