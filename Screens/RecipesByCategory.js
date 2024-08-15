import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, Image, StyleSheet, TextInput, FlatList,ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios';
import { Keys } from '../constants/keys.js';


export default function RecipesByCategory() {

  const navigation=useNavigation();
 
  let [recipes,setRecipes]=useState([]);
  let [isLoading,setIsLoading]=useState(false);
  let route=useRoute();


  useEffect(()=>{

    getRecipes();

  },[])
  async function  getRecipes()
  {
    try 
    {
      setIsLoading(true);
      setRecipes([]);
      let res=await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=food&app_id=${Keys.APP_ID}&app_key=${Keys.APP_KEY}&mealType=${route.params.data}`);
      setRecipes(res.data.hits);
      setIsLoading(false);

    } 
    catch (error) 
    {
      
      console.log("You got an error :-"+error);
    }
  }
  
 

  return (
   <SafeAreaView style={{flex:1, backgroundColor:"#2D3250"}}>
      <StatusBar barStyle={'light-content'}/>
      <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.goBack()} style={styles.backBtn}>
        <Image style={styles.backBtnIcon} source={require("../assets/back.png")} />
      </TouchableOpacity>
     
      

      {isLoading ? <ActivityIndicator style={{marginTop:"18%"}} size={"large"} color={"orange"} /> :
         <View>
         <FlatList
         scrollToOverflowEnabled={true}
         contentContainerStyle={{marginTop:15}}
         showsVerticalScrollIndicator={false}
         data={recipes}
         renderItem={({item,index})=>{
           return(
             <TouchableOpacity onPress={()=>navigation.navigate("Details",{data:item})} style={styles.recipe}>
               <Image style={styles.recipeImg} source={{uri:item.recipe.image}}  />

               <View style={{gap:9}}>
                <Text numberOfLines={2} style={styles.recipeLabel}>{item.recipe.label}</Text>
                <Text style={{color:"#f9b17a",marginLeft:9}}>Source : {item.recipe.source}</Text>
               </View>
              
             </TouchableOpacity>
           )
         }}
         
         />
       </View>
      }
     
     
   </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  backBtn:{
    height:36,
    width:36,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#676f9d",
    marginTop:30,
    marginLeft:15,
    borderRadius:50,
   
  },
  backBtnIcon:{
    height:20,
    width:20,
    tintColor:"white"
  },
  recipe:{
    paddingVertical:3,
    paddingHorizontal:6,
    borderRadius:9,
    width:"90%",
    backgroundColor:"#424769",
    alignItems:"center",
    
    marginTop:12,
    alignSelf:'center',
    flexDirection:"row"
  },
  recipeImg:{
    height:90,
    width:90,
    borderRadius:6
  },
  recipeLabel:{
    fontStyle:"italic",
    marginLeft:9,
    width:"50%",
    fontSize:15,
    color:"white"
    
  },
  
})