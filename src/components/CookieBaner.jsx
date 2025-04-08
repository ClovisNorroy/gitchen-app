import { Box } from "@mui/material";
import { useState } from "react";

export default function CookieBanner(){
    const [acceptedCookies, setacceptedCookies] = useState(false);

    function acceptCookie(){
        localStorage.setItem('cookiesAccepted', 'true');
        setacceptedCookies(true);
    }

    const isCookieAccepted = localStorage.getItem('cookiesAccepted');

    if(acceptedCookies || isCookieAccepted){
        return null;
    }

    return(
        <Box className="cookie-banner" bgcolor="primary.main" sx={{ display: 'flex', bottom: 0, position: "fixed", width: '100%'}}>
            <p>Ce site utilise des cookies pour améliorer votre expérience</p>
            <Box sx={{ display: 'flex', flexDirection: "column" ,justifyContent: 'center'}}>
            <button onClick={acceptCookie} style={{marginLeft: 25, height: 25}}>Je comprends</button>
            </Box>
        </Box>
    );
}