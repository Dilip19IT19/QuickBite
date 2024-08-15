import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, FlatList, RefreshControl, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MEAL_FILTERS } from '../constants/Data.js'
import axios from 'axios';
import { Keys } from '../constants/keys.js';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from "react-native-animatable";


export default function Home() {

  let[trendyRecipes,setTrendyRecipes]=useState([]);
  let[isLoading,setIsLoading]=useState(true);
  let navigation=useNavigation();
  let[isRefreshing,setIsRefreshing]=useState(false);

  useEffect(()=>{

    setIsLoading(true);
    setTimeout(() => {
      getTrendyRecipes();
     
    }, 2000);
      
    setIsLoading(false);

  },[])

  function handleRefresh()
  {
    setIsRefreshing(true);
    setTimeout(() => {
      getTrendyRecipes();
      setIsRefreshing(false);
    }, 1000);
   
    
  }
  

  async function getTrendyRecipes()
  {
    try 
    {
      const response=await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=food&app_id=${Keys.APP_ID}&app_key=${Keys.APP_KEY}&random=true&helth=vegetarian`);  
      setTrendyRecipes(response.data.hits);
    } 
    catch (error) 
    {
      console.log("You got an error :- "+error);  
    }
  }

  return (
    <SafeAreaView style={styles.container}
        
    
    >
     <StatusBar barStyle={'light-content'}/>
      <View style={styles.topView}>
        <Image style={styles.banner} source={require("../assets/coocking.jpg")} />
        <View style={styles.transparentView}>
          <Animatable.Text animation={"slideInDown"} style={styles.title}>QuickBite</Animatable.Text>
          <TouchableOpacity activeOpacity={0.8}
            onPress={()=>navigation.navigate("Search")}
            style={styles.searchBox}>
            <Image source={require("../assets/search.png")} style={{height:20,width:20,tintColor:"white"}} />
            <Animatable.Text animation={"slideInDown"}  style={{fontStyle:"italic",color:"white"}}>Search any recipe...</Animatable.Text>
          </TouchableOpacity>
          <Text style={styles.note}>Discover 1000+ recipes with just one click</Text>
        </View>
       <Text style={styles.categories}>Categories</Text>
       <View>
        <FlatList
          data={MEAL_FILTERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item,index})=>{
            return(
              <TouchableOpacity onPress={()=>navigation.navigate("RecipesByCategory",{data:item.title.toLowerCase()})}  activeOpacity={0.7} style={styles.categoryItem}>
                <View key={index} style={styles.card}>
                  <Animatable.Image animation={"slideInUp"} style={styles.cardImage} source={item.icon} />
                </View>
                <Text style={{fontSize:15,fontStyle:"italic",fontWieght:"bold",color:"white"}}>
                  {item.title.substring(0,1).toUpperCase().concat(item.title.substring(1).toLowerCase())}
                </Text>
              </TouchableOpacity>
            )
          }}
         
        />
       </View>
       <Text style={styles.trendyRecipeTitle}>Trending Recipes</Text>
       <View>
        {isLoading ? <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
          data={[1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
          renderItem={({item,index})=>{
            return(
            <View>
              <View style={{
                height:206,
                width:152,
                marginHorizontal:6,
                padding:3,
                marginBottom:9,
                borderRadius:9,
                backgroundColor:"#9e9e9e",
                opacity:0.2
                }}
                >
              </View>
              <View style={{
                marginHorizontal:6,
                padding:6,
                borderRadius:6,
                backgroundColor:"#9e9e9e",
                opacity:0.2
              }}>                
              </View>
            </View>
            )
          }}
         /> : 
        <View>
        <FlatList
        data={trendyRecipes}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>{
          return(
            <TouchableOpacity key={index} activeOpacity={0.6}
            onPress={()=>navigation.navigate("Details",{
              data:item
            })}
            >
              <View style={styles.recipeItem}>
                <Animatable.Image animation={"slideInUp"} style={styles.recipeImage} source={{uri:item.recipe.image}}  />
                {
                  item.recipe.label.length >=20 ? <Text style={{color:"white"}}>{item.recipe.label.substring(0,20).concat("...")}</Text>:
                  <Text style={{color:"white"}}>{item.recipe.label}</Text>
                }
              </View>
            </TouchableOpacity>
          )
        }}
        refreshControl={
          <RefreshControl  tintColor={"orange"} refreshing={isRefreshing} onRefresh={handleRefresh} />
        } 
       
        />
        </View>
       
        }
        
       </View>

       
        

      </View>     
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#2D3250",
  },
  topView:{
    width:"100%",
    height:"36%"
  },
  banner:{
    opacity:1,
    height:"100%",
    width:"100%",
    
  },
  transparentView:{
    position:'absolute',
    backgroundColor:'rgba(0,0,0,0.2)',
    height:"90%",
    width:"100%",
    justifyContent:"center",
    alignItems:"flex-start",
    
    paddingLeft:20
  },
  searchBox:{
    width:"85%",
    height:"20%",
    borderRadius:9,
    padding:9,
    backgroundColor:"#424769",
    flexDirection:"row",
    alignItems:"center",
    gap:6
  },
  title:{
    fontSize:32,
    color:"#F9B17A",
    fontWeight:"bold",
    fontStyle:"italic",
    marginBottom:28,
    marginTop:9,
    letterSpacing:2

  },
  note:{
    fontStyle:"italic",
    color:"white",
    marginTop:9,
    fontSize:14
  },
  categories:{
    fontSize:24,
    fontStyle:"italic",
    fontWieght:"semibold",
    marginLeft:9,
    marginBottom:6,
    color:"#F9B17A",
    letterSpacing:1
    
  },
  categoryItem:{
    height:90,
    width:90,
    borderRadius:6,
    paddingHorizontal:6,
    backgroundColor:"white",
    marginHorizontal:9,
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    gap:6,
   backgroundColor:"#676f9d"
    
  },
  card:{
    height:"60%",
    width:"80%",
    padding:2,
    justifyContent:"center",
    alignItems:"center",
    

  },
  cardImage:{
    height:"90%",
    width:"90%",
    tintColor:"#f9b17a"
  },
  recipeItem:{
    height:236,
    width:172,
    marginHorizontal:6,
    padding:3,
    justifyContent:"center",
    alignItems:"center",
    marginBottom:9
    
    
  },
  trendyRecipeTitle:{
    fontSize:24,
    fontWeight:"semibold",
    marginHorizontal:6,
    fontStyle:"italic",
    marginVertical:6,
    color:"#F9B17A",
    letterSpacing:1
    
  },
  recipeImage:{
    height:"90%",
    width:"90%",
    borderRadius:9,
    margin:1,
  
  },
  recipeTitle:{
    fontSize:15,
    fontStyle:"italic",
    marginHorizontal:3,
    color:"white"
  }
  
})