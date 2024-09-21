import { v4 as uuidv4  } from 'uuid';

/** check in localstorage if the connection is not expired 
 * @returns {boolean}
*/
export function checkUserIsLogged(){
    return localStorage.getItem("lastConnectionTime") &&
    new Date().getTime() < parseInt(localStorage.getItem("lastConnectionTime"))+import.meta.env.VITE_APP_CONNECTION_EXPIRATION_TIME ;
};

/** Generate unique ID for list keys
 * @param {int} numberOfKeys number of keys to generate
 * @returns {Array.<String>}
 */
export function makeListKeys(numberOfKeys){
    let listKeys = Array();
    for (let i = 0; i<numberOfKeys; i++){
        listKeys.push(uuidv4());
    }
    return listKeys;
}