import axios from "axios"
const url = "https://inotebook-backend-xi93.onrender.com/api/v1"
const findSingleNote = (id) =>{
    try {
        console.log("id = ",id)
        const res = axios.get(`${url}/notes/getsinglenote/${id}`,{withCredentials : true});
        return res;
    } catch (error) {
        return error;
    }
}

export {findSingleNote}