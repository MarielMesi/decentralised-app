// i am making the routes which the api calls can use and then pass the data to the appropriate controller

const express = require("express");
const {
  newNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const router = express.Router();

// CRUD routes
router.route("/note/new").post(newNote);
router.route("/notes").get(getAllNotes);
router
  .route("/note/:id")
  .get(getSingleNote)
  .put(updateNote)
  .delete(deleteNote);

module.exports = router;