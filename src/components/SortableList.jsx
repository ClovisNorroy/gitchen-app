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
import { useEffect, useRef, useState } from "react";

import SortableItem from './SortableItem';

export default function SortableList({sortableList, setSortableList, saveList}) {
  //const [sortableList, setSortableList] = useState(initialData.length ? initialData.map((item, index) => {return {id: index+1, item:item}}) : []);
  const newItemRef = useRef();
  console.log(sortableList);
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
/*     if(sortableList )
      saveList(sortableList, setSortableList, newItemRef); */
  }, [sortableList])

  function handleItemChange(newValue, indexToChange) {
    const updatedSortableList = [
      ...sortableList.map((sortableItem, sortableIndex) => {
        if (sortableIndex+1 === indexToChange) {
          return {id:sortableItem.id, item:newValue};
        } else return sortableItem;
      }),
    ];
    setSortableList(updatedSortableList);
  }

  function handleToggleChecked(itemIdToRemove) {
    const upToDateSortableList = [...sortableList];
    const indexToRemove = upToDateSortableList.findIndex((item) => item.id === itemIdToRemove);
    setSortableList(upToDateSortableList.toSpliced(indexToRemove, 1));
  }

  function handleNewItemKeyUp(event) {
    if (event.key === "Enter") {
      setSortableList([...sortableList, {id: sortableList.length+1 , item:newItemRef.current.value}]);
      newItemRef.current.value = "";
    }
  }

  function handleNewItemOnBlur(){
    if(newItemRef.current.value != ""){
      setSortableList([...sortableList, {id: sortableList.length+1 , item:newItemRef.current.value}]);
      newItemRef.current.value = "";
    }
  }

  function handleDragEnd(event){
    const {active, over} = event;

    if(active.id !== over.id){
      setSortableList( sortableList => {
        const oldIndex = sortableList.map(item => item.id).indexOf(active.id);
        const newIndex = sortableList.map(item => item.id).indexOf(over.id);
        return arrayMove(sortableList, oldIndex, newIndex);
      })
    }
  }

  return (
    <List key="sortable-list" dense sx={{maxHeight: '70vh', overflowY: 'scroll', overflowX: 'unset'}}>
      {sortableList &&    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}>
        <SortableContext
          items={sortableList}
          strategy={verticalListSortingStrategy}>
          {sortableList.map((item) => (
            <SortableItem
              key={`sortable-item-${item.id}`}
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
            onBlur={handleNewItemOnBlur}
            placeholder="Ajouter un objet"
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
  
}
