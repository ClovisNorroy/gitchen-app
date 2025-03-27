import { useDraggable } from "@dnd-kit/core";
import { Card, CardContent, CardMedia, Typography} from "@mui/material";
import { Link } from "react-router-dom";
import { CSS } from "@dnd-kit/utilities";

export default function RecipeCard({name, image, id, ingredients, recipeid, nolink}){
    const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({
        id: id,
        data: {ingredients: ingredients, name: name}
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        height: isDragging ? 79 : 330,
        width: isDragging ? 181 : 225
      };

    return(
        <Card ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            sx={{marginRight: 3}}
        >
          <Link to={`/recipe/${recipeid}`} style={{pointerEvents: nolink ? 'none' : 'auto'}}>
                { !isDragging && <CardMedia
                sx={{ height: 225, width: 225}}
                    image={`data:image/png;base64, ${image}`}
                    title={name}
                />}
                <CardContent>
                    <Typography
                    sx={{textWrap: 'wrap'}} align='center'>{name}</Typography>
                </CardContent>
          </Link>
        </Card>
    )
}