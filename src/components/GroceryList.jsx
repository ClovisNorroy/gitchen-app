import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  TextField,
} from "@mui/material";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CheckBoxOutlineBlank } from '@mui/icons-material';
import { useContext, useEffect, useRef, useState } from "react";
import { LoginContext } from '../store/login-context';
import GroceryItem from './GroceryItem';

export default function GroceryList() {
  const [groceryList, setGroceryList] = useState([{id:1, item:"tomate"}, {id:2, item:"poireaux"}, {id:3, item:"PTT"}, {id:4, item:"steack"}]);
  const newItemRef = useRef();
  const { isLoggedIn } = useContext(LoginContext);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

/*   useEffect(() => {
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
  }, [isLoggedIn]); */

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

  function handleDragEnd(event){
    console.log(event);
    const {active, over} = event;

    if(active.id !== over.id){
      setGroceryList((items) => {
        const oldIndex = items.map(item => item.id).indexOf(active.id);
        const newIndex = items.map(item => item.id).indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <List key="grocery-list" dense sx={{maxHeight: '85vh', overflowY: 'scroll'}}>
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}>
        <SortableContext
          items={groceryList}
          strategy={verticalListSortingStrategy}>
          {groceryList.map((item) => (
            <GroceryItem
              key={`grocery-item-${item.id}`}
              index={item.id}
              item={item.item}
              handleToggleChecked={handleToggleChecked}
              handleItemChange={handleItemChange}
            />
          ))}
          </SortableContext>
      </DndContext>
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
