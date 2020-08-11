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

var Food = ['피자','치킨','떡볶이','족발','회',
'국밥','와플','고기구운거',
'빵','떡','전','칼국수',
'튀김','햄버거','만두','돈까스'].sort(function(){return 0.5-Math.random()});

const FoodCopy = ['피자','치킨','떡볶이','족발','회',
'국밥','와플','고기구운거',
'빵','떡','전','칼국수',
'튀김','햄버거','만두','돈까스'].sort(function(){return 0.5-Math.random()});

class SignUp extends Component {
  state = {
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
  ChooseFood1 = () =>{
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
  
  ChooseFood2 = () =>{
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
  
  render() {
    // console.log(Food)
    const { search, ID ,Name,Phone,Password ,notSelected} = this.state;
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

          <SearchBar
            showCancel
            round
            lightTheme
            placeholder="아이디"
            containerStyle={{width:'85%',marginLeft:'7.5%',marginBottom :'5%'}}
            onChangeText={this.updateId}
            value={this.state.ID}
          />
          {/* <TouchableOpacity style={styles.TopButton} onPress={
            async () ={

            }
          }>
              <AntDesign name="Hello" size={10} color="white" />
            </TouchableOpacity> */}
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
              if(ID == ''){
                Alert.alert("No ID")
                return ;
              }
              if(Password == ''){
                Alert.alert("No Password")
                return ;
              }
              if(Phone == ''){
                Alert.alert("No Phone")
                return ;
              }
              if(Name == ''){
                Alert.alert("No Name")
                return ;
              }
              notSelected.clean(undefined);
              console.log(notSelected)
              if(notSelected.length != 16){
                Alert.alert("No Food battle")
                return ;
              }
              await database.ref(`Users/UserInfo/${userCount}`).set({
                name:Name,
                password :Password,
                id:ID,
                phone:Phone,
                taste:notSelected
              });
              await database.ref(`Users/UserCount`).set(++userCount);
              Alert.alert("회원가입이 완료되었습니다.")
              this.props.navigation.navigate('Login')
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