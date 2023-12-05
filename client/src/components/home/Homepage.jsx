import React from 'react'
import {useContext} from 'react'
import { NoteContext } from '../../context/NoteContext'
const Homepage = () => {
    const user = useContext(NoteContext);
    setTimeout(()=>{
        alert("name changed...")
        user.setUser("100rav");
    },5000)
  return (
    <div>
        Homepage : {user.user}
    </div>
  )
}

export default Homepage