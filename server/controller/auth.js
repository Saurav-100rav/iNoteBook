// const express = require('express');
// const { query, validationResult } = require('express-validator');
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config(); // Load variables from .env file
const jwt_secret_token = process.env.JWT_SECRET;

const AddUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        const oldUser = await User.findOne({email:email});
        if(oldUser){
            console.log("Already present...");
            res.json({"success":false,"message":"This User already Exist.."})
        } 
        else{
            const salt = await bcrypt.genSalt(10);
            const secure_password = await bcrypt.hash(password,salt);
            const newUser = new User({
                name,
                email,
                password:secure_password
            });
            await newUser.save();
            console.log(`${newUser.name.split(" ")[0]} added successfully ....`);
            res.status(201).json({
                "success":true,
                "message":`${newUser.name.split(" ")[0]} added successfully 🤩🤩..`,
                newUser});
            // const data = {
            //     user : {
            //         id:newUser._id
            //     }
            // }
            // const authToken = jwt.sign(data,jwt_secret_token);
            // res.json({authToken});
        }
    } catch (error) {
        console.log("Error while Adding User...");
        res.status(500).json({
            "success":false,
            "message":error.message
        }) 
    }
}

const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        if(!user)        
        return res.status(401).json({
            "success" : false,
            "message" : "Invalid credentials. Please check your email or password."
        });
        else{
            const hashed_password = user.password;
            const compare_password=await bcrypt.compare(password,hashed_password);
            if(compare_password){
                console.log(`${user.name.split(" ")[0]} ,Login Successfull.`);
                // Create a JWT token
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: '24h'}
                );
                res.cookie('token', token, { httpOnly: true });
                return res.status(200).json({
                    "success" : true,
                    "message" : `${user.name.split(" ")[0]} ,Login Successfull..`,
                    user,
                    token
                })
            }
            else{
                console.log("wrong behaviour found while logging...");
                res.status(401).json({
                    "success" : false,
                    "message" : "Invalid credentials. Please check your email or password."
                }); 
            }
        }
    } catch (error) {
        console.log("Error while logging User...",error.message);
        res.status(500).json({
            "success" : false,
            "error": error.message
        })
    }
}

const getLoggedUserDetails = async(req,res)=>{
        // const userId = req.user.id;
        // const loggedUser = await User.findById(userId).select("-password");
        // const user = await User.findOne({ userId }).select("-password");
        try {
            const user = req.user;
            console.log(`Present loggedin user = ${user.name.split(" ")[0]}`);
            res.status(200).json({
                "success" : true,
                "message" : `Present loggedin user = ${user.name}`,
                 user
            });
        } catch (error) {
            console.log("Error while getting User Details....",error.message);
            res.status(500).json({
                "success" : false,
                "error": error.message
            })
        }
}

const logout = async(req,res)=>{
    console.log("here")
    try {
        res.clearCookie('token');
        console.log("Logged out Sucessfully...")
        res.status(200).json({
            "success" : true,
            "message" : "Logged out Sucessfully..."
        });
    } catch (error) {
        console.log("error while logging out...",error.message);
        res.status(500).json({
            "success" : false,
            "error": error.message
        })
    }
}
module.exports = {AddUser,loginUser,getLoggedUserDetails,logout}