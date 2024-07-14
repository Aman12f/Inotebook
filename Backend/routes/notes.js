const express = require("express");
const Notes = require("../models/Notes");
const User = require("../models/User");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

//Route 1 : Get all the notes using : Get "/api/auth/getuser" : Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    // Checking for duplicate key error
    if (err.code === 11000) {
      return res.status(400);
    }
    res.status(500).send("Internal Server Error");
  }
});

//Route 2 : Add a new note using : POST "/api/notes/getuser" : Login Required
router.post(
  "/addnote",
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  fetchuser,
  async (req, res) => {
    console.log("the body is ", req.body);
    const user = await User.findById(req.user.id).select("-password");
    console.log("user details ", user);

    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (err) {
      console.error(err.message);
      // Checking for duplicate key error
      if (err.code === 11000) {
        return res.status(400);
      }
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3 : Update an existing note  : PUT "/api/notes/updatenote" : Login Required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  // create new note object
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json("Update Your own notes , Asshole!");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (err) {
    console.error(err.message);
    // Checking for duplicate key error
    if (err.code === 11000) {
      return res.status(400);
    }
    res.status(500).send("Internal Server Error");
  }
});

//Route 4 : Delete an existing note  : DELETE "/api/notes/deletenote" : Login Required
  router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  
    try{

      let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Not Found");
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).json("Delete Your own notes , Asshole!");
      }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({note:note,success:"Note deleated successfully"})
    } catch (err) {
      console.error(err.message);
      // Checking for duplicate key error
      if (err.code === 11000) {
        return res.status(400);
      }
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = router;
