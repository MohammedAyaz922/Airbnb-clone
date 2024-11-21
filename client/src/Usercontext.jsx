import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const userContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const[ready,setReady] = useState(false);

    useEffect( ()=>{
        if(!user){
       const data =  axios.get("/profile").then(({data})=>{
        setUser(data);
       })
       setUser(data);
        }
    },[])
    return (
        <userContext.Provider value={{ user, setUser,ready }}>
            {children}
        </userContext.Provider>
    );
}
