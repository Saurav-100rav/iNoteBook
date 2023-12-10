const express = require("express")
const cors = require("cors");
const app = express(); 
app.use(cors({ origin: ['http://localhost:3000','https://inotebook-frontend-ukr5.onrender.com'],
               credentials: true }));

// Add the cookie-parser middleware
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//basically parse incoming Request Object as a JSON Object
app.use(express.json());
app.use(express.urlencoded());

const connect_database = require("./database/db");
connect_database();

const allroutes = require("./routes/route")
app.use("/api/v1",allroutes)

app.get("/",(req,res)=>{
    res.send("Welcome on iNoteBook App.....");
})
const port = 5000||process.env.PORT;
const start_server = ()=>{
    try {
        app.listen(port,()=>{
            console.log(`Server is running on port : ${port}`);
        })
    } catch (error) {
        console.log("Error while starting Backend server....",error);
    }
}
start_server();