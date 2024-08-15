import { View, Text, StyleSheet, Image, SafeAreaView,StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from "react-native-animatable"
import { useNavigation } from '@react-navigation/native'

export default function Splash() {
  
  const navigation=useNavigation();

  useEffect(()=>{
    setTimeout(() => {
      navigation.navigate("Home")
    }, 2000);
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'}/>
      <Animatable.Image  animation={'slideInUp'} style={styles.img} source={require('../assets/logo.png')} />
      <Animatable.Text animation={'slideInUp'} style={styles.title}>QuickBite</Animatable.Text>
      <Animatable.Text animation={'slideInUp'} style={styles.tagLine}>Culinary Curiosity, Satisfied by QuickBite.</Animatable.Text>
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  container:{
    backgroundColor:"#2D3250",
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  img:{
    height:180,
    width:180,
    borderRadius:9
  },
  title:{
    fontSize:27,
    fontStyle:"italic",
    fontWeight:"bold",
    color:"#F9B17A"
  },
  tagLine:{
    position:"absolute",
    bottom:32,
    fontSize:18,
    fontStyle:"italic",
    color:"#F9B17A"
    
  }
})