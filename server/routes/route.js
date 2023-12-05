const express = require ("express");
const router = express.Router();

const {AddUser,loginUser,getLoggedUserDetails, logout} = require("../controller/auth");
const fetchUser = require("../middleware/fetchLoggedUserDetails");
const { AddNewNote, fetchAllNotes, fetchSingleNote, updateSingleNote ,deleteSingleNote} = require("../controller/task");

router.route("/auth/createUser").post(AddUser);
router.route("/auth/login")     .post(loginUser);
router.route("/auth/profile")   .get(fetchUser,getLoggedUserDetails);
router.route("/auth/logout")    .get(fetchUser,logout);

router.route("/notes/addTask")    .post(fetchUser,AddNewNote);
router.route("/notes/getallTasks").get(fetchUser,fetchAllNotes);
router.route("/notes/getsinglenote/:id").get(fetchUser,fetchSingleNote);
router.route("/notes/getsinglenote/:id").put(fetchUser,updateSingleNote);
router.route("/notes/getsinglenote/:id").delete(fetchUser,deleteSingleNote);
module.exports = router;