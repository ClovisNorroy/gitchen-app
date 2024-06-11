import { createContext, useEffect, useReducer, useState } from "react";
import { checkUserIsLogged } from "../assets/helperFunctions";

export const LoginContext = createContext({
    isLoggedIn: false,
    loginSuccessfull: () => {},
    logoutSuccessfull: () => {}
})

export default function LoginContextProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if(checkUserIsLogged()){
            setIsLoggedIn(true);
        }
    }, [])

    function handleLoginSuccessfull(){
        localStorage.setItem("lastConnectionTime", new Date().getTime());
        setIsLoggedIn(true);
    }

    function handleLogoutSuccessfull(){
        localStorage.removeItem("lastConnectionTime");
        setIsLoggedIn(false);
    }

    async function refreshToken(){
        const response = await fetch(import.meta.env.VITE_APP_GITCHEN_API+"/token/refresh",
            {credentials: "include"}
        );
    }

    const contextValue = {
        isLoggedIn: isLoggedIn,
        loginSuccessfull: handleLoginSuccessfull,
        logoutSuccessfull: handleLogoutSuccessfull
    }

    return <LoginContext.Provider value={contextValue}>
        {children}
    </LoginContext.Provider>
}