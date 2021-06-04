import Group from '../models/group.js';
import db from '../server.js';
import mongoose from 'mongoose';

// GET request to fetch a group that a user is in
export const getGroup = async (req, res) => {
   const { id: _id } = req.params;
   const group = await Group.findOne({ _id: mongoose.Types.ObjectId(_id) });
   res.json({ group });
}

// POST request to create a new group
export const makeGroup = async (req, res) => {
   const { name, members } = req.body;
   var groups = db.collection("groups");

   try {
      const group = await groups.insertOne({ name, members });
      res.json(group.insertedId);
   } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
   }
}

// PATCH request to update the posts for a given group
export const updatePosts = async (req, res) => {
   const { id: _id } = req.params;
   const post = req.body;

   if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send('No group with that id');
   }
   else {
      var updatedGroup = await Group.findByIdAndUpdate(_id, { $push: { "posts": post } }, { new: true });
   }
   res.json(updatedGroup);
}

// PATCH request to update the members for a given group
export const updateMembers = async (req, res) => {
   const { id: _id } = req.params;
   const members = req.body;

   if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send('No group with that id');
   }
   else {
      var updatedGroup = await Group.findByIdAndUpdate(_id, { $push: { "members": members } }, { new: true });
   }
   res.json(updatedGroup);
}

// PATCH request to remove a member from a group
export const removeMember = async (req, res) => {
   const { id: _id } = req.params;
   const member = req.body;

   if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send('No group with that id');
   }
   else {
      var updatedGroup = await Group.findByIdAndUpdate(_id, { $pull: { members: { $in: [member.data] } } },
         { new: true });
   }
   res.json(updatedGroup);
}

// GET request to fetch all of the groups a user is in
export const getAllGroups = async (req, res) => {
   const profiles = await Group.find({});

   try {
      res.send(profiles);
   } catch (error) {
      res.stats(500).json({ message: 'Error in backend: controllers -> user.js' });
   }
}