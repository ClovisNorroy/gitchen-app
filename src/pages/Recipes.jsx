import { Button, Container, Stack, TextField, Box, Drawer } from "@mui/material"
import RecipeCard from "../components/RecipeCard";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Recipes({displayMode = "Full"}){
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
        //console.log(recipes);
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

    useEffect( () => {
        loadRecipes();
    }, [])

    return(
        <Container>
{/*             <Drawer variant='permanent'>
                <Button variant='outlined'>Nouvelle recette</Button>
            </Drawer> */}
        {displayMode=="Full" && <Box sx={{marginBottom:4}}>
        
        <TextField inputRef={recipeURL} label='Télécharger une recette' size='small' sx={{width:975}}/>
        <Button onClick={scrape} variant='contained' sx={{marginLeft: 2}}>Copier une recette</Button>
        </Box>}
        <Box>
            <Stack direction="row">
                {recipes.map( recipe => <RecipeCard key={recipe.id} image={recipe.image_mini} name={recipe.name}/>)}
            </Stack>
        </Box>

        </Container>

    )
}