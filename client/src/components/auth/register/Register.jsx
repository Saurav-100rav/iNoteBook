import React , {useState} from 'react'
// import {addcontactapi} from '../api'; 
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import "./register.css"

const Register = () => {
    const obj = {
        'name' : '',
        'email' : '',
        'password' : '',
        'cpassword' : ''
    }
    const [inputvalue,setinputvalue] = useState(obj);
    const navigate = useNavigate();
    const TakeInputValue = (e)=>{
        const input_type = e.target.name;
        const val = e.target.value;
        setinputvalue( {...inputvalue,[input_type]:val});
    }
    const RegisterUser = async(e)=>{
        e.preventDefault();
        const { name,email,password,cpassword} = inputvalue;
        if(name==="" || email==="" || password==="" || cpassword==="")
             alert("Please Enter All Fields...");
        else if(name && email && password && cpassword){
           if(password===cpassword){
             try {
            //    const res = await axios.post("https://login-signup-69ih.onrender.com/register",input);
               const res = await axios.post("http://localhost:5000/api/v1/auth/createUser",inputvalue);
               console.log(res)
               if(!res.data.success){
                 alert("This email is already registered in our database...\nPlease signup with a new email..");
                 setinputvalue(obj);
               }
               else{
                 alert("congrats,User added Successfully")
                 navigate("/login")
               }
             } catch (error) {
               console.log("Error while registering User..",error);
             }
   
           }
           else alert("Invalid Input,password not matching..\nPlease Enter Correct Password..")
           
        }
        else alert("invalid input");
        setinputvalue(obj);
     }
   
  return (
    <div className='form'>
          <p>Add User</p>
        <form autoComplete='off' onSubmit={RegisterUser}>

          <div className="inputfield">
            <label htmlFor="name">Full Name</label><br/>
            <input type="text" id='name' onChange={TakeInputValue} name='name' value={inputvalue.name}/><br />
          </div>
          
          <div className="inputfield">
            <label htmlFor="email">Email</label><br/>
            <input type="email" id='email' onChange={TakeInputValue} name='email' value={inputvalue.email}/><br />
          </div>

          <div className="inputfield">
            <label htmlFor="username">Password</label><br />
            <input type="password" id='password' onChange={TakeInputValue} name='password' value={inputvalue.password}/><br />
          </div>

          <div className="inputfield">
            <label htmlFor="phone">Confirm Password</label><br/>
            <input type="password" id='cpassword' onChange={TakeInputValue} name='cpassword' value={inputvalue.cpassword}/><br />
          </div>
          <input type="submit" value="submit" className='submit-button'/>
          <p className='login-link'>Already an user ? <Link to="/login">Login</Link> </p>
          {/* <Link to="/login">Login</Link> */}

        </form>
    </div>
    
  )
}

export default Register