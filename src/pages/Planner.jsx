import { TableContainer, Box, Grid, Typography, Container } from "@mui/material";
import SingleWeekMenu from "../components/SingleWeekMenu";
import { useLoaderData } from "react-router-dom";
import { checkUserIsLogged } from "../assets/helperFunctions";
import { LoginContext } from '../store/login-context';
import { useContext, useRef } from "react";
import SortableList from "../components/SortableList";

export default function Planner(){
    const plannerData = useLoaderData();
    const { isLoggedIn } = useContext(LoginContext);
    const autoSaveTimeoutRef = useRef(null);

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
            <Grid item xs={10}>
                <TableContainer>
                <SingleWeekMenu key={"weekMenu_1"} weekNumber={1} initialData={plannerData.menu}/>
                </TableContainer>
            </Grid>
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

