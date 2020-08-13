import React from "react";
import { Text, View,StatusBar,StyleSheet } from "react-native";


export default function Loading(){
    return <View style = {styles.container}>
        <StatusBar barStyle="dark-content"/>
        <Text style={styles.text}>우리의 시소</Text>
    </View>
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent:"center",
        backgroundColor:"#FDF6AA",
    },
    text:{
        color:"#2c2c2c",
        fontSize:40,
        marginBottom: '120%'
    }
})