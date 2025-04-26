import { createContext, useEffect, useState} from "react";
import { checkUserIsLogged } from "../assets/helperFunctions";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogActions, DialogTitle, DialogContent, Button } from "@mui/material";

export const LoginContext = createContext({
    isLoggedIn: false,
    loginSuccessfull: () => {},
    handleLogout: () => {}
})

export default function LoginContextProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(checkUserIsLogged()){
            setIsLoggedIn(true);
            //refreshToken();
        }
    }, [])

    function handleLoginSuccessfull(){
        localStorage.setItem("lastConnectionTime", new Date().getTime());
        setIsLoggedIn(true);
    }

    async function handleLogout(){
        const response = await fetch(import.meta.env.VITE_APP_GITCHEN_API+"/api/logout", {
            credentials: "include",
            method: "POST"
        });
        if(response.status === 204){
            localStorage.removeItem("lastConnectionTime");
            setIsLoggedIn(false);
            navigate('/');
        }else{
            setIsDialogOpen(true);
        }
    }

    async function refreshToken(){
        const response = await fetch(import.meta.env.VITE_APP_GITCHEN_API+"/token/refresh",
            {
                credentials: "include",
                method: "POST"
            }
        );
        console.log(response.status);
        if(response.status === 204){
            localStorage.setItem("lastConnectionTime", new Date().getTime());
        }
    }

    const contextValue = {
        isLoggedIn: isLoggedIn,
        loginSuccessfull: handleLoginSuccessfull,
        handleLogout: handleLogout
    }

    return <LoginContext.Provider value={contextValue}>
        <Dialog open={isDialogOpen}>
            <DialogTitle>La déconnexion a échouer</DialogTitle>
            <DialogContent>Veuillez réessayer plus tard</DialogContent>
            <DialogActions>
                <Button onClick={ () => {setIsDialogOpen(false) ; }}>Fermer</Button>
            </DialogActions>
        </Dialog>
        {children}
    </LoginContext.Provider>
}