import {Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { useContext, useState,useRef, useEffect } from "react";
import { LoginContext } from "../store/login-context";
import SingleDayMenu from "./SingleDayMenu";

function SingleWeekMenu(props){
    const { isLoggedIn } = useContext(LoginContext);
    const [meals, setMeals] = useState(props.initialData);
    const autoSaveTimeoutRef = useRef(null);

    useEffect( () => {
        if(meals)
            saveMenu();
      }, [meals])

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
            {
                meals.slice(0, 7).map( (meal, dayNumber) => {
                    return(
                        <SingleDayMenu
                            key={"lunch_"+dayNumber}
                            initMeal={meal}
                            onMealChange={handleMealChange}
                            dayNumber={dayNumber}
                            lunchOrDiner={"lunch"}
                        />
                    )
                })
            }
            </TableRow>
            <TableRow>
                <TableCell>Soir</TableCell>
                {
                meals.slice(7, 14).map( (meal, dayNumber) => {
                    return(
                        <SingleDayMenu
                            key={"diner"+dayNumber}
                            initMeal={meal}
                            onMealChange={handleMealChange}
                            dayNumber={dayNumber}
                            lunchOrDiner={"diner"}
                        />
                    )
                })
            }
            </TableRow>
        </TableBody>
    </Table>
    <Button onClick={resetMenu}>Réinitialiser</Button>
    </Box>
    )
}

export default SingleWeekMenu;