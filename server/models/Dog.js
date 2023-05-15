const { Schema, model } = require("mongoose");

const dogSchema = new Schema({
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
  },
});

const Dog = model("Dog", dogSchema);

module.exports = Dog;
