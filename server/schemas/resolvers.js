const { User, Dog } = require('../models');
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");


const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find({})
      .populate('dogs')
      .populate('notes');
      return users;
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Invalid Credentials");
      }

      const correctpw = await user.isCorrectPassword(password);

      if (!correctpw) {
        throw new AuthenticationError("Error: Wrong email or password");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};



module.exports = resolvers;