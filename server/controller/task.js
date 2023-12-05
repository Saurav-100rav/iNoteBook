const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const fetchuser = require('../middleware/fetchLoggedUserDetails');
const Note = require('../models/Notes');
// const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
const fetchAllNotes = async(req,res)=>{
    try {
        const notes = await Note.find({user:req.user._id}); 
        console.log(`${notes.length} notes found`)
        res.status(200).json({
            "success" : true,
            "message" :notes
            }
        )
    } catch (error) {
        console.error("Error while fetching all Notes..",error.message);
        res.status(500).json({
            "success" : false,
            "message" : error.message
            }
        )
    }
}

// ROUTE 2: Get a single Note using: GET "/api/notes/getuser". Login required
const fetchSingleNote = async(req,res)=>{
    try {
        const id = req.params.id;
        console.log(id,"ID")
        const note = await Note.findOne({_id:id});
        // const note = await Note.findById(req.params.id); 
        note ? console.log(`Note found : ${note?.title}.`) : console.log("No Note found with requested id..")
        res.status(200).json({
            "success" : true,
            "message" : note
            }
        )
    } catch (error) {
        console.error("Error while fetching single Notes..",error.message);
        res.status(500).json({
            "success" : false,
            "message" : error.message
            }
        )
    }
}


// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
const AddNewNote = async(req,res)=>{
    
    try {
        const { title, description, tag } = req.body;
        // If there are errors, return Bad request and the errors
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }
        const newNote = new Note({
            title, 
            description, 
            tag,
            user: req.user._id
        })
        const savedNote = await newNote.save()
        console.log("New Note made..",newNote);
        res.status(201).json({
            "success" : true,
            "message" : `New Note with title :- ${savedNote.title} added successfully...`,
            savedNote
            }
        )

    } catch (error) {
        console.error("Error while making new Note..",error.message);
        res.status(500).send("Internal Server Error");
    }
} 
// router.post('/addnote', fetchuser, [
//     body('title', 'Enter a valid title').isLength({ min: 3 }),
//     body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
//         try {
//             const { title, description, tag } = req.body;

//             // If there are errors, return Bad request and the errors
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({ errors: errors.array() });
//             }
//             const note = new Note({
//                 title, description, tag, user: req.user.id
//             })
//             const savedNote = await note.save()

//             res.json(savedNote)

//         } catch (error) {
//             console.error(error.message);
//             res.status(500).send("Internal Server Error");
//         }
//     })

// ROUTE 2: Get a single Note using: GET "/api/notes/getuser". Login required
const updateSingleNote = async(req,res)=>{
    const { title, description, tag } = req.body;
    try {
        const id = req.params.id;
        let note = await Note.findOne({_id:id});
        note ? console.log(`Note found to update : ${note?.title}.`) : 
               console.log("No Note found for updation with requested id..")
        //  OUTPUT:   a single document is returned or null if not found
        if(!note)
        return res.status(404).json({
            "success" : false,
            "message" : "note not found"
        });
        else{
            // console.log("here");
            note = await Note.findByIdAndUpdate(req.params.id,req.body,{
                new : true,
                runValidators:true,
                useFindAndModify:false
            })
            // console.log("updated",note.title,"whoooo\n",note);
            res.status(200).json({
                "success" : true, 
                "message" :"note updated successfully...",
                 note
            })
        }
    } catch (error) {
        console.error("Error while updating single Note..",error.message);
        res.status(500).json({
            "success" : false,
            "message" : error.message
            }
        )
    }
}




// ROUTE 2: Get a single Note using: GET "/api/notes/getuser". Login required
const deleteSingleNote = async(req,res)=>{
    try {
        const id = req.params.id;
        let note = await Note.findOne({_id:id});
        note ? console.log(`Note found to delete : ${note?.title}.`) : 
               console.log("No Note found to delete with requested id..")
        //  OUTPUT:   a single document is returned or null if not found
        if(!note)
        return res.status(404).json({
            "success" : false,
            "message" : "note not found"
        });
        else{
                await Note.findOneAndDelete({_id:id});
            // console.log("updated",note.title,"whoooo\n",note);
            res.status(200).json({
                "success" : true, 
                "message" :"note deleted successfully...",
            })
        }
    } catch (error) {
        console.error("Error while deleting single Note..",error.message);
        res.status(500).json({
            "success" : false,
            "message" : error.message
            }
        )
    }
}
module.exports = {fetchAllNotes,AddNewNote,fetchSingleNote,updateSingleNote,deleteSingleNote}