import {Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function SingleWeekMenu(props){

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
    //TODO: Use env variable for URL
    function saveMenu(){
        console.log(Cookies.get("logged_in"));
        if(Cookies.get("logged_in") === "true"){
            fetch(process.env.REACT_APP_GITCHEN_API+"/api/menu/save", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(meals)
            }).then(response => {return response.text();})
        } else {
            Cookies.set("menu", JSON.stringify(meals), { sameSite: 'strict'});
        }
    }

    function resetMenu(){
        const emptyMenu = Array.apply(null, Array(14)).map(() => {return ""});
        Cookies.set("menu", JSON.stringify(emptyMenu), { sameSite: 'strict'});
        setMeals(emptyMenu);
    }

    useEffect(() => {
        if(Cookies.get("logged_in") === "true"){
            fetch(process.env.REACT_APP_GITCHEN_API+"/api/menu", {
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
            // Check if exist in cookies or create empty
            if(typeof Cookies.get("menu") !== "undefined"){
                setMeals(JSON.parse(Cookies.get("menu")));
            }
            else {
                setMeals(Array.apply(null, Array(14)).map(() => {return ""}));
            }
        }
    }, []);

    const weekHeader = [<TableCell key={"weekHeader_"+props.weekNumber+"_day_0"}></TableCell>];
    for( let day = 1 ; day <= 7; day++){
        weekHeader.push(<TableCell key={"weekHeader_"+props.weekNumber+"_day_"+day}>{'Day '+ day}</TableCell>);
    }

    return (
        <Box sx={{mt: 10}}>
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
    <Button onClick={saveMenu}>Save</Button>
    <Button onClick={resetMenu}>Reset</Button>
    </Box>
    )
}

export default SingleWeekMenu;