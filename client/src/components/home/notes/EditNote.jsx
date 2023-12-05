import React, { useEffect, useState } from 'react'
import "./addNote.css"
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import { findSingleNote } from '../../api'


const EditNote = () => {
    const {id} = useParams();
    // console.log(id);
    const navigate = useNavigate(); 
    useEffect(()=>{
        getSingleNoteData();
    },[]);

    const getSingleNoteData = async()=>{
        try {
            const response = await findSingleNote(id);
            console.log(response)
            if(response.data.success) {
                setInputValue(response.data.message);
            }
            // alert(response.data.message.title);
            else
                alert("some problem")
        } catch (error) {
            console.log("error while fetching single user data..",error);
        }
    }
    const obj = {
        title : "",
        description : "",
        tag : ""
    }
    const [inputValue,setInputValue] = useState(obj);

    const getInputValue = (e)=>{
        setInputValue({...inputValue,[e.target.name]:e.target.value})
    }
    const submitHandler = async(e)=>{
        e.preventDefault();
        try {   
            const res = await axios.put(`http://localhost:5000/api/v1/notes/getsinglenote/${id}`,inputValue,{ withCredentials: true });
            console.log(res);
            if(res.data.success){
                // alert("update successful");
                navigate("/all");
            }
        } catch (error) {
            console.log("Error while making new Note.",error)
        }
    }
  return (
    <div className="note-form">
        <form onSubmit={submitHandler}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" placeholder="Enter a title" onChange={getInputValue}
                value={inputValue.title}/>

            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" placeholder="Enter a description" onChange={getInputValue}
                value={inputValue.description}></textarea>

            <label htmlFor="tag">Tag:</label>
            <input type="text" id="tag" name="tag" placeholder="Enter tags, separated by commas" onChange={getInputValue}
                value={inputValue.tag}/>

            <button type="submit">Save Note</button>
        </form>
    </div>
  )
}

export default EditNote