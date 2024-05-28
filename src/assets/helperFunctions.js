export function isLoggedIn(){
    return localStorage.getItem("lastConnectionTime") &&
    new Date().getTime() < parseInt(localStorage.getItem("lastConnectionTime"))+process.env.REACT_APP_CONNECTION_EXPIRATION_TIME ;
};