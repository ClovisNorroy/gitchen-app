import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from './Home.module.css';

export default function Home(){
    return(
    <Box className={styles.background}>
        <Box>
            <Typography className={styles.title}>Bienvenue sur Gitchen</Typography>
            <Typography color="white">Plannifiez votre menu de la semaine et la liste des courses</Typography>
        </Box>
        <Box>
            <Typography>Vous pouvez commencer à planifier <NavLink to="/planner">ici</NavLink></Typography>
            <Typography> Pour vous créer un compte, c'est <NavLink to="/register">ici</NavLink></Typography>
        </Box>
    </Box>
    )
}