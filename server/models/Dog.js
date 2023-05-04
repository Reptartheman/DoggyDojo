const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `dogInfo` array in User.js
const dogSchema = new Schema(
  {
    name: {
        type: String,
    },
    size: {
      type: String,
      required: true,
    },
    activity: {
      type: String,
      required: true,
    },
    training: {
      type: String,
      required: true,
    }
});

const Dog = model('Dog', dogSchema)

module.exports = Dog;