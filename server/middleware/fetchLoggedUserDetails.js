require('dotenv').config(); // Load variables from .env file
const jwt = require ("jsonwebtoken");
const User = require("../models/User");

const fetchUser = async(req,res,next)=>{
    try {  
        // Check if a JWT token is present in cookies
        // const token = req.cookies.token;
        // console.log("Token present = ",token);
        const token = req.body.token;

        if (!token) {
            console.log("NO token found");
            return res.status(401).json({
                "success" : false,
                "message" : "Unauthorized Access. Please login first to use this service."
            });
        }
        else{
            // Verify the JWT token
            const decodedData = jwt.verify(token, process.env.JWT_SECRET); // Replace with your actual secret key
            // console.log("decoded Data = ",decodedData);

            // Attach the decoded user information to the request object
            // req.id = decoded.id;
            req.user = await User.findById(decodedData.id);
            // console.log(`Present loggedin user = ${req.user}`);
            next();
        }
    } catch (error) {
        console.log("UNAUTHORISED ACCESS DETECTED...");
        res.status(401).json({
            "success" : false,
            "message" : "Unauthorized Access. Please login first to use this service.."
        });
    }
}

module.exports = fetchUser;