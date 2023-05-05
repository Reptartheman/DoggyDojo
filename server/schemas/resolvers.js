const { User, Dog } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find({})
      .populate('dogs')
      .populate('notes');
      return users;
    }
  }
};

module.exports = resolvers;