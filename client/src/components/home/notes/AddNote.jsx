import React, { useState } from 'react'
import "./addNote.css"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import Loading from '../../Loader/Loading'

const AddNote = () => {
    const navigate = useNavigate();
    const obj = {
        title : "",
        description : "",
        tag : ""
    }
    const [inputValue,setInputValue] = useState(obj);
    const [loading,setLoading] = useState(false);
    const getInputValue = (e)=>{
        setInputValue({...inputValue,[e.target.name]:e.target.value})
    }
    const submitHandler = async(e)=>{
        e.preventDefault();
        try {   
            setLoading(true);
            const res = await axios.post("http://localhost:5000/api/v1/notes/addTask",inputValue,{ withCredentials: true });
            console.log(res);
            setLoading(false);
            if(res.data.success){
                alert(res.data.message);
                navigate("/all");
            }
        } catch (error) {
            setLoading(false);
            console.log("Error while making new Note.",error)
        }
    }
  return (
    <div class="note-form">
        {   loading ? <Loading/> : 
        <form onSubmit={submitHandler}>
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" placeholder="Enter a title" onChange={getInputValue}
                value={inputValue.title}/>

            <label for="description">Description:</label>
            <textarea id="description" name="description" placeholder="Enter a description" onChange={getInputValue}
                value={inputValue.description}></textarea>

            <label for="tag">Tag:</label>
            <input type="text" id="tag" name="tag" placeholder="Enter tags, separated by commas" onChange={getInputValue}
                value={inputValue.tag}/>

            <button type="submit">Save Note</button>
        </form>
        }
    </div>
  )
}

export default AddNote