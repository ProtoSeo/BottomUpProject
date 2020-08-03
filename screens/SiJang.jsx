import React, { Component }  from 'react';
import { SearchBar } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Image,
  Button,
} from 'react-native';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogButton,
  ScaleAnimation,
} from 'react-native-popup-dialog';

const DATA = [
  {
    name: '닭갈비',
    subname: '춘천365닭갈비, 오늘은 닭, 마인하우스',
    icon: './icon/chicken.png'
  },
  {
    name: '칼국수',
    subname: '오씨네 칼국수, 국수',
    icon: '.icon/soup'
  },
  {
    name: '고등어 백반',
    subname: '학생회관',
    icon: './icon/rice.png'
  },
  {
    name: '통닭',
    subname: '충남통닭, 깻잎치킨',
    icon: './icon/chicken.png'
  },
  {
    name: '회덮밥',
    subname: '마루, 배재원',
    icon: './icon/rice.png'
  }
]

const Item = ({ name, subname, icon }) => (
  <TouchableOpacity style={styles.item_view}>
    <View style={{flex: 7, flexDirection: 'row'}}>
      <Image style={styles.item_icon} source={require('./icon/rice.png')}/>
      <Text style={styles.item_title}>{name}</Text>
    </View>
    <View style={{flex: 3}}>
      <Text style={styles.item_subtitle}>{subname}</Text>
    </View>
  </TouchableOpacity>
)

class Sijang extends Component {

  state = {
    search: '',
    menuDialog: false
  };

  updateSearch = (search) => {
    this.setState({ search });
  };
  
  test = (e) => {
    this.props.navigation.goBack();
  }

  render() {

    const { search } = this.state;

    const renderItem = ({ item }) => (
      <Item name={item.name} subname={item.subname} icon={item.icon} />
    )
    
    return (
      <View style={styles.container}>

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
              {this.props.navigation.getParam('name')}
            </Text>
          </View>
            
          <View style={{flex: 2}}>
            <TouchableOpacity style={styles.TopButton} onPress={this.test}>
              <AntDesign name="back" size={15} color="white" />
            </TouchableOpacity>
          </View>
          
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
        
        <View style={styles.MainSpace}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.name}
          />
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

  TopBar: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#81888F',
    flexDirection: 'row'
  },

  TopBarText: {
    fontSize: 25, 
    marginTop: 50,
    color: 'white'
  },

  MainSpace: {
    height: 545,
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
    marginLeft: 40,
    marginRight: 40,
    marginTop: 70,
    marginBottom: 20
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

export default Sijang;