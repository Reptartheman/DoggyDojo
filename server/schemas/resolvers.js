const { User, Dog, Note } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find({}).populate("dogs").populate("notes");
      return users;
    },
    user: async (parent, { username }) => {
      const user = await User.findOne({ username })
        .populate("dogs")
        .populate("notes");
      return user;
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    addDog: async (parent, { size, activity, training, username }) => {
      {
        const dog = await Dog.create({ size, activity, training });
        await User.findOneAndUpdate(
          { username: username },
          { $push: { dogs: dog._id } },
          { new: true }
        );
        return dog;
      }
    },

    addNote: async (parent, { text, username }) => {
      const note = await Note.create({ text });
      await User.findOneAndUpdate(
        { username: username },
        { $set: { notes: note._id } },
        { new: true }
      );
      return note;
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
