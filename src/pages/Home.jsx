import { Box, Button, Container, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import styles from './Home.module.css';

export default function Home(){
    return(
    <Container>
        <Box className={styles.title}>
            <Typography variant="h1" textAlign="center">Bienvenue sur Gitchen</Typography>
            <Typography variant="h5" textAlign="center">Plannifiez votre menu de la semaine et la liste des courses</Typography>
        </Box>
        <Box>
            <Typography>Pour commencer à utliser l'application, créez vous un compte </Typography>
            <Button variant="contained"><Link className={styles["link-button"]} to="/register">Créer un compte</Link></Button>
            <Typography> Ou vous pouvez toujours tester l'interface hors connexion</Typography>
            <Button variant="contained"><Link className={styles["link-button"]} to="/planner">Tester hors connexion</Link></Button>
        </Box>
    </Container>
    )
}