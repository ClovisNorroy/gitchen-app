import { Button, Container, Stack, TextField, Box, Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import RecipeCard from "../components/RecipeCard";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Recipes({ displayMode = "Full" }) {
  const recipeURL = useRef();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  async function loadRecipes() {
    const response = await fetch(
      import.meta.env.VITE_APP_GITCHEN_API + "/api/recipes",
      {
        method: "GET",
        credentials: "include",
      }
    );
    const recipes = await response.json();
    //console.log(recipes);
    setRecipes(recipes);
  }

  async function scrape() {
    console.log(recipeURL.current.value);
    const response = await fetch(
      import.meta.env.VITE_APP_GITCHEN_API + "/api/scrape",
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          URL: recipeURL.current.value,
        }),
      }
    );
    if(response.status === "200"){
      const recipeData = await response.json();
      navigate("/recipe", { state: { recipe: recipeData } });
    }
    else{
      setDialogIsOpen(true);
    }
  }

  useEffect(() => {
    loadRecipes();
  }, []);

  return (
    <Container>
      <Dialog open={dialogIsOpen}>
        <DialogTitle>Erreur de récupération</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Un problème est survenu lors de la récupération automatique de la recette.
            Voulez vous la récupérer manuelement ?
          </DialogContentText>
          <Button onClick={() => {}}>Oui</Button>
          <Button onClick={() => {setDialogIsOpen(false)}}>Non</Button>
        </DialogContent>
      </Dialog>
      {displayMode == "Full" && (
        <Box sx={{ marginBottom: 4 }}>
          <TextField
            inputRef={recipeURL}
            label="Télécharger une recette"
            size="small"
            sx={{ width: 975 }}
          />
          <Button onClick={scrape} variant="contained" sx={{ marginLeft: 2 }}>
            Copier une recette
          </Button>
          <Button onClick={() => navigate('/recipe')}>
            Nouvelle recette
          </Button>
        </Box>
      )}
      <Box>
        <Stack direction="row">
          {recipes.map((recipe, index) => (
            <RecipeCard
              id={index}
              key={recipe.id}
              image={recipe.image_mini}
              name={recipe.name}
              ingredients={recipe.ingredients}
            />
          ))}
        </Stack>
      </Box>
    </Container>
  );
}
