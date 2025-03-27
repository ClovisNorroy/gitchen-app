import { TableContainer, Box, Grid, Typography, Stack, Paper } from "@mui/material";
import Menu from "../components/Menu";
import { useLoaderData } from "react-router-dom";
import { checkUserIsLogged } from "../assets/helperFunctions";
import { LoginContext } from '../store/login-context';
import { useContext, useEffect, useRef, useState } from "react";
import SortableList from "../components/SortableList";
import Recipes from "./Recipes";
import { DndContext } from "@dnd-kit/core";

export default function Planner(){
    const plannerData = useLoaderData();
    const { isLoggedIn } = useContext(LoginContext);
    const autoSaveTimeoutRef = useRef(null);
    const [meals, setMeals] = useState(plannerData.menu);
    const [groceryList, setGroceryList] = useState(plannerData.groceryList.length ? plannerData.groceryList.map((item, index) => {return {id: index+1, item:item}}) : [])


    useEffect( () => {
      if(meals)
        console.log('saving menu');
          saveMenu();
    }, [meals])

    function handleDragEnd(event){
      const { active, over } = event;
      if(over){
        handleMealChange(active.data.current.name, over.id);
        addGroceries(active.data.current.ingredients);
      }
    }

    function addGroceries(groceries){
      const groceriesToAdd = groceries.map( (item, index) => { return {id: index+groceryList.length+1, item: item} });
      setGroceryList([...groceryList, ...groceriesToAdd]);
    }

  function handleMealChange(newValue, index){
      const updatedMeals = meals.map((oldMeal, i) => {
          if( i === index ){
              return newValue;
          }else {
              return oldMeal;
          }
      });
      setMeals(updatedMeals);
  }

  function saveMenu(){
      if(autoSaveTimeoutRef.current){
          clearTimeout(autoSaveTimeoutRef.current);
          autoSaveTimeoutRef.current = null;
      }
      autoSaveTimeoutRef.current = setTimeout( () =>{
          if(isLoggedIn){
              fetch(import.meta.env.VITE_APP_GITCHEN_API+"/api/menu/save", {
                  method: "POST",
                  credentials: "include",
                  body: JSON.stringify(meals)
              }).then(response => {return response.text();})
          } else {
              localStorage.setItem("menu", JSON.stringify(meals));
          }
      }, 4000);
  }

  function resetMenu(){
      const emptyMenu = Array.apply(null, Array(14)).map(() => {return ""});
      localStorage.setItem("menu", JSON.stringify(emptyMenu));
      setMeals(emptyMenu);
  }

    function saveGroceryList(groceryList, setGroceryList, newItemRef){

        if(autoSaveTimeoutRef.current){
          clearTimeout(autoSaveTimeoutRef.current);
          autoSaveTimeoutRef.current = null;
        }
        let upToDateGroceryList = [...groceryList];
        autoSaveTimeoutRef.current = setTimeout( () =>{
          
          //Save new item if not done already (No blur and no enter pressed)
          if(newItemRef.current.value !== ""){
            upToDateGroceryList = [...upToDateGroceryList, { id:upToDateGroceryList.length+1, item:newItemRef.current.value}];
            setGroceryList(upToDateGroceryList);
            newItemRef.current.value = "";
          }
      
          if(isLoggedIn){
            fetch(import.meta.env.VITE_APP_GITCHEN_API+"/api/grocerylist",{
              credentials: 'include',
              method: 'POST',
              body: JSON.stringify(upToDateGroceryList.map(itemObject => itemObject.item))
            }).then( response => {
              console.log(response.text());
            });
            console.log(JSON.stringify(upToDateGroceryList.map(itemObject => itemObject.item)));
          }else{
            localStorage.setItem("groceryList", JSON.stringify(upToDateGroceryList));
          }
        }, 2000);
      }

    return(
      <Box sx={{backgroundColor: 'grey'}}>
        <Grid container columnSpacing={2} rowSpacing={2} sx={{ margin: 1, width: '99%'}}>
          <DndContext onDragEnd={handleDragEnd}>
            {/* Left side top panel: Menu */}
            <Grid item xs={10}>
              <Paper variant='outlined' sx={{marginBottom: 2}}>
                <TableContainer>
                  <Menu handleMealChange={handleMealChange} resetMenu={resetMenu} meals={meals}/>
                </TableContainer>
              </Paper>
              {/* Left side bottom panel: Recipes */}
              <Box>
                <Paper variant='outlined' sx={{padding: 3}}>
                  <Typography variant='h4'>Mes recettes</Typography>
                  <Stack>
                    <Recipes displayMode={"bottomPanel"}/>
                  </Stack>                  
                </Paper>
              </Box>
            </Grid>
          </DndContext>

            {/* Right side panel: Grocery list */}
            <Grid item xs={2} >
              <Paper variant='outlined' sx={{ maxHeight: '120'}}>
                <Typography textAlign='center' variant="h5" marginBottom='20px'
                >Liste des courses</Typography>
                <SortableList sortableList={groceryList} setSortableList={setGroceryList} saveList={saveGroceryList}/>              
              </Paper>
            </Grid>
        </Grid>
      </Box>
    );
}

export async function loader(){
    const isLoggedIn = checkUserIsLogged();
    let groceryList;
    if(isLoggedIn){
        const resp = await fetch(import.meta.env.VITE_APP_GITCHEN_API+"/api/grocerylist",{
        credentials: 'include',
        method: 'GET'
      })
    const data = await resp.json();
    groceryList = data.length ? data : [];
    }
    else{
      if(localStorage.getItem("groceryList")){
        const localGroceryList = JSON.parse(localStorage.getItem("groceryList"));
        groceryList = localGroceryList ;
      }else{
        groceryList = [];
      }
    }
    let menu;
    if(isLoggedIn){
        const response = await fetch(import.meta.env.VITE_APP_GITCHEN_API+"/api/menu", {
            method: "GET",
            credentials: "include"
        });
        const data = await response.json();
        let Menu = [];
        data.forEach((meal, day) => {
            Menu.push(getMeal(day, data));
        });
        menu = [...Menu];
    } else {
        // Check if exist in localStorage or create empty
        if(localStorage.getItem("menu")){
            menu = JSON.parse(localStorage.getItem("menu"));
        }
        else {
            menu = Array.apply(null, Array(14)).map(() => {return ""});
        }
    }
    return {groceryList : groceryList, menu: menu};
  }

  function getMeal(dayNumber, mealsArray){
    if(typeof mealsArray[dayNumber] === 'undefined'){
        return "";
    }
    else{
        return mealsArray[dayNumber];
    }
}