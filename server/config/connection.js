const mongoose = require("mongoose");

// Connection to MongoDB database via atlas or localhost
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/doggo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = mongoose.connection;
