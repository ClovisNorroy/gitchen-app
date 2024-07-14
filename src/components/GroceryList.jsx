import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  TextField,
} from "@mui/material";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay, MouseSensor } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CheckBoxOutlineBlank } from '@mui/icons-material';
import { useContext, useEffect, useRef, useState } from "react";
import { LoginContext } from '../store/login-context';
import GroceryItem from './GroceryItem';

export default function GroceryList({initialData}) {
  const [groceryList, setGroceryList] = useState(initialData);
  const newItemRef = useRef();
  const { isLoggedIn } = useContext(LoginContext);
  const autoSaveTimeoutRef = useRef(null);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint:{
      distance: 10
    }
  })

  const sensors = useSensors(
    //useSensor(PointerSensor),
    mouseSensor,
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  useEffect( () => {
    if(groceryList )
      saveGroceryList();
  }, [groceryList])

  function saveGroceryList(){

    if(autoSaveTimeoutRef.current){
      clearTimeout(autoSaveTimeoutRef.current);
      autoSaveTimeoutRef.current = null;
    }
    const upToDateGroceryList = [...groceryList];
    autoSaveTimeoutRef.current = setTimeout( () =>{
      
      //Save new item if not done already (No blur and no enter pressed)
      if(newItemRef.current.value !== ""){
        upToDateGroceryList = [...upToDateGroceryList, { id:upToDateGroceryList.length+1, item:newItemRef.current.value}];
        setGroceryList(upToDateGroceryList);
        newItemRef.current.value = "";
      }
  
      if(isLoggedIn){
        fetch(import.meta.env.VITE_APP_GITCHEN_API+"/api/grocerylist",{
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify(upToDateGroceryList.map(itemObject => itemObject.item))
        }).then( response => {
          console.log(response.text());
        });
      }else{
        localStorage.setItem("groceryList", JSON.stringify(upToDateGroceryList));
      }
    }, 2000);
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

  function handleToggleChecked(itemIdToRemove) {
    const upToDateGroceryList = [...groceryList];
    const indexToRemove = upToDateGroceryList.findIndex((item) => item.id === itemIdToRemove);
    setGroceryList(upToDateGroceryList.toSpliced(indexToRemove, 1));
  }

  function handleNewItemKeyUp(event) {
    if (event.key === "Enter") {
      setGroceryList([...groceryList, {id: groceryList.length+1 , item:newItemRef.current.value}]);
      newItemRef.current.value = "";
    }
  }

  function handleDragEnd(event){
    const {active, over} = event;

    if(active.id !== over.id){
      setGroceryList( groceryList => {
        const oldIndex = groceryList.map(item => item.id).indexOf(active.id);
        const newIndex = groceryList.map(item => item.id).indexOf(over.id);
        return arrayMove(groceryList, oldIndex, newIndex);
      })
    }
  }

  return (
    <List key="grocery-list" dense sx={{maxHeight: '85vh', overflowY: 'scroll', overflowX: 'unset'}}>
      {groceryList &&    <DndContext
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
          <DragOverlay>
          </DragOverlay>
      </DndContext>}
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
    </List>
  );
  
}
