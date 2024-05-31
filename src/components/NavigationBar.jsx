import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { useEffect, useState } from "react";
import CloudOffIcon from '@mui/icons-material/CloudOff';

function NavigationBar(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        const isLoggedIn = localStorage.getItem("lastConnectionTime") && 
            new Date().getTime() < parseInt(localStorage.getItem("lastConnectionTime"))+import.meta.env.REACT_APP_CONNECTION_EXPIRATION_TIME ;
        setIsLoggedIn(isLoggedIn);
    }, []);

    function logout(){
        fetch(import.meta.env.REACT_APP_GITCHEN_API+"/api/logout", {
            credentials: "include",
            method: "POST"
        })
        .then(response => 
            {
                console.log(response.text());
                localStorage.removeItem("lastConnectionTime");
                window.location.reload();
            });
        }

    return(
        <Box sx={{ flexGrow: 1}}>
            <AppBar>
                <Toolbar id="navbar">
                    <NavLink to="/">
                        <Button variant="contained" color="secondary">Menu</Button>
                    </NavLink>
                    <div className="divider"/>
                    <Box sx={{width: 300}} className={isLoggedIn ? 'hidden-button' : undefined}>
                        <Typography><CloudOffIcon/>  Vous êtes hors ligne</Typography>
                    </Box>
                    <NavLink to="/login" className={isLoggedIn ? 'hidden-button' : undefined}>
                        <Button variant="contained" color="secondary">Connexion</Button>
                    </NavLink >
                    <Box className={isLoggedIn ? undefined : 'hidden-button'}>
                        <Button variant="contained" color="secondary" onClick={logout} id="logout-button">Déconnexion</Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default NavigationBar;