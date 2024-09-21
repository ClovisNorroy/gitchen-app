import { Box, Button, List, ListItem, TextField, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { makeListKeys } from "../assets/helperFunctions";
import SortableList from "../components/SortableList";

export default function Recipe(){
    const {state} = useLocation();
    const {recipe} = state;
    console.log(state);
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

    return(
        <Box>
            <Typography variant="h3">{recipe.title}</Typography>
{/*             <List id="ingredients_list">
                {recipe.ingredients.map( (ingredient, index) => 
                    <ListItem key={keysIngredientsList[index]}>
                        <TextField
                        variant="standard"
                        value={ingredient}
                        onChange={event => handleIngredientChange(event.target.value, index)}/>
                    </ListItem>
                )}
            </List> */}
            <SortableList initialData={recipe.ingredients} saveList={() => {console.log("saving")}}/>
            <List id="instructions_list">
                {recipe.instructions.map( (instruction, index) => <ListItem key={keysInstructionsList[index]}>{instruction}</ListItem>)}
            </List>
            <Button onClick={saveRecipe}>Sauvegarder la recette</Button>
        </Box>
    )

}