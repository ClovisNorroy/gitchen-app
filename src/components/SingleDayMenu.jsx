import { TableCell, TextField } from "@mui/material";
import { useState } from "react";

export default function SingleDayMenu({initMeal, onMealChange, dayNumber, lunchOrDiner}){
    const id = lunchOrDiner+'_'+dayNumber
    const [meal, setMeal] = useState(initMeal);

    return (
        <TableCell key={"tableCell_"+id}>
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