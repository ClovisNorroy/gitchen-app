import {Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import Droppable from "./Droppable";

export default function Menu({meals, handleMealChange, resetMenu}){

    const weekHeader = [<TableCell key={"weekHeader_day_0"}></TableCell>];
    for( let day = 1 ; day <= 7; day++){
        weekHeader.push(<TableCell key={"weekHeader_day_"+day}>{'Jour '+ day}</TableCell>);
    }

    return (
        <Box>
        <Table>
        <TableHead>
            <TableRow>
                {weekHeader}
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
            <TableCell>Midi</TableCell>
            {
                meals.slice(0, 7).map( (meal, mealNumber) => {
                    return (
                      <Droppable key={"droppable" + mealNumber} id={mealNumber}>
                          <TextField
                            multiline
                            rows={2}
                            fullWidth
                            inputProps={{ maxLength: 50 }}
                            onChange={(event) => {
                                handleMealChange(event.target.value, mealNumber);
                            }}
                            value={meal}
                            onFocus={(event) => event.target.select()}
                          />
                      </Droppable>
                    );
                })
            }
            </TableRow>
            <TableRow>
                <TableCell>Soir</TableCell>
                {
                meals.slice(7, 14).map( (meal, mealNumber) => {
                    return(
                        <Droppable key={"droppable" + mealNumber+7} id={mealNumber+7}>
                        <TableCell key={"tableCell_" + mealNumber+7} >
                          <TextField
                            multiline
                            rows={2}
                            fullWidth
                            inputProps={{ maxLength: 50 }}
                            onChange={(event) => {
                                handleMealChange(event.target.value, mealNumber+7);
                            }}
                            value={meal}
                            onFocus={(event) => event.target.select()}
                          />
                        </TableCell>
                      </Droppable>
                    )
                })
            }
            </TableRow>
        </TableBody>
    </Table>
    <Button onClick={resetMenu}>Réinitialiser</Button>
    </Box>
    )
}