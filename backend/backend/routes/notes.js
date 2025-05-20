const express = require('express');
const Note    = require('../models/Note');
const authMW  = require('../middleware/auth');

const router = express.Router();

// Create a new note (private)
router.post('/', authMW, async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(400).json({ msg: 'Title and body are required' });
  }
  try {
    const note = new Note({ title, body, author: req.userId });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
