import { CheckBoxOutlineBlank } from '@mui/icons-material';
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { LoginContext } from '../store/login-context';
import GroceryItem from './GroceryItem';

export default function GroceryList() {

  const [groceryList, setGroceryList] = useState([]);
  const newItemRef = useRef();
  const { isLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    if(isLoggedIn){
      fetch(import.meta.env.VITE_APP_GITCHEN_API+"/api/grocerylist",{
        credentials: 'include',
        method: 'GET'
      }).then( response => response.json())
      .then( data => {
        setGroceryList(data.length ? data : []);
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
  }, [isLoggedIn]);

  function saveGroceryList(){
    let upToDateGroceryList = groceryList;
    //Save new item if not done already (No blur and no enter pressed)
    if(newItemRef.current.value !== ""){
      upToDateGroceryList = [...groceryList, newItemRef.current.value];
      setGroceryList([...groceryList, newItemRef.current.value]);
      newItemRef.current.value = "";
    }

    if(isLoggedIn){
      console.log(groceryList);
      fetch(import.meta.env.VITE_APP_GITCHEN_API+"/api/grocerylist",{
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

  return (
    <List key="grocery-list" dense sx={{maxHeight: '85vh', overflowY: 'scroll'}}>
      {groceryList.map((item, index) => (
        <GroceryItem
          key={`grocery-item-${index}`}
          index={index}
          item={item}
          handleToggleChecked={handleToggleChecked}
          handleItemChange={handleItemChange}
        />
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
      <Button onClick={saveGroceryList}>Enregister la liste</Button>
    </List>
  );
  
}
