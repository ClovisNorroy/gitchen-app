import { Button, Container, Stack, TextField, Box, Dialog, DialogTitle, DialogContent, DialogContentText, IconButton, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RecipeCard from "../components/RecipeCard";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Recipes({ displayMode = "Full" }) {
  const recipeURL = useRef();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  async function loadRecipes() {
    const response = await fetch(
      import.meta.env.VITE_APP_GITCHEN_API + "/api/recipe",
      {
        method: "GET",
        credentials: "include",
      }
    );
    const recipes = await response.json();
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
    console.log(response.status);
    if(response.status === 200){
      const recipeData = await response.json();
      navigate("/recipe", { state: { recipe: recipeData } });
    }
    else{
      console.log(response.status);
      setDialogIsOpen(true);
    }
  }

  useEffect(() => {
    loadRecipes();
  }, []);

  return (
    <Box sx={{ marginTop: 4, width: '100%' }}>
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
        <Box>
        <Box sx={{ marginBottom: 4, display: 'flex', marginLeft: 10}}>
          <TextField
            inputRef={recipeURL}
            label="Entrez l'URL d'une recette à copier"
            size="small"
            placeholder="https://www.marmiton.org/recettes/recette_tiramisu-recette-originale_12023.aspx"
            sx={{ width: 975 }}
          />
          <Button onClick={scrape} variant="contained" sx={{ height: 40 }}>
            Copier
          </Button>
          <Fab aria-label="Nouvelle recette" onClick={() => navigate('/recipe')} color="primary" sx={{ marginLeft: 'auto', marginRight: 5}}>
          <AddIcon />
          </Fab>
        </Box>

        </Box>
      )}
      <Container>
        <Stack direction="row">
          {recipes.map((recipe, index) => (
            <Link to={`/recipe/${recipe.id}`}>
              <RecipeCard
                id={index}
                key={recipe.id}
                image={recipe.image}
                name={recipe.name}
                ingredients={recipe.ingredients}
              />
            </Link>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
