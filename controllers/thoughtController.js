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

  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        {
          new: true,
        }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: `No Thought found with that ID Number` });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json({ message: `Cannot update Thought by ID` });
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res
          .status(404)
          .json({ message: `No Thought found with that ID Number` });
      }
      res.json({ message: `Thought has been deleted` });
    } catch (error) {
      res.status(500).json({ message: `Cannot delete Thought` });
    }
  },

  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: `No Thought with that ID Number` });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json({ message: `Cannot create Reaction` });
    }
  },

  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: `No Thought with that Id Number` });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json({ message: `Cannot delete Reaction` });
    }
  },
};
