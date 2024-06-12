import {Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../store/login-context";


function SingleWeekMenu(props){
    const { isLoggedIn } = useContext(LoginContext);
    const [meals, setMeals] = useState([]);

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

    function getMeal(dayNumber, mealsArray){
        if(typeof mealsArray[dayNumber] === 'undefined'){
            return "";
        }
        else{
            return mealsArray[dayNumber];
        }
    }

    function saveMenu(){
        if(isLoggedIn){
            fetch(import.meta.env.VITE_APP_GITCHEN_API+"/api/menu/save", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(meals)
            }).then(response => {return response.text();})
        } else {
            localStorage.setItem("menu", JSON.stringify(meals));
        }
    }

    function resetMenu(){
        const emptyMenu = Array.apply(null, Array(14)).map(() => {return ""});
        localStorage.setItem("menu", JSON.stringify(emptyMenu));
        setMeals(emptyMenu);
    }

    useEffect(() => {
        if(isLoggedIn){
            console.log("Fetching Grocery list");
            fetch(import.meta.env.VITE_APP_GITCHEN_API+"/api/menu", {
                method: "GET",
                credentials: "include"
            }).then(response => {return response.json();})
            .then(data => {
                let Menu = [];
                data.forEach((meal, day) => {
                    Menu.push(getMeal(day, data));
                });
                setMeals([...Menu]);
            })
        } else {
            // Check if exist in localStorage or create empty
            if(localStorage.getItem("menu")){
                setMeals(JSON.parse(localStorage.getItem("menu")));
            }
            else {
                setMeals(Array.apply(null, Array(14)).map(() => {return ""}));
            }
        }
    }, [isLoggedIn]);

    const weekHeader = [<TableCell key={"weekHeader_"+props.weekNumber+"_day_0"}></TableCell>];
    for( let day = 1 ; day <= 7; day++){
        weekHeader.push(<TableCell key={"weekHeader_"+props.weekNumber+"_day_"+day}>{'Jour '+ day}</TableCell>);
    }

    return (
        <Box>
        <Table>
        <TableHead>
            <TableRow>
                {weekHeader}
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
            <TableCell>Midi</TableCell>
            {// meals.map( (meal, dayNumber) => {return <SingleDayMenu key={"day"+dayNumber} meal={meal} />})
            meals.slice(0, 7).map( (meal, dayNumber) => {return (
            <TableCell key={"lunch_"+dayNumber}>
                <TextField
                multiline
                rows={2}
                fullWidth
                inputProps={{maxLength: 50}}
                onChange={(event) => {handleMealChange(event, dayNumber)}}
                value={meal}
                />
            </TableCell>
            )
            })}
            </TableRow>
            <TableRow>
                <TableCell>Soir</TableCell>
            {// meals.map( (meal, dayNumber) => {return <SingleDayMenu key={"day"+dayNumber} meal={meal} />})
            meals.slice(7, 14).map( (meal, dayNumber) => {return (
                <TableCell key={"lunch_"+dayNumber}>
                    <TextField
                    multiline
                    rows={2}
                    fullWidth
                    inputProps={{maxLength: 50}}
                    onChange={(event) => {handleMealChange(event, dayNumber+7)}}
                    value={meal}
                    />
                </TableCell>
                )
                })}
            </TableRow>
        </TableBody>
    </Table>
    <Button onClick={saveMenu}>Enregister</Button>
    <Button onClick={resetMenu}>Réinitialiser</Button>
    </Box>
    )
}

export default SingleWeekMenu;