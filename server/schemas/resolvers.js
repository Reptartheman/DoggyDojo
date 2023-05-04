const { User } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      const anything = await User.find({});
      return anything;
    }
  }
};

module.exports = resolvers;

