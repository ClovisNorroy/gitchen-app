import { Button, Stack, TextField } from "@mui/material"
import RecipeCard from "../components/RecipeCard";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Recipes(){
    const recipeURL = useRef();
    const navigate = useNavigate();
    async function scrape(){

        console.log(recipeURL.current.value);
        const response = await fetch(import.meta.env.VITE_APP_GITCHEN_API+"/api/scrape",
            {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({URL: "https://www.marmiton.org/recettes/recette_tartines-ricotta-courgettes-petits-pois-menthe_531115.aspx"})
            }
        )

        const recipeData = await response.json();
        navigate("/recipe", {state :{recipe : recipeData}});

    }
    //Fetch Recipe
    const DUMMY_RECIPE = [{title:"mousse", ingredients: ["250g chocolat", "3 oeufs", "20g sucre"], instructions: ["un", "deux", "trois"]}, 
    {title:"charlotte", ingredients: ["250g fraises", "biscuits", "3 oeufs"], instructions: ["prems", "deuz", "troiz"]}];
    return(
        <>
        <TextField inputRef={recipeURL}/>
        <Button onClick={scrape}>Scrape Recipe</Button>
            <Stack direction="row">
                {DUMMY_RECIPE.map( recipe => <RecipeCard key={recipe.title} ingredients={recipe.ingredients}/>)}
            </Stack>
        </>

    )
}