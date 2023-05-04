const db = require('../config/connection');
const { User, Dog } = require('../models');

const userData = require('./userData.json');
const dogData = require('./dogData.json');

db.once('open', async () => {
    // clean database
    await User.deleteMany({});
    // await Dog.deleteMany({});

    // bulk create each model
    const users = await User.insertMany(userData);
    // const dogs = await Dog.insertMany(dogData);
  
    // for (newDog of dogs) {
    //   // randomly add each dog to a user
    //   const tempOwner = users[Math.floor(Math.random() * users.length)];
    //   tempOwner.dogs.push(newClass._id);
    //   await tempOwner.save();

    // }
  
    console.log('all done!');
    process.exit(0);
  });