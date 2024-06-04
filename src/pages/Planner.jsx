import { TableContainer, Box, Grid, Typography, Container } from "@mui/material";
import SingleWeekMenu from "../components/SingleWeekMenu";
import GroceryList from "../components/GroceryList";

export default function Planner(){ 
    return(
        <Grid container>
            <Grid item xs={10}>
                <TableContainer>
                <SingleWeekMenu key={"weekMenu_1"} weekNumber={1}/>
                </TableContainer>
            </Grid>
            <Grid item xs={2} borderLeft="solid black 2px" maxHeight='90vh'>             
                <Typography textAlign='center' variant="h5" marginBottom='20px'
                >Liste des courses</Typography>
                <GroceryList/>
            </Grid>
        </Grid>
    );
}