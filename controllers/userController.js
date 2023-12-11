const { User } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: `Cannot get users` });
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });
      if (!user) {
        return res
          .status(404)
          .json({ message: `No user found with that ID Number` });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: `Cannot get user by ID` });
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: `Cannot create user` });
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        return res
          .status(404)
          .json({ message: `No user found with that ID Number` });
      }
      res.json({ message: `User has been deleted` });
    } catch (error) {
      res.status(500).json({ message: `Cannot delete User` });
    }
  },
};
