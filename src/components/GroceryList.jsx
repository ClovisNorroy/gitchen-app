import { CheckBoxOutlineBlank } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon, TextField } from "@mui/material";
import { useRef, useState } from "react";

export default function GroceryList(){

    const TEST_DATA = ["Pommes", "Gateaux", "Oeufs", "PTT", "Fromage", "Poulet"];
    const [groceryList, setGroceryList] = useState(TEST_DATA);
    const newItemRef = useRef();

    function handleToggleChecked(itemIndex){
        const updatedGroceryList = [...groceryList.toSpliced(itemIndex, 1)];
        setGroceryList(updatedGroceryList);
    }

    function handleItemChange(newValue, index){
        const updatedGroceryList = [...groceryList.map( (groceryItem, groceryIndex) => {
            if(groceryIndex === index){
                return newValue;
            }
            else
                return groceryItem;
        })];
        setGroceryList(updatedGroceryList);
    }

    function handleNewItemKeyUp(event){
        if(event.key === "Enter"){
            setGroceryList([...groceryList, newItemRef.current.value]);
            newItemRef.current.value = "";
        }
    }

    return (
        <List>
            {groceryList.map( (item, index) => (
                <ListItem key={`item-${index}`}>
                    <ListItemButton>
                        <ListItemIcon>
                            <CheckBoxOutlineBlank onClick={() => handleToggleChecked(index)}/>
                        </ListItemIcon>
                        <TextField
                            variant="standard"
                            InputProps={{disableUnderline: true}}
                            value={item}
                            onChange={(event) => {handleItemChange(event.target.value, index)}}/>
                    </ListItemButton>
                </ListItem>
            ))}
            <ListItem key='new-item'>
                <ListItemButton>
                    <ListItemIcon>
                        <CheckBoxOutlineBlank/>
                    </ListItemIcon>
                    <TextField
                        variant="standard"
                        InputProps={{disableUnderline: true}}
                        inputRef={newItemRef}
                        onKeyUp={handleNewItemKeyUp}
                        placeholder="Ajouter un objet"/>
                </ListItemButton>
            </ListItem>
        </List>
    )
};