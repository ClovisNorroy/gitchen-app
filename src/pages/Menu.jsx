import { TableContainer } from "@mui/material";
import SingleWeekMenu from "../components/SingleWeekMenu";

function Menu(){ 
    return(
        <TableContainer>
            <SingleWeekMenu key={"weekMenu_1"} weekNumber={1}/>
        </TableContainer>
    );
}

export default Menu;