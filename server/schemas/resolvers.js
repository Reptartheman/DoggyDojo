const { User, Dog } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find({})
      .populate('dogs')
      .populate('notes');
      return users;
    },
    dogs: async () => {
      return await Dog.find({})
    }
  }
};

module.exports = resolvers;