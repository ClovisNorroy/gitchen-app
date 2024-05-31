export function isLoggedIn(){
    return localStorage.getItem("lastConnectionTime") &&
    new Date().getTime() < parseInt(localStorage.getItem("lastConnectionTime"))+import.meta.env.VITE_APP_CONNECTION_EXPIRATION_TIME ;
};