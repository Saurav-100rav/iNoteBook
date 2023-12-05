import axios from "axios"
const url = "http://localhost:5000/api/v1"
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