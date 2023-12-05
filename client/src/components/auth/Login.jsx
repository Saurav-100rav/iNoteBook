import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import "./login.css"
import { loginUser } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import Loading from "../Loader/Loading"
const Login = () => {
  const dispatch = useDispatch();
  const {user,isAuthenticated,status} = useSelector((state)=>state.User);
  const navigate = useNavigate();
  useEffect(()=>{
      console.log(isAuthenticated);
      if(isAuthenticated)
        navigate("/profile")
  },[isAuthenticated]);
  const obj = {
    email : "",
    password : ""
  }
  const [credentials,setCredentials] = useState(obj);
  const getCredentials = (e)=>{
    const input_type = e.target.name;
    const val = e.target.value;
    setCredentials( {...credentials,[input_type]:val});
  }
  const loginRequest = (e)=>{
    e.preventDefault();
    dispatch(loginUser(credentials));
  }
  return (
    <>
    {status === 'loading' ? <Loading/> :
    <div className="login-container"> 
        <h2>Login</h2>
        <form className="login-form" onSubmit={loginRequest}>
            <div className="login-fields">
                {/* <label htmlFor="username">Username:</label> */}
                <input type="email" name="email" placeholder="Enter your email" onChange={getCredentials} 
                  value={credentials.email}  />
            </div>

            <div className="login-fields">
                {/* <label htmlFor="password">Password:</label> */}
                <input type="password" name="password" placeholder="Enter your password"
                  onChange={getCredentials} value={credentials.password}/>
            </div>

            <button type="submit" className="login-btn">Login</button>
        </form>
    </div>
  }
  </>
  )
}

export default Login