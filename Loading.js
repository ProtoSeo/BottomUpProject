import React from "react";
import { Text, View,StatusBar,StyleSheet } from "react-native";


export default function Loading(){
    return <View style = {styles.container}>
        <StatusBar barStyle="dark-content"/>
        <Text style={styles.text}>우리시소</Text>
    </View>
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent:"center",
        backgroundColor:"#6466E3",
    },
    
    text:{
        color:"white",
        fontWeight:'bold',
        fontSize:40,
        marginBottom: '120%'
    }
})