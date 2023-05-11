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
    addDog: async (parent, {name, size, activity, training}, context) => {
      if (context.user) {
        const dog = await Dog.create({name, size, activity, training});
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { dogs: dog._id } },
          { new: true }
        );
        return dog;
      }
    },
    
    addNote: async (parent, {text}, context) => {
      if (context.user) {
        const note = await Note.create({text});
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { notes: note._id } },
          { new: true }
        );
        return note;
      }

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