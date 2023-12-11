import React, { useEffect ,useState} from 'react'
import axios from 'axios';
import "./allnotes.css"
import { Link } from 'react-router-dom';
import Loading from '../../Loader/Loading';
const AllNotes = () => {
    const [flag,setFlag]   = useState(true);
    useEffect(()=>{
        fetchAllNotes();
    },[flag]);
    const [loading,setLoading] = useState(false);
    const [notes,setNotes] = useState([]);
    
    const fetchAllNotes = async()=>{
        try {
            setLoading(true);
            const res = await axios.get("https://inotebook-backend-xi93.onrender.com/api/v1/notes/getallTasks",{ withCredentials: true });
            console.log("All Notes = ",res);
            if(res.data.success){
                setLoading(false);
                setNotes(res.data.message)
            } 
        } catch (error) {
            setLoading(false);
            console.error("Error while fetching all Notes.",error.message)
        }
    }
    const deleteNote = async(id)=>{
        try {
            setLoading(true);
            const res = await axios.delete(`https://inotebook-backend-xi93.onrender.com/api/v1/notes/getsinglenote/${id}`,{ withCredentials: true });
            console.log("After deleting = ",res);
            if(res.data.success){
                setLoading(false);
                alert(res.data.message);
                setFlag(!flag);
            } 
        } catch (error) {
            setLoading(false);
            console.error("Error while deleting Note.",error.message)
        }
    }
  return (
    <>
    {
        loading ? <Loading/> :
    <div class="notes-container">
        {
            notes?.map((note)=>(
                <div class="note-card" key={note._id}>
                    <div class="note-header">
                        {note.title}
                    </div>

                    <div class="note-content">
                        <p>{note.description}</p>
                    </div>
                    
                    <div class="note-buttons">
                        <button class="edit-btn" >
                            <Link to = {`/edit/${note._id}`}>Edit</Link>
                        </button>
                        <button class="delete-btn" onClick={()=>deleteNote(note._id)}>Delete</button>
                    </div>
                </div>
            ))
        }
    </div>
    }
    </>
  )
}

export default AllNotes