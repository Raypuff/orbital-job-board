import { useContext } from "react";

const NotifContext = React.createContext();

export function useNotif() {
    return useContext(NotifContext);
}

export function NotifProvider({children}) {

    async function getNotifsByUser(email) {
        
    } 

    const value = {}
 
    return (<NotifContext.Provider value = {value}>
        {children}</NotifContext.Provider>)
}