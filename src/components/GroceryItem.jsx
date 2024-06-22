import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CheckBoxOutlineBlank } from '@mui/icons-material';
import { Box, ListItem, ListItemButton, ListItemIcon, TextField } from "@mui/material";

export default function GroceryItem({index, item, handleToggleChecked, handleItemChange}){
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: index});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };

    return(
        <Box key={`box-${index}`} ref={setNodeRef} sx={style} {...attributes} {...listeners}>
            <ListItem key={`item-${index}`}
            sx={{padding:0}}>
            <ListItemButton sx={{padding:0}}>
                <ListItemIcon>
                <CheckBoxOutlineBlank
                    onClick={() => handleToggleChecked(index)}
                />
                </ListItemIcon>
                <TextField
                multiline
                variant="standard"
                InputProps={{ disableUnderline: true }}
                value={item}
                onChange={(event) => {
                    handleItemChange(event.target.value, index);
                }}
                />
            </ListItemButton>
            </ListItem>
        </Box>
    )
};