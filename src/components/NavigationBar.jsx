import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { useContext } from "react";
import { LoginContext } from "../store/login-context";

function NavigationBar(){
    const { isLoggedIn, handleLogout } = useContext(LoginContext);

    function logout(){
        fetch(import.meta.env.VITE_APP_GITCHEN_API+"/api/logout", {
            credentials: "include",
            method: "POST"
        })
        .then(response => 
            {
                console.log(response.text());
                handleLogout();
            });
        }

    return(
        <Box sx={{ flexGrow: 1}}>
            <AppBar position='static' sx={{ height: '7%'}}>
                <Toolbar id="navbar" sx={{ marginLeft: 4}}>
                    <NavLink to="/planner">
                        <Button variant="contained" color="secondary">Menu</Button>
                    </NavLink>
                    <NavLink to="/recipes">
                        <Button variant="contained" color="secondary" sx={{ marginLeft: 2 }}>Recettes</Button>
                    </NavLink>
                    <div className="divider"/>
                    <NavLink to="/register" className={isLoggedIn ? 'hidden-button' : undefined} >
                        <Button variant="contained" color="secondary" sx={{ marginRight: 2 }}>Inscription</Button>
                    </NavLink >
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