import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, Image, StyleSheet, TextInput, FlatList,ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { Keys } from '../constants/keys.js';
import Modal from "react-native-modal"
import { CUISINE_FILTERS, DIET_FILTERS, DISH_FILTERS, HEALTH_FILTERS } from '../constants/Data.js';
import * as Animatable from "react-native-animatable";


export default function Search() {

  const navigation=useNavigation();
  let [searchText,setSearchText]=useState('');
  let [recipes,setRecipes]=useState([]);
  let [isLoading,setIsLoading]=useState(false);
  let [showModal,setShowModal]=useState(false);
  let [dishType,setDishType]=useState('');
  let [dietType,setDietType]=useState('');
  let [cuisineType,setCuisineType]=useState('');
  let [healthType,setHealthType]=useState('');
  let [isEmpty,setIsEmpty]=useState(false);

  async function  getRecipes()
  {
    try 
    {
      
      setIsLoading(true);
      setRecipes([]);
      let res=await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchText.toLowerCase().trim()}&app_id=${Keys.APP_ID}&app_key=${Keys.APP_KEY}`);
      setRecipes(res.data.hits);

      setIsLoading(false);
      if(res.data.hits.length==0)
      {
        setIsEmpty(true);
      }
      else
      {
        isEmpty=false;
      }

      if(searchText=='')
      {
        setIsEmpty(false);
      }

    } 
    catch (error) 
    {
      
      console.log("You got an error :-"+error);
    }
  }

  async function  filterRecipes()
  {
    try 
    {
      setIsLoading(true);
      setRecipes([]);
    
      let res='';
      if(dishType=='' && healthType=='' && cuisineType=='' && dietType=='')
      {
        res=await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchText.toLowerCase()}&app_id=${Keys.APP_ID}&app_key=${Keys.APP_KEY}`);
      }
      else if(cuisineType!='' && healthType!='' && dietType!='' )
      {
        res=await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchText.toLowerCase()}&app_id=${Keys.APP_ID}&app_key=${Keys.APP_KEY}&Health=${healthType}&cuisineType=${cuisineType}&Diet=${dietType}`);
      
      }

      else if(cuisineType!='' && healthType!='')
      {
        res=await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchText.toLowerCase()}&app_id=${Keys.APP_ID}&app_key=${Keys.APP_KEY}&cuisineType=${cuisineType}&Health=${healthType}`);
      }

      else if(cuisineType!='' && dietType!='')
      {
        res=await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchText.toLowerCase()}&app_id=${Keys.APP_ID}&app_key=${Keys.APP_KEY}&cuisineType=${cuisineType}&Diet=${dietType}`);
      }
      
     
      else if(healthType!='')
      {
         res=await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchText.toLowerCase()}&app_id=${Keys.APP_ID}&app_key=${Keys.APP_KEY}&Health=${healthType}`);
      }
      else if(dietType!='')
      {
        res=await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchText.toLowerCase()}&app_id=${Keys.APP_ID}&app_key=${Keys.APP_KEY}&Diet=${dietType}`);
      }
     
      else if(cuisineType!='')
      {
        res=await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchText.toLowerCase()}&app_id=${Keys.APP_ID}&app_key=${Keys.APP_KEY}&cuisineType=${cuisineType}`);
      }
     
      else if(dishType!='')
      {
        res=await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchText.toLowerCase()}&app_id=${Keys.APP_ID}&app_key=${Keys.APP_KEY}&dishType=${dishType}`);
      }
     
      setRecipes(res.data.hits);

      setIsLoading(false);

    } 
    catch (error) 
    {
      
      console.log("You got an error :-"+error);
    }
  }
  
 

  return (
   <SafeAreaView style={{flex:1, backgroundColor:"#2D3250",}}>
      <StatusBar barStyle={'light-content'}/>
      <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.goBack()} style={styles.backBtn}>
        <Image style={styles.backBtnIcon} source={require("../assets/back.png")} />
      </TouchableOpacity>
      <View style={styles.searchBox}>
        < Image style={{height:23,width:23,tintColor:"white"}} source={require("../assets/search.png")} />
        <TextInput value={searchText}  onChangeText={setSearchText} style={styles.input} placeholderTextColor={"white"} placeholder='Search here...' />
        <TouchableOpacity onPress={()=>{setSearchText(''); setRecipes([]);setIsEmpty(false)}}>
          {searchText!='' && <Image style={{height:15,width:15,tintColor:"white"}} source={require("../assets/close.png")} />}
        </TouchableOpacity>        
      </View>
      {searchText!='' && 
        <TouchableOpacity  onPress={()=>getRecipes()} activeOpacity={0.6} style={styles.searchBtn}>
          <Text style={{color:"black"}}>Search Now</Text>
        </TouchableOpacity>
      }

      {isLoading ? <ActivityIndicator style={{marginTop:"18%"}} size={"large"} color={"orange"} /> :
     
         <View>
          {isEmpty  ?  <View style={{flexDirection:"row",gap:6,alignItems:"center",justifyContent:"center",marginTop:21}}>
            <Animatable.Text animation={"slideInUp"} style={{fontSize:18,color:"white",}}>No result found for</Animatable.Text>
            <Animatable.Text animation={"slideInUp"} style={{color:"red",fontSize:18}}>"{searchText}"</Animatable.Text>
          </View>  : 
          <FlatList
          scrollToOverflowEnabled={true}
          contentContainerStyle={{marginTop:15}}
          showsVerticalScrollIndicator={false}
          data={recipes}
          renderItem={({item,index})=>{
            return(
              <TouchableOpacity key={index} onPress={()=>navigation.navigate("Details",{data:item})} style={styles.recipe}>
                <Animatable.Image animation={"slideInUp"} style={styles.recipeImg} source={{uri:item.recipe.image}}  />
 
                <Animatable.View animation={"slideInUp"} style={{gap:9}}>
                 <Text numberOfLines={2} style={styles.recipeLabel}>{item.recipe.label}</Text>
                 <Text style={{color:"#f9b17a",marginLeft:9}}>Source : {item.recipe.source}</Text>
                </Animatable.View>
               
              </TouchableOpacity>
            )
          }}         
          />
          }

         

       </View>
      }

      {recipes.length > 0 && <TouchableOpacity onPress={()=>setShowModal(true)} style={styles.filterBtn}>
      <Image style={styles.filterImg} source={require("../assets/filter.png")}/>
      </TouchableOpacity>}
     
     <Modal onBackdropPress={()=>setShowModal(false)} onBackButtonPress={()=>setShowModal(false)} isVisible={showModal} backdropColor='rgba(0,0,0,0.4)' style={{margin:0}}>
      <ScrollView  style={styles.modalView}>
        <View style={styles.modalHeader}>
          <Text style={{fontSize:23,fontStyle:"italic",color:"#f9b17a",fontWeight:"bold"}}>Filter</Text>
          <TouchableOpacity onPress={()=>setShowModal(false)}>
            <Image source={require("../assets/close.png")} style={{height:13,width:13,tintColor:"orange"}} />
          </TouchableOpacity>
        </View>

        <Text style={{fontSize:18,fontWeight:"bold",marginLeft:9,fontStyle:"italic",color:"white"}}>Dish Type</Text>
        <View>
          <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{marginVertical:9}}
          data={DISH_FILTERS}
          renderItem={({item,index})=>{
            return(
              <TouchableOpacity onLongPress={()=>setDishType('')} onPress={()=>setDishType(item)} style={[styles.filterItem,{backgroundColor:dishType ==item ? "#f9b17a":"#676f9d"}]}>
                <Text style={{color:dishType ==item ? "black":"white"}}>{item}</Text>
              </TouchableOpacity>
            )
          }}
          />
        </View>

        <Text style={{fontSize:18,fontWeight:"bold",marginLeft:9,fontStyle:"italic",color:"white"}}>Cuisine Type</Text>
        <View>
          <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{marginVertical:9}}
          data={CUISINE_FILTERS}
          renderItem={({item,index})=>{
            return(
              <TouchableOpacity onLongPress={()=>setCuisineType('')} onPress={()=>setCuisineType(item)} style={[styles.filterItem,{backgroundColor:cuisineType ==item ? "#f9b17a":"#676f9d"}]}>
                <Text  style={{color:cuisineType ==item ? "black":"white"}}>{item}</Text>
              </TouchableOpacity>
            )
          }}
          />
        </View>
        <Text style={{fontSize:18,fontWeight:"bold",marginLeft:9,fontStyle:"italic",color:"white"}}>Diet Type</Text>
        <View>
          <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{marginVertical:9}}
          data={DIET_FILTERS}
          renderItem={({item,index})=>{
            return(
              <TouchableOpacity onLongPress={()=>setDietType('')} onPress={()=>setDietType(item)} style={[styles.filterItem,{backgroundColor:dietType ==item ? "#f9b17a":"#676f9d"}]}>
                <Text  style={{color:dietType ==item ? "black":"white"}}>{item}</Text>
              </TouchableOpacity>
            )
          }}
          />
        </View>

        <Text style={{fontSize:18,fontWeight:"bold",marginLeft:9,fontStyle:"italic",color:"white"}}>Health Type</Text>
        <View>
          <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{marginVertical:9}}
          data={HEALTH_FILTERS}
          renderItem={({item,index})=>{
            return(
              <TouchableOpacity onLongPress={()=>setHealthType('')} onPress={()=>setHealthType(item)} style={[styles.filterItem,{backgroundColor:healthType ==item ? "#f9b17a":"#676f9d"}]}>
                <Text  style={{color:healthType ==item ? "black":"white"}}>{item}</Text>
              </TouchableOpacity>
            )
          }}
          />
        </View>

       <TouchableOpacity  style={styles.applyBtn} onPress={()=>{setShowModal(false);filterRecipes()}}>
        <Text style={{color:"black",fontSize:15,textAlign:"center"}}>Apply Filters</Text>
       </TouchableOpacity>
       
        
      </ScrollView>
     </Modal>
     
     
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
  searchBox:{
    padding:9,
    borderWidth:1,
    borderColor:"gray",
    borderRadius:9,
    alignItems:"center",
    flexDirection:"row",
    width:"90%",
    marginTop:50,
    alignSelf:"center",
    backgroundColor:"#676f9d",
  },
  input:{
    width:"83%",
    marginLeft:6,
    color:"white",
    fontWeight:'bold'
   
  },
  searchBtn:{
    padding:9,
    borderRadius:6,
    justifyContent:"center",
    alignItems:"center",
    alignSelf:'center',
    marginTop:24,
    backgroundColor:"#f9b17a",

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
  filterBtn:{
    padding:2,
    borderRadius:50,
    position:"absolute",
    bottom:35,
    right:20,
    backgroundColor:"#f9b17a",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0.5,
    
    elevation: 1,
  },
  filterImg:{
    height:30,
    width:30,
    margin:12,
    tintColor:"black",
   
  },
  modalView:{
    width:"100%",
    height:"50%",
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    backgroundColor:"#2d3250",
    position:"absolute",
    bottom:0
  },
  modalHeader:{
    flexDirection:"row",
    paddingVertical:15,
    paddingHorizontal:15,
    justifyContent:"space-between",
    alignItems:"center",    
  },
  filterItem:{
    borderWidth:1,
    borderColor:"gray",
    padding:6,
    marginLeft:6,
    borderRadius:12,
    marginRight:2
   
  },
  applyBtn:{
    padding:15,
    borderRadius:9,
    backgroundColor:'#f9b17a',
    marginVertical:9,
    alignSelf:'center',
    width:"70%"
  }
  
  
})