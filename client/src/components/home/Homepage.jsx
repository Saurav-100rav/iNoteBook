import React from 'react'
// import {useContext,useEffect} from 'react'
// import { NoteContext } from '../../context/NoteContext'
// import axios from 'axios'
import { useSelector } from 'react-redux'
import "./homepage.css"
import { Link } from 'react-router-dom'
const Homepage = () => {
    // const user = useContext(NoteContext);
    const {user,isAuthenticated} = useSelector((state)=>state.User)
    // setTimeout(()=>{
    //     alert("name changed...")
    //     user.setUser("100rav");
    // },5000)
  
  return (
    <div>
        <div className="home-container">
          <div className="welcome-section">
            <h1>{isAuthenticated ? `Welcome back, ${user?.name}!` : 'Welcome to iNotebook'}</h1>
            <p>Your personal note-taking application</p>
          </div>

      {isAuthenticated ? (
          <div className="all-links">
            <div className="link">
              <p>View All Notes Here </p>
              <Link to="/all"><button>View All Notes</button></Link>
            </div>

            <div className="link">
              <p>Add new note Here </p>
              <Link to="/add"><button>Add New Note</button></Link>
            </div>

            <div className="link">
              <p>See Your Profile Here </p>
              <Link to="/profile"><button>see Your Profile</button></Link>
            </div>
          </div>
          
      ) : (
        <div className="get-started">
          <Link to="/register">
            <button>Get Started</button>
          </Link>
        </div>
      )}

      {/* Add additional sections like Recent Notes, Featured Note, etc. as needed */}

      
    </div>
    </div>
  )
}

export default Homepage