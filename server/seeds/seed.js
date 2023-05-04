const db = require('../config/connection');
const { User, Dog } = require('../models');

const userData = require('./userData.json');
const dogData = require('./dogData.json');

db.once('open', async () => {
    // clean database
    await User.deleteMany({});
    await Dog.deleteMany({});

    // bulk create each model
    const users = await User.insertMany(userData);
    const dogs = await Dog.insertMany(dogData);
  
    for (let dog of dogs) {
      // randomly add each dog to a user
      const randomUser = users[Math.floor(Math.random() * users.length)];
      randomUser.dogs.push(dog._id);
      await randomUser.save();
    }
  
    console.log('all done!');
    process.exit(0);
  });