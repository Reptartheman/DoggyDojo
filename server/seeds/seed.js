const db = require('../config/connection');
const { User, Dog, Note } = require('../models');

const userData = require('./userData.json');
const dogData = require('./dogData.json');
const noteData = require('./noteData.json');

db.once('open', async () => {
    // clean database
    await User.deleteMany({});
    await Dog.deleteMany({});
    await Note.deleteMany({});

    // bulk create each model
    const users = await User.insertMany(userData);
    const dogs = await Dog.insertMany(dogData);
    const notes = await Note.insertMany(noteData);
  
    for (let dog of dogs) {
      // randomly add each dog to a user
      const randomUser = users[Math.floor(Math.random() * users.length)];
      randomUser.dogs.push(dog._id);
      await randomUser.save();
    }

    for (let note of notes) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      randomUser.notes.push(note._id);
      await randomUser.save();
    }
  
    console.log('all done!');
    process.exit(0);
  });