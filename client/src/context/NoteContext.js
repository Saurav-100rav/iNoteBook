import {useState, createContext} from "react";
const NoteContext = createContext();


const NoteState = (props)=>{
    const [user,setUser] = useState('Saurav');
    return (
        <NoteContext.Provider value={{user,setUser}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export {NoteState,NoteContext};