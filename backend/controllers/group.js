import Group from '../models/group.js';
import db from '../server.js';
import mongoose from 'mongoose';

export const getGroup = async (req, res) => {
   const { id: _id } = req.params;
   const group = await Group.findOne({ _id: mongoose.Types.ObjectId(_id) });
   res.json({ group });
}

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

export const getGroups = async (req, res) => {
   const groups = await Group.find({});

   try {
      res.send(groups);
   } catch (error) {
      res.stats(500).json({ message: 'Error in backend: controllers -> user.js' });
   }
   finally {
      console.log(groups);
   }
}


