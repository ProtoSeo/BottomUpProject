import React from 'react';
import { StyleSheet,View,StatusBar,TouchableOpacity,Text } from 'react-native';
import Constants from 'expo-constants';
class SiJang extends React.Component{
    test = (e) => {
        this.props.navigation.goBack();
      }
        
    render() {
        return (
          <View style={styles.container}>
            <StatusBar Constants = {Constants} />
            <View style={styles.one}>
            <Text style={styles.title}>우리 시소</Text>
            </View>
            <TouchableOpacity onPress={this.test} >
              <Text>뒤로가기</Text>
            </TouchableOpacity>
            <Text>
                {this.props.navigation.getParam('name')}
            </Text>
          </View>
        );
      }
}
const styles = StyleSheet.create({
    statusBar: {
      backgroundColor: '#C2185B',
      height: Constants.statusBarHeight
    },
    container: {
      flex: 1
    },
    title : {
        marginTop : 22,
        textAlign : 'center',
        fontSize :24,
      },
      one : {
        flex : 0.5,
       
      }
  });
export default SiJang;