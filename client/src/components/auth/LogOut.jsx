import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
// import { logout } from '../../store/userSlice';
import { logout } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';
const LogOut = () => {
    const dispatch = useDispatch();
    const {user,isAuthenticated,status} = useSelector((state)=>state.User);
    const navigate = useNavigate();
    useEffect(()=>{
        // dispatch(logout());
        removeUser();
    },[])
    const removeUser = ()=>{
      if(!isAuthenticated) {
        navigate("/login");
      }
      
      localStorage.clear();
      dispatch(logout());
      alert("LogOut successfully...");
      navigate("/login");
    }
  return (
    <div>LogOut</div>
  )
}

export default LogOut