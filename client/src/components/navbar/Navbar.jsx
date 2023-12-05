import React, { useState,useEffect } from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import "./navbar.css"
export const Navbar = ()=>{

    const {isAuthenticated} = useSelector((state)=>state.User);
    console.log(isAuthenticated)

    const [linksClass,setLinksClass]=useState("nav-links");
    const [hideClass,setHideClass]=useState("close-menu");
    const showLinks = ()=>{
        setLinksClass("nav-links-active");
        setHideClass("close-menu-active");
    }
    const hideLinks = ()=>{
        console.log("clicked");
        setLinksClass("nav-links");
        setHideClass("close-menu");
    }
    return (
        <div className="navbar">
            <div className="logo">
                <h3>INOTEBOOK</h3>
            </div>
            <ul className={linksClass}>    
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/profile'}>Profile</Link></li>
                <li><Link to={'/all'}>Notes</Link></li>
                <li><Link to={'/add'}>Add Note</Link></li>

                {isAuthenticated===false ? <li><Link to={'/login'}>Login</Link></li> : "" }
                {isAuthenticated===false ? <li><Link to={'/register'}>Register</Link></li>: "" }
                {isAuthenticated ? <li><Link to={'/logout'}>Log out</Link></li> : "" }                       
                                        
            </ul>
    
            <div className="burger-menu" onClick={showLinks}>&#9776;</div>
            <div className={hideClass}  onClick={hideLinks}>&#10006;</div>
        </div>
    );
}




