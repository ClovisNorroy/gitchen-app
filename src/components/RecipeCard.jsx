import { useDraggable } from "@dnd-kit/core";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { CSS } from "@dnd-kit/utilities";

export default function RecipeCard({name, image, id}){
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: id,
        data: {ingredients: "oui"}
    });

    const style = {
        transform: CSS.Translate.toString(transform),
      };

    return(
        <Card ref={setNodeRef} style={style} {...listeners} {...attributes} sx={{width: 225, marginRight: 3, height: 330}}>
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