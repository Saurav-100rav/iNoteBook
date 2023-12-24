import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../Loader/Loading";
import axios from "axios"
import "./profile.css";

const Profile = ({ history }) => {

  const navigate = useNavigate();
  const { error, status , isAuthenticated,user } = useSelector((state) => state.User );
  
  useEffect(() => {
  //   if (isAuthenticated === false) {
  //       console.log(isAuthenticated);
  //     navigate("/login");
  //   }
  // }, [isAuthenticated]);
    getTempData();
  },[])
  const getTempData = async()=>{
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get("https://inotebook-backend-xi93.onrender.com/api/v1/notes/getallTasks",
      {
        headers: {
            "token": token,
        },
    },
      { withCredentials: true });
      console.log("All Notes = ",res);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {status==="loading" ? (
        <Loading />
      ) : (
        <>
          {`${user?.name}'s Profile`} 
          <div className="profileContainer">
            <div>
                    <h1>My Profile</h1>
                    {isAuthenticated}
                    {/* <img src={user?.avatar?.url} alt={user?.name} /> */}
                    {/* <Link to="/me/update">Edit Profile</Link> */}
            </div>

            <div className="profile-info">
                    <div className="user-name">
                      <h4>Full Name</h4>
                      <p>{user?.name}</p>
                    </div>
                    <div className="user-email">
                      <h4>Email</h4>
                      <p>{user?.email}</p>
                    </div>
                    <div className="user-joining">
                      <h4>Joined On</h4>
                      <p>{String(user?.createdAt).substr(0, 10)}</p>
                    </div>

                    {/* <div>
                      <Link to="/orders">My Orders</Link>
                      <Link to="/password/update">Change Password</Link>
                    </div> */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;