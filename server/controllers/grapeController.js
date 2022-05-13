const { ObjectId } = require('mongoose').Types;
const { Grape } = require('../models');

// Aggregate function to get the number of users overall
const totalUser = async () =>
  User.aggregate()
    .count('userCount')
    .then((numberOfUsers) => numberOfUsers);

module.exports = {

  // Get grapes with a description
  getGrapeDesc(req, res) {
      Grape.getMany(
        { description: { $ne: null } },
        { new: true }
      )
      .then(
        res.json(res)
      )
      .catch((err) => res.status(500).json(err));

  },


  delUsers(req, res) {
    User.deleteMany()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },


  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .select('-__v')
      .then((user) => {
        if(!user){
          res.status(404).json({ message: 'No user with that id' })
        }else{
          res.json(user)
        }
      }
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user and their thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No such user exists" });
          return;
        } else{
          return Thought.deleteMany(
            {_id: { $in: user.thoughts } }
          )
        }
      })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Update a user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No such user exists" });
          return;
        }
        res.json(user); 
      })
      .catch((err) => res.status(400).json(err));
  },


  // Add a friend to friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { friends: req.body.id } },
      { new: true }
    )
    .then(
      res.json({ message: 'Friend Added!' })
    )
    .catch((err) => res.status(400).json(err));
  },


  // Remove a friend from friend list
  removeFriend(req, res){
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.body.id } },
      { new: true }
    )
    .then(
      res.json({ message: 'Friend removed' })
    )
    .catch((err) => res.status(400).json(err));
  },
};
