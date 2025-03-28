import { useDraggable } from "@dnd-kit/core";
import { Card, CardContent, CardMedia, Typography, Paper, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { CSS } from "@dnd-kit/utilities";

export default function RecipeCard({name, image, id, ingredients, recipeid, nolink}) {

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
      data: { ingredients: ingredients, name: name },
    });

  const style = {
    transform: CSS.Translate.toString(transform)
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: 400,
        height: 100,
        marginRight: 3,
      }}
    >
      <CardMedia
        sx={{ height: 100, width: 150 }}
        image={`data:image/png;base64, ${image}`}
        title={name}
      />
      <Paper
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        sx={{ 
          marginRight: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Link
          to={`/recipe/${recipeid}`}
          style={{
            pointerEvents: nolink ? "none" : "auto",
            display: "flex",
            width: "100%",
            justifyContent: 'center',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <Typography sx={{ textWrap: "wrap" }} align="center">
            {name}
          </Typography>
        </Link>
      </Paper>
    </Box>
  );
}
