import { CheckBoxOutlineBlank } from '@mui/icons-material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { isLoggedIn } from '../assets/helperFunctions';
import {
  Button,
    IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

//TODO: !! Use react-dnd !!
const moveItem = (array, to, from) => {
    const item = array[from];
    array.splice(from, 1);
    array.splice(to, 0, item);
    return array;
};

export default function GroceryList() {

  const [groceryList, setGroceryList] = useState([]);
  const [isMoving, setIsMoving] = useState(false);
  const [isMovingtoIndex, setIsMovingToIndex] = useState(null);
  const [whatItemIsMoved, setWhatItemIsMoved] = useState({item:null, index:null});
  const newItemRef = useRef();

  useEffect(() => {
    if(isLoggedIn()){
      fetch(process.env.REACT_APP_GITCHEN_API+"/api/grocerylist",{
        credentials: 'include',
        method: 'GET'
      }).then( response => response.json())
      .then( data => {
        setGroceryList(data);
      }
      );
    }
    else{
      if(localStorage.getItem("groceryList")){
        setGroceryList(JSON.parse(localStorage.getItem("groceryList")));
      }else{
        setGroceryList([]);
      }
    }
  }, []);

  function saveGroceryList(){
    let upToDateGroceryList = groceryList;
    //Save new item if not done already (No blur and no enter pressed)
    if(newItemRef.current.value !== ""){
      upToDateGroceryList = [...groceryList, newItemRef.current.value];
      setGroceryList([...groceryList, newItemRef.current.value]);      
      newItemRef.current.value = "";
    }

    if(isLoggedIn()){
      console.log(groceryList);
      fetch(process.env.REACT_APP_GITCHEN_API+"/api/grocerylist",{
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(upToDateGroceryList)
      }).then( response => {
        console.log(response.text());
      });
    }else{
      localStorage.setItem("groceryList", JSON.stringify(upToDateGroceryList));
    }
  }

  function handleChangeItemIndex(newIndex, oldIndex){
    const oldList = [...groceryList];
    const newList = moveItem(oldList, newIndex, oldIndex);
    setGroceryList(newList);
    setIsMoving(false);
  }

  function handleMoveItem(movedItem){
    setWhatItemIsMoved(movedItem);
    setIsMoving(true);
  }

  function handleToggleChecked(itemIndex) {
    const updatedGroceryList = [...groceryList.toSpliced(itemIndex, 1)];
    setGroceryList(updatedGroceryList);
  }

  function handleItemChange(newValue, index) {
    const updatedGroceryList = [
      ...groceryList.map((groceryItem, groceryIndex) => {
        if (groceryIndex === index) {
          return newValue;
        } else return groceryItem;
      }),
    ];
    setGroceryList(updatedGroceryList);
  }

  function handleNewItemKeyUp(event) {
    if (event.key === "Enter") {
      setGroceryList([...groceryList, newItemRef.current.value]);
      newItemRef.current.value = "";
    }
  }

  function handleNewItemOnBlur() {
      setGroceryList([...groceryList, newItemRef.current.value]);
      console.log("OnBlur");
      newItemRef.current.value = "";
  }

  return (
    <List dense sx={{maxHeight: '85vh', overflowY: 'scroll'}}>
      {groceryList.map((item, index) => (
        <>
                <ListItem
        key={`list-move-${index}`}
            sx={{display: isMoving ? "block" : "none"}}
            onMouseEnter={() => setIsMovingToIndex(index)}
            onMouseLeave={() => setIsMovingToIndex(null)}
            onClick={() => handleChangeItemIndex(index, whatItemIsMoved.index)}>
                <Typography>{isMovingtoIndex === index ? whatItemIsMoved.item : ''}</Typography>
        </ListItem>
        <ListItem key={`item-${index}`}
        sx={{padding:0}}
            secondaryAction={
                <IconButton edge="end" 
                    aria-label='move-button'
                    onClick={() => handleMoveItem({item: item, index: index})}
                    sx={{display: isMoving ? "none" : "block",}}>
                    <SwapVertIcon/>
                </IconButton>
            }>
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
        </>
      ))}
      <ListItem key="new-item" sx={{padding:0}}>
        <ListItemButton sx={{padding:0}}>
          <ListItemIcon>
            <CheckBoxOutlineBlank />
          </ListItemIcon>
          <TextField
            variant="standard"
            InputProps={{ disableUnderline: true }}
            inputRef={newItemRef}
            onKeyUp={handleNewItemKeyUp}
            placeholder="Ajouter un objet"
          />
        </ListItemButton>
      </ListItem>
      <Button onClick={saveGroceryList}>Save List</Button>
    </List>
  );
  
}
