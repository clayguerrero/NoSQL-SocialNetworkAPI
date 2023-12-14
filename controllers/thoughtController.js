const { Thought, User, Reaction } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ message: `Cannot gather Thoughts` });
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res
          .status(404)
          .json({ message: `No Thought found with that ID Number` });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json({ message: `Cannot get Thought by ID` });
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (error) {
      res.status(500).json({ message: `Cannot create Thought` });
    }
  },
};
