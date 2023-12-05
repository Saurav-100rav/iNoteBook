import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import {NoteState} from './context/NoteContext';
import Homepage from './components/home/Homepage';
import AddNote from './components/home/notes/AddNote';
import AllNotes from './components/home/notes/AllNotes';
import Login from './components/auth/Login';
import Register from './components/auth/register/Register';
import { isLoggedIn } from './store/userSlice';
import Profile from './components/profile/Profile';
import ProtectedRoutes from "./components/auth/ProtectedRoutes"
import { Navbar } from './components/navbar/Navbar';
import LogOut from './components/auth/LogOut';
import EditNote from './components/home/notes/EditNote';
import Loading from './components/Loader/Loading';

function App() {
    const dispatch = useDispatch();
    const {user,isAuthenticated,status} = useSelector((state)=>state.User);
    useEffect(()=>{
        dispatch(isLoggedIn());
    },[])
  return (
      <NoteState>
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Homepage/>} />
            {/* <Route path='/add' element={<AddNote/>} /> */}
            {/* <Route path='/all' element={<AllNotes/>} /> */}
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route  path="/add"
                  element={
                    <ProtectedRoutes isAuthenticated={isAuthenticated}>
                      <AddNote />
                    </ProtectedRoutes>
                    }
              />
            <Route  path="/all"
                  element={
                    <ProtectedRoutes isAuthenticated={isAuthenticated}>
                      <AllNotes />
                    </ProtectedRoutes>
                    }
              />
            <Route  path="/profile"
                  element={
                    <ProtectedRoutes isAuthenticated={isAuthenticated}>
                      <Profile />
                    </ProtectedRoutes>
                    }
              />
              {/* <Route  path="/profile"
                  element={
                    status ==='loading'? <Loading/> :
                    <ProtectedRoutes isAuthenticated={isAuthenticated}>
                      <Profile />
                    </ProtectedRoutes>
                    }
              /> */}
          <Route  path="/logout"
                  element={
                    <ProtectedRoutes isAuthenticated={isAuthenticated}>
                      <LogOut />
                    </ProtectedRoutes>
                    }
              />
          <Route  path="/edit/:id"
                  element={
                    <ProtectedRoutes isAuthenticated={isAuthenticated}>
                      <EditNote />
                    </ProtectedRoutes>
                    }
              />    
          </Routes>
        </Router>
      </NoteState>
  );
}

export default App;
