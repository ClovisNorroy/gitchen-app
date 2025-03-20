import { Button, Stack, TextField, Typography, Paper, List, ListItem } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SortableList from "../components/SortableList";
import { useEffect, useRef, useState } from "react";

export default function Recipe(){
    const [mode, setMode] = useState('edition');
    const {state} = useLocation();
    const {recipe} = state || {};
    const [name, setName] = useState(recipe ? recipe.name : '');
    const [ingredients, setIngredients] = useState(recipe ? recipe.ingredients : []);
    const [instructions, setInstructions] = useState(recipe ? recipe.instructions : []);
    const [displayedImage, setDisplayedImage] = useState(null);
    const navigate = useNavigate();
    const { recipeID } = useParams();

    useEffect( () => {
        if(recipeID){
            setMode('lecture');
            fetchRecipe();
        }
        else if(recipe){
            setName(recipe.name);
            resizeImage(recipe.image);
        }
    }, [])

    async function fetchRecipe(){
        const response = await fetch(import.meta.env.VITE_APP_GITCHEN_API+`/api/recipe/${recipeID}`,
            {
                method: 'GET',
                credentials: 'include'
            }
        );
        if(response.status === 200){
            const dataRecipe = await response.json();
            setName(dataRecipe[0].name);
            setIngredients(dataRecipe[0].ingredients.map( (ingredient, index) => {return {'item': ingredient, 'index': index}}));
            setInstructions(dataRecipe[0].instructions.map( (instruction, index) => {return {'item': instruction, 'index': index}}));
            setDisplayedImage(`data:image/jpg;base64,${dataRecipe[0].image}`);
        }
        else{
            navigate('/recipes');
        }
    }

    async function saveRecipe(){
            const response = await fetch(import.meta.env.VITE_APP_GITCHEN_API+"/api/recipe",
                {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({
                        name: recipe.name,
                        ingredients: ingredients.map((ingredient) => ingredient.item).join(";"),
                        instructions: instructions.map((instruction) => instruction.item).join(";"),
                        image: displayedImage
                    })
                }
            )

        if(response.status === 200){
            navigate('/recipes');
        }
    }

    async function saveIngredients(ingredientList, setSortableIngredients, newItemRef){
        let upToDateIngredientList = [...ingredientList];
        //Save new item if not done already (No blur and no enter pressed)
        if(newItemRef.current.value !== ""){
            upToDateIngredientList = [...upToDateIngredientList, { id:upToDateIngredientList.length+1, item:newItemRef.current.value}];
            setSortableIngredients(upToDateIngredientList);
            newItemRef.current.value = "";
        }
        setIngredients(upToDateIngredientList);
    }

    async function saveInstructions(instructionList, setSortableInstructions, newItemRef){
        let upToDateInstructionList = [...instructionList];
        //Save new item if not done already (No blur and no enter pressed)
        if(newItemRef.current.value !== ""){
            upToDateInstructionList = [...upToDateInstructionList, { id:upToDateInstructionList.length+1, item:newItemRef.current.value}];
            setSortableInstructions(upToDateInstructionList);
            newItemRef.current.value = "";
        }
        setInstructions(upToDateInstructionList);
    }

    function resizeImage(base64Image){
        const img = new Image();
        img.src = 'data:image/jpg;base64,'+base64Image;
        img.onload = function (){
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = 225;
            canvas.width = 225;
            context.drawImage(img, 0, 0, 225, 225);
            let dataURL = canvas.toDataURL('image/jpeg', 0.8);
            setDisplayedImage(dataURL);
        };
    }

    function handleImageUpload(event){
        // https://imagekit.io/blog/how-to-resize-image-in-javascript/
        const file = event.target.files[0];

        if(file){
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                const recipeImage = new Image();
                recipeImage.src = e.target.result;
                recipeImage.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.height = 225;
                    canvas.width = 225;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(recipeImage, 0, 0, 225, 225);

                    const resisedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
                    setDisplayedImage(resisedDataUrl);
                }
            }
        }
    }

    return(
        <Stack>
            <Paper>
                { mode === 'edition' ? <TextField value={name} onChange={ event => setName(event.target.value)}/> : <Typography variant="h2">{name}</Typography>}
            </Paper>
            <Paper>
                {mode === 'edition' && <input type="file" accept="image/*" onChange={(event) => handleImageUpload(event)}/>}
                { displayedImage && <img src={displayedImage}/> }
            </Paper>
            <Paper>
                <Typography variant='h5'>Ingrédients</Typography>
                { mode === 'edition' ? 
                    <SortableList sortableList={ingredients} setSortableList={setIngredients} saveList={saveIngredients}/>
                    :
                    <List>
                        {ingredients.map((ingredient) => <ListItem key={ingredient.id}>{ingredient.item}</ListItem>)}
                    </List>
                }
            </Paper>
            <Paper>
            <Typography variant='h5'>Instructions</Typography>
            { mode === 'edition' 
                ? 
                <SortableList sortableList={instructions} setSortableList={setInstructions} saveList={saveInstructions}/>
                :
                <List>
                    { instructions.map((instruction) => <ListItem key={instruction.id}>{instruction.item}</ListItem>) }
                </List>
            }
            </Paper>
            { mode === 'edition' && <Button onClick={saveRecipe}>Sauvegarder la recette</Button> }
        </Stack>
    )

}