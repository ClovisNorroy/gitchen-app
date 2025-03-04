import { Button, Stack, TextField, Typography, Paper } from "@mui/material";
import { useLocation } from "react-router-dom";
import { makeListKeys } from "../assets/helperFunctions";
import SortableList from "../components/SortableList";
import { useRef, useState } from "react";

export default function Recipe(){
    const {state} = useLocation();
    const {recipe} = state || {};
    const titleRef = useRef('');
    const imageRef = useRef();
    const [ingredients, setIngredients] = useState(recipe ? recipe.ingredients : []);
    const [instructions, setInstructions] = useState(recipe ? recipe.instructions : []);
    const [displayedImage, setDisplayedImage] = useState(null);
    const keysInstructionsList = makeListKeys( recipe ? recipe.instructions.length : []);

    async function saveRecipe(){
        let ingredientArray = ingredients.map( (ingredientObject) =>  ingredientObject.item);
/*         const response = await fetch(import.meta.env.VITE_APP_GITCHEN_API+"/api/recipe",
            {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    title: title,
                    ingredients: ingredientArray.join(";"),
                    instructions: recipe.instructions.join(";"),
                    image: recipe.image
                })
            }
        ) */
            const formData = new FormData();
            formData.append('title', titleRef.current.value);
            formData.append('image', displayedImage);
            formData.append('ingredients', ingredients.map((ingredient) => ingredient.item));
            formData.append('instructions', instructions.map((instruction) => instruction.item));
            console.log(formData);
            const response = await fetch(import.meta.env.VITE_APP_GITCHEN_API+"/api/recipe",
                {
                    method: "POST",
                    credentials: "include",
                    body: formData
                }
            )

        console.log(response.status);
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
        console.log(ingredientList);
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
        console.log(instructionList);
    }

    function handleImageUpload(event){
        // https://imagekit.io/blog/how-to-resize-image-in-javascript/
        const file = event.target.files[0];

        if(file){
            imageRef.current = file;
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

                    const resisedDataUrl = canvas.toDataURL('image/png', 0.8);
                    setDisplayedImage(resisedDataUrl);
                }
            }
        }
    }

    return(
        <Stack>
            <Paper>
                {recipe ?<Typography variant="h3">{recipe.title}</Typography> : <TextField inputRef={titleRef}/>}
            </Paper>
            <Paper>
                {recipe ? <img src={`data:image/jpeg;base64,${recipe.image}`}/> : 
                <><input type="file" accept="image/*" onChange={(event) => handleImageUpload(event)}/>
                { displayedImage && <img src={displayedImage}/> }</>}
            </Paper>
            <Paper>
                <Typography>Ingrédients</Typography>
                <SortableList sortableList={ingredients} setSortableList={setIngredients} saveList={saveIngredients}/>
            </Paper>
            <Paper>
            <Typography>Instructions</Typography>
            <SortableList sortableList={instructions} setSortableList={setInstructions} saveList={saveInstructions}/>
            </Paper>
            <Button onClick={saveRecipe}>Sauvegarder la recette</Button>
        </Stack>
    )

}