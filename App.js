import React from 'react';
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import Constants from 'expo-constants';
import JeonGuk from './screens/CoinView';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Seoul from './screens/Seoul/Seoul.jsx';
import InCheonKyungKi from './screens/InCheonKyungKi/InCheonKyungKi';
import InCheon from './screens/InCheonKyungKi/InCheon';
class First extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar Constants = {Constants} />
        <JeonGuk navigation = {this.props.navigation}/>
      </View>
    );
  }
}


const App = createStackNavigator(
  {
    Seoul: {
      screen: Seoul,
      navigationOptions: {
        headerShown: false
      }
    },
    InCheonKyungKi: {
      screen: InCheonKyungKi,
      navigationOptions: {
        headerShown: false
      }
    },
    인천광역시: {
      screen: InCheon,
      navigationOptions: {
        headerShown: false
      }
    },
    Home: {
      screen: First,
      navigationOptions: {
        headerShown: false
      }
    },
  },
  {
    initialRouteName: 'Home' // 처음 보여 줄 화면을 설정합니다.
  },
);

const AppContainer = createAppContainer(App);

export default () => (
  <AppContainer />
);



const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#C2185B',
    height: Constants.statusBarHeight
  },
  container: {
    flex: 1
  }
});