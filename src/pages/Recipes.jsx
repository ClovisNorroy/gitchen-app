import { Button, Stack, TextField } from "@mui/material"
import RecipeCard from "../components/RecipeCard";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Recipes(){
    const recipeURL = useRef();
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);

    async function loadRecipes(){
        const response = await fetch(import.meta.env.VITE_APP_GITCHEN_API+'/api/recipes',
            {
                method: 'GET',
                credentials: 'include'
            }
        );
        const recipes = await response.json();
        setRecipes(recipes);
    }

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
        <Button onClick={loadRecipes}>Load Recipes</Button>
            <Stack direction="row">
                {recipes.map( recipe => <RecipeCard key={recipe.id} image={recipe.image_mini} ingredients={recipe.ingredients}/>)}
            </Stack>
        </>

    )
}