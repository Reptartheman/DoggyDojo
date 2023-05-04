const { User, Dog } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    dogs: async () => {
      return await Dog.find({});
    }
  }
};

module.exports = resolvers;
