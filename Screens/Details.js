import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, FlatList, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as Animatable from "react-native-animatable"

export default function Details() {

  const route=useRoute();
  const navigation=useNavigation();
  const [selectedTab,setSelectedTab]=useState(0);
  const AnimatedBtn=Animatable.createAnimatableComponent(TouchableOpacity);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'}/>
      <Animatable.Image animation={"slideInUp"} style={styles.banner} source={{uri:route.params.data.recipe.images.SMALL.url}} />
      <Animatable.Text animation={"slideInUp"} style={styles.recipeTitle}>{route.params.data.recipe.label}</Animatable.Text>
      <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backBtn}>
          <Image style={styles.backBtnIcon} source={require("../assets/back.png")}/>
      </TouchableOpacity >
      <View>
      <FlatList
     horizontal
     showsHorizontalScrollIndicator={false}
     contentContainerStyle={{marginBottom:9}}
     data={['Health', 'Caution','Ingredients','Diet','Meal Type','Cuisines','Dish Type' ]}
     renderItem={({item,index})=>{
      return(
        <TouchableOpacity 
        key={index}
        onPress={()=>setSelectedTab(index)}
        style={[styles.typeItem,{
          backgroundColor:selectedTab==index ? "#f9b17a":"#424769"
        }]}>
          <Text style={{color:"white"}}>{item}</Text>
        </TouchableOpacity>
      )
     }}
     />
      </View>
     

    <View>
    <FlatList
     ListEmptyComponent={()=><Text style={{textAlign:"center",color:"orange",marginVertical:3}}>No data...</Text>}
     showsVerticalScrollIndicator={false}
     contentContainerStyle={{marginBottom:10}}
     data={selectedTab==0 ? route.params.data.recipe.healthLabels : 
           selectedTab==1 ? route.params.data.recipe.cautions:
           selectedTab==2 ? route.params.data.recipe.ingredientLines :
           selectedTab==3 ? route.params.data.recipe.dietLabels :
           selectedTab==4 ? route.params.data.recipe.mealType :
           selectedTab==5 ? route.params.data.recipe.cuisineType :
           route.params.data.recipe.mealType
        }
        renderItem={({item,index})=>{
          return(
            <Animatable.View animation={"slideInUp"} key={index} style={styles.label}>
              <Text style={{textAlign:"center",color:"white"}}>{item}</Text>
            </Animatable.View>
          )
        }}
     />
    </View>

    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#2D3250",
  },
  banner:{
    width:"100%",
    height:300,
   
  },
  backBtn:{
    height:36,
    width:36,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#676f9d",
    position:"absolute",
    top:40,
    left:10,
    borderRadius:50,
   
  },
  backBtnIcon:{
    height:20,
    width:20,
    tintColor:"white"
  },
  recipeTitle:{
    fontSize:21,
    fontWeight:"semibold",
    fontStyle:"italic",
    margin:6,
    color:"#f9b17a"
  },
  typeItem:{
    
    paddingHorizontal:20,
    paddingVertical:10,
    borderRadius:9,
    marginLeft:9,
    
  },
  label:{
    width:"80%",
    paddingVertical:9,
   
    borderRadius:9,
    marginVertical:6,
    alignSelf:"center",
    backgroundColor:"#676f9d"
  }

})