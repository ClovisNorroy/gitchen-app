import { TableCell, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function SingleDayMenu(props){

    const [meal, setMeal] = useState(props.meal);

    useEffect( () => {
        const delayMenuUpdate = setTimeout( () => {
/*             fetch(process.REACT_APP_GITCHEN_API+"/menu", {
                methods: "POST",
                data: {
                    day: props.dayNumber,
                    meal: meal
                }
            }); */
        }, 3000)

        return () => clearTimeout(delayMenuUpdate)
    }, [meal])

    return(
        <TableCell>
            <TextField
            multiline
            rows={2}
            fullWidth
            inputProps={{maxLength: 50}}
            onChange={ event => setMeal(event.target.value)}
            value={meal}
            />
        </TableCell>
    )
}

export default SingleDayMenu;