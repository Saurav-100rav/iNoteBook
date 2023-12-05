import { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
const ProtectedRoutes = ({isAuthenticated,children}) => {
    const navigate = useNavigate();
    console.log(isAuthenticated,children);
    useEffect(()=>{
        if (!isAuthenticated) {
            // return 
            navigate("/login");
         }
    },[])
    //     if (!isAuthenticated) {
    //      return navigate("/login");
    //   }
    
      return children ;
  
}

export default ProtectedRoutes