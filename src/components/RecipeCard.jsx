import { useDraggable } from "@dnd-kit/core";
import { Card, CardContent, CardMedia, Typography} from "@mui/material";
import { Link } from "react-router-dom";
import { CSS } from "@dnd-kit/utilities";

export default function RecipeCard({name, image, id, ingredients, recipeid, nolink}){
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: id,
        data: {ingredients: ingredients, name: name}
    });

    const style = {
        transform: CSS.Translate.toString(transform),
      };

    return(
        <Card ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            sx={{width: 225, marginRight: 3, height: 330}}
        >
          <Link to={`/recipe/${recipeid}`} style={{pointerEvents: nolink ? 'none' : 'auto'}}>
                <CardMedia
                sx={{ height: 225, width: 225}}
                    image={`data:image/png;base64, ${image}`}
                    title={name}
                />
                <CardContent>
                    <Typography
                    sx={{textWrap: 'wrap'}} align='center'>{name}</Typography>
                </CardContent>
          </Link>
        </Card>
    )
}