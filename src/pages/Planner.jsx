import { TableContainer, Box, Grid, Typography, Container, Stack } from "@mui/material";
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


    useEffect( () => {
      if(meals)
          saveMenu();
    }, [meals])

    function handleDragEnd(event){
      console.log(event.over);
/*       const {over} = event;
      setParent(over ? over.id : null); */
    }

  function handleMealChange(event, index){
      const updatedMeals = meals.map((oldMeal, i) => {
          if( i === index ){
              return event.target.value;
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
        <Grid container>
          <DndContext onDragEnd={handleDragEnd}>
            <Grid item xs={10}>
              <TableContainer>
                <Menu handleMealChange={handleMealChange} resetMenu={resetMenu} meals={meals}/>
              </TableContainer>
              <Box>
                <Stack>
                  <Recipes displayMode={"bottomPanel"}/>
                </Stack>
              </Box>
            </Grid>
          </DndContext>

            {/* Right Side Panel: Grocery List */}
            <Grid item xs={2} borderLeft="solid black 2px" maxHeight='90vh'>             
                <Typography textAlign='center' variant="h5" marginBottom='20px'
                >Liste des courses</Typography>
                <SortableList initialData={plannerData.groceryList} saveList={saveGroceryList}/>
            </Grid>
        </Grid>
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