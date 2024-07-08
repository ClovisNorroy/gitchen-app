import { createContext, useEffect, useReducer, useState } from "react";
import { checkUserIsLogged } from "../assets/helperFunctions";

export const LoginContext = createContext({
    isLoggedIn: false,
    loginSuccessfull: () => {},
    handleLogout: () => {}
})

export default function LoginContextProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if(checkUserIsLogged()){
            setIsLoggedIn(true);
            refreshToken();
        }
    }, [])

    function handleLoginSuccessfull(){
        localStorage.setItem("lastConnectionTime", new Date().getTime());
        setIsLoggedIn(true);
    }

    function handleLogout(){
        localStorage.removeItem("lastConnectionTime");
        setIsLoggedIn(false);
    }

    async function refreshToken(){
        const response = await fetch(import.meta.env.VITE_APP_GITCHEN_API+"/token/refresh",
            {
                credentials: "include",
                method: "POST"
            }
        );
        console.log(response.status);
        if(response.status !== 204){
            handleLogout();
        }
    }

    const contextValue = {
        isLoggedIn: isLoggedIn,
        loginSuccessfull: handleLoginSuccessfull,
        handleLogout: handleLogout
    }

    return <LoginContext.Provider value={contextValue}>
        {children}
    </LoginContext.Provider>
}