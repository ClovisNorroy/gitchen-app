import { TableCell, TextField } from "@mui/material";
import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";

export default function SingleDayMenu({meal, onMealChange, dayNumber, lunchOrDiner}){
    const id = lunchOrDiner+'_'+dayNumber;
    const {setNodeRef} = useDroppable({
      id: id
    });

    return (
        <TableCell key={"tableCell_"+id} ref={setNodeRef}>
        <TextField
            multiline
            rows={2}
            fullWidth
            inputProps={{maxLength: 50}}
            onChange={(event) => {onMealChange(event, dayNumber); setMeal(event.target.value)}}
            value={meal}
            onFocus={event => event.target.select()}
          />
        </TableCell>
    );
}