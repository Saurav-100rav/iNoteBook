import React from 'react'
import {useContext,useEffect} from 'react'
import { NoteContext } from '../../context/NoteContext'
import axios from 'axios'
const Homepage = () => {
    const user = useContext(NoteContext);
    // setTimeout(()=>{
    //     alert("name changed...")
    //     user.setUser("100rav");
    // },5000)
    useEffect(() => {
      //   if (isAuthenticated === false) {
      //       console.log(isAuthenticated);
      //     navigate("/login");
      //   }
      // }, [isAuthenticated]);
        getTempData();
      },[])
      const getTempData = async()=>{
        try {
          const token =  localStorage.getItem('token');
          const res = await axios.get("https://inotebook-backend-xi93.onrender.com/api/v1/notes/getallTasks",
          { withCredentials: true },
          {token}
          );
          console.log("All Notes = ",res);
        } catch (error) {
          console.log(error);
        }
      }
  return (
    <div>
        Homepage : {user.user}
    </div>
  )
}

export default Homepage