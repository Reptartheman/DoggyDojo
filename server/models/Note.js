const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const noteSchema = new Schema({
  text: {
    type: String,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  editedAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  score: {
    required: true,
    type: Number,
    min: 0,
    max: 10,
  }
});

const Note = model('Note', noteSchema);

module.exports = Note;
