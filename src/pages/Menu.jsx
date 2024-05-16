import { TableContainer, Box, Grid } from "@mui/material";
import SingleWeekMenu from "../components/SingleWeekMenu";
import GroceryList from "../components/GroceryList";


//TODO: rename page
export default function Menu(){ 
    return(
        <Grid container>
            <Grid item xs={10}>
                <TableContainer>
                <SingleWeekMenu key={"weekMenu_1"} weekNumber={1}/>
                </TableContainer>
            </Grid>
            <Grid item xs={2}>
                <GroceryList/>
            </Grid>
        </Grid>
    );
}