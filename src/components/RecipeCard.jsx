import { Card, CardContent, CardMedia, List, ListItem, Typography } from "@mui/material";

export default function RecipeCard({name, image}){
    return(
        <Card sx={{width: 225, marginRight: 3, height: 330}}>
            <CardMedia
            sx={{ height: 225, width: 225}}
                image={`data:image/png;base64, ${image}`}
                title={name}
            />
            <CardContent>
                <Typography
                sx={{textWrap: 'wrap'}} align='center'>{name}</Typography>
            </CardContent>
        </Card>
    )
}