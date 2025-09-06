//i am using the error handlers !as per the rest of your code!

const asyncErrorHandler = require("../middlewares/helpers/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");

// in-memory storage
let notes = [];
//using and index
let nextId = 1;

// Create New Note
exports.newNote = asyncErrorHandler(async (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return next(new ErrorHandler("Title and content are required", 400));
  }

  const note = { id: nextId++, title, content };
  notes.push(note);

  console.log("Note created:", note);
  res.status(201).json({
    success: true,
    note,
  });
});

// Get All Notes
exports.getAllNotes = asyncErrorHandler(async (req, res, next) => {
  console.log(`All notes:`, notes);
  res.status(200).json({
    success: true,
    notes,
  });
});

// Get Single Note
exports.getSingleNote = asyncErrorHandler(async (req, res, next) => {
  const note = notes.find((n) => n.id === parseInt(req.params.id));
  if (!note) {
    return next(new ErrorHandler("Note not found", 404));
  }

  console.log("Note retrieved:", note);
  res.status(200).json({
    success: true,
    note,
  });
});

// Update Note
exports.updateNote = asyncErrorHandler(async (req, res, next) => {
  const note = notes.find((n) => n.id === parseInt(req.params.id));
  if (!note) {
    return next(new ErrorHandler("Note not found", 404));
  }

  const { title, content } = req.body;
  if (title) note.title = title;
  if (content) note.content = content;

  console.log("Note updated:", note);
  res.status(200).json({
    success: true,
    note,
  });
});

// Delete Note
exports.deleteNote = asyncErrorHandler(async (req, res, next) => {
  const index = notes.findIndex((n) => n.id === parseInt(req.params.id));
  if (index === -1) {
    return next(new ErrorHandler("Note not found", 404));
  }

  const deletedNote = notes.splice(index, 1)[0];
  console.log("Note deleted:", deletedNote);

  res.status(200).json({
    success: true,
    message: "Note deleted",
    note: deletedNote,
  });
});
