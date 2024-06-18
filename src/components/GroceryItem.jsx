import { CheckBoxOutlineBlank } from '@mui/icons-material';
import { Box, ListItem, ListItemButton, ListItemIcon, TextField } from "@mui/material";

export default function GroceryItem({index, item, handleToggleChecked, handleItemChange}){

    return(
        <Box key={`box-${index}`}>
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