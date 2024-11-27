import { Card, CardContent, CardMedia, List, ListItem } from "@mui/material";

export default function RecipeCard({ingredients, image}){
    return(
        <Card sx={{height: 220}}>
            <CardMedia
            sx={{ height: 140}}
                image={`data:image/png;base64, ${image}`}
                title="burger"
            />
            <CardContent>
                <List>
                    {ingredients.map( (ingredient, index) => <ListItem key={`${index}-${ingredient}`}>{ingredient}</ListItem>)}
                </List>
            </CardContent>
        </Card>
    )
}