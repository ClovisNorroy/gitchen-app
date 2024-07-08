import { TableContainer, Box, Grid, Typography, Container } from "@mui/material";
import SingleWeekMenu from "../components/SingleWeekMenu";
import GroceryList from "../components/GroceryList";
import { useLoaderData } from "react-router-dom";
import { checkUserIsLogged } from "../assets/helperFunctions";

export default function Planner(){
    const plannerData = useLoaderData();
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
                <GroceryList initialData = {plannerData.groceryList}/>
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
    groceryList = data.length ? data.map((item, index) => {return {id: index+1, item:item}}) : [];
    }
    else{
      if(localStorage.getItem("groceryList")){
        const localGroceryList = JSON.parse(localStorage.getItem("groceryList"));
        groceryList = localGroceryList.map((item, index) => {return {id: index, item:item}});
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