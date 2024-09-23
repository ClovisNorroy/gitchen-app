import { Box, Button, List, ListItem, TextField, Typography, useStepContext } from "@mui/material";
import { useLocation } from "react-router-dom";
import { makeListKeys } from "../assets/helperFunctions";
import SortableList from "../components/SortableList";
import { useState } from "react";

export default function Recipe(){
    const {state} = useLocation();
    const {recipe} = state;
    console.log(state);
    const [ingredients, setIngredients] = useState(recipe.ingredients);
    const [instructions, setInstructions] = useState(recipe.instructions);
    const keysIngredientsList = makeListKeys(recipe.ingredients.length);
    const keysInstructionsList = makeListKeys(recipe.instructions.length);

    async function saveRecipe(){
        const response = await fetch(import.meta.env.VITE_APP_GITCHEN_API+"/api/recipe",
            {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({title: recipe.title, ingredients: recipe.ingredients.join(";"), instructions: recipe.instructions.join(";")})
            }
        )
        console.log(response.status);
    }

    async function saveIngredients(ingredientList, newItemRef){
            let upToDateIngredientList = [...ingredientList];
            //Save new item if not done already (No blur and no enter pressed)
            if(newItemRef.current.value !== ""){
              upToDateGroceryList = [...upToDateGroceryList, { id:upToDateGroceryList.length+1, item:newItemRef.current.value}];
              setGroceryList(upToDateGroceryList);
              newItemRef.current.value = "";
            }
            setIngredients(ingredientList);
    }

    return(
        <Box>
            <Typography variant="h3">{recipe.title}</Typography>
            <SortableList initialData={ingredients} saveList={saveIngredients}/>
            <List id="instructions_list">
                {instructions.map( (instruction, index) => <ListItem key={keysInstructionsList[index]}>{instruction}</ListItem>)}
            </List>
            <Button onClick={saveRecipe}>Sauvegarder la recette</Button>
        </Box>
    )

}