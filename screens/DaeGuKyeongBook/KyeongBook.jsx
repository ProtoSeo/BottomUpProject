import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { 
  StyleSheet, 
  Text, 
  ScrollView,
  TouchableOpacity,
  View, 
  KeyboardAvoidingView, } from 'react-native';
import { SearchBar } from 'react-native-elements'
import GradientButton from 'react-native-gradient-buttons';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogButton,
  ScaleAnimation,
} from 'react-native-popup-dialog';

const Gu = 
['경산시','경주시','구미시','김천시','문경시','상주시','안동시','영주시','영천시','포항시',
'고령군','군위군','봉화군','성주군','영덕군','영양군','예천군','울릉군','울진군','의성군','청도군','청송군','칠곡군'
]


class KyeongBook extends React.Component {
  state = {
    search: '',
    menuDialog: false
  }
  
  updateSearch = (search) => {
    this.setState({ search });
  };

  test = (e) => {
    this.props.navigation.goBack();
  }

  render () {

    const { search } = this.state;

    return(

        <View style={styles.one}>
        <View style={styles.TopBar}>

          <View style={{flex: 2}}>
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
                title="Menu"
                hasTitleBar={true}
                style={{color: '#6A6F75', fontSize:24}}
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
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style={styles.dialog_Button} onPress={this.onPress}>
                    <AntDesign name="home" size={20} color="white" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.dialog_Button} onPress={this.onPress}>
                    <AntDesign name="user" size={20} color="white" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.dialog_Button} onPress={this.onPress}>
                    <AntDesign name="setting" size={20} color="white" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  onPress={() => {
                    this.setState({ menuDialog: false });
                  }}>
                  <Text style={{fontSize:20, color:"#81888F"}}>CLOSE</Text>    
                </TouchableOpacity>
              </View>
            </DialogContent>
          </Dialog>
        </View>
          
        <View style={{flex: 3, alignItems: 'center'}}>
          <Text style={styles.TopBarText}>
            우리의 시소
          </Text>
        </View>
          
        <View style={{flex: 2}}>
          <TouchableOpacity style={styles.TopButton} onPress={this.test}>
            <AntDesign name="back" size={15} color="white" />
          </TouchableOpacity>
        </View>

        </View>
        <KeyboardAvoidingView behavior={'height'}> 
       
        <View style={styles.view}>
        
        <ScrollView >
        <GradientButton key="대구광역시" style={{ marginVertical: 8 ,marginLeft : 30}} text = "대구광역시"
        onPressAction={() => this.props.navigation.navigate('대구광역시')}width='80%' deepBlue impact />
          {Gu.map((i) => {
              return (
                <GradientButton key={i} style={{ marginVertical: 8 ,marginLeft : 30}} text = {i} prev = {i}
                 onPressAction={() => this.props.navigation.navigate('Sijang',{name : '경북' + i})}width='80%' deepBlue impact />
              )
          })}
          
        </ScrollView> 
        </View>
        
        <View style={styles.SearchSpace}>
          <SearchBar
            showCancel
            round
            lightTheme
            placeholder="검색하세요"
            onChangeText={this.updateSearch}
            value={search}
          />
        </View>

        </KeyboardAvoidingView>
      </View>
    
    )
  }
}

const styles = StyleSheet.create({
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

  TopButton: {
    alignItems: 'center',
    backgroundColor: '#6A6F75',
    padding: '8%',
    marginHorizontal: '32%',
    marginTop: '38%',
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

  title : {
    marginTop : 22,
    textAlign : 'center',
    fontSize :24,
  },

  text : {
    marginTop : '15%',
    width : 35,
    marginLeft : 65,
  },

  image : {
    flex : 1,
  },

  view : {
    height: '77%',
    textAlign : 'center',
    marginTop : '5%',
    marginHorizontal : '5%',
  
  },

  SearchSpace: {
    height: 100,
    justifyContent: 'center',
  },

  one : {
    flex : 1,
   
  }
});

export default KyeongBook;