import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Mock API URL (replace with your actual API endpoint)
// const API_URL = 'http://localhost:5000/api/v1';
const API_URL = 'https://inotebook-backend-xi93.onrender.com/api/v1'

// Define an async thunk to fetch products
export const loginUser = createAsyncThunk('loginUser', async (obj) => {
    try {
        const res = await axios.post(`${API_URL}/auth/login`,obj
        ,{ withCredentials: true }
        );
        // if(res.data.msg==="Success") return true;
        // else return false;
        // return res.data.user;
        console.log(res);
        return res;

    
      } catch (error) {
        //   alert("some error while authenticating users identity...");
          console.log("error while getting users identity..",error);
          return error;
      }
});

export const isLoggedIn = createAsyncThunk('isLoggedIn', async (obj) => {
    try {
        // console.log("password is ",obj.password,obj.email)
        const token =  localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/auth/profile`,
        {
          headers: {
              "token": token,
          },
      },
        { withCredentials: true }
        );
        // if(res.data.msg==="Success") return true;
        // else return false;
        // return res.data.user;
        console.log(res);
        return res;

    
      } catch (error) {
        //   alert("some error while authenticating users identity...");
          console.log("error while getting users identity..",error);
          return false;
      }
});
// export const logout = createAsyncThunk('logout', async () => {
//   try {
//       const res = await axios.get(`${API_URL}/auth/logout`,
//       { withCredentials: true }
//       );
//       // if(res.data.msg==="Success") return true;
//       // else return false;
//       // return res.data.user;
//       console.log(res);
//       return res;

  
//     } catch (error) {
//       //   alert("some error while authenticating users identity...");
//         console.log("error while getting users identity..",error);
//         return false;
//     }
// });


const userSlice = createSlice({
    name : "User",
    initialState : {
        user : null,
        isAuthenticated : false,
        status : null,
        error : null
    },
    reducers:{
        // addItem : (state,action)=>{
        //     return [...state,action.payload]
        // },
        // removeItem :(state,action)=>{
        //     return state.filter( (val)=>
        //         val.id !== action.payload.id
        //     )
        // }
        logout : (state,action)=>{
              console.log(state.isAuthenticated);
              state.isAuthenticated = false;
              state.user = null;
              console.log(state.isAuthenticated)
        }

    },
    extraReducers: (builder) => {
        builder
          .addCase(isLoggedIn.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(isLoggedIn.fulfilled, (state, action) => {
            state.status = 'succeeded';
            if(action.payload && action.payload.data.success){
                console.log(action.payload.data.success,action.payload.data.user)
              state.isAuthenticated = true;
              state.user = action.payload.data.user;
            }
            
          })
          .addCase(isLoggedIn.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(loginUser.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            console.log(action.payload);
            // console.log(action.payload.response.data.success);
            if(action.payload.response?.data?.success===false){
              console.log(action.payload.response.data.success)
            state.status = 'failed';  
            state.isAuthenticated = false;
            state.user = null;
            return ;
            // alert("login successfull.");
          }
            else if(action.payload  && action.payload.data.success){
                console.log(action.payload.data.success,action.payload.data.user)
              state.status = 'succeeded';  
              state.isAuthenticated = true;
              state.user = action.payload.data.user;
              localStorage.setItem('token', action.payload.data.token);
              alert("login successfull.");
            }
           
            
          })
          .addCase(loginUser.rejected, (state, action) => {
            console.log(action.payload)
            state.status = 'failed';
            state.error = action.error.message;
            
          })
          // .addCase(logout.pending, (state) => {
          //   state.status = 'loading';
          // })
          // .addCase(logout.fulfilled, (state, action) => {
          //   state.status = 'succeeded';
          //   if(action.payload && action.payload.data.success){
          //     console.log(action.payload.data.success,action.payload.data.message)
          //     state.isAuthenticated = false;
          //     state.user = null;
          //   }
            
          // })
          // .addCase(logout.rejected, (state, action) => {
          //   state.status = 'failed';
          //   state.error = action.error.message;
          // });
      },

})

export const {logout} = userSlice.actions;
export default userSlice.reducer;