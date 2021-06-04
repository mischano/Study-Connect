import Post from '../models/post.js';
import db from '../server.js';
import mongoose from 'mongoose';

// GET request to fetch a post in a group
export const getPost = async (req, res) => {
   const { id: _id } = req.params;
   const post = await Post.findOne({ _id: mongoose.Types.ObjectId(_id) });

   res.json({ post });
}

// POST request to create a new post in a group
export const makePost = async (req, res) => {
   const { title, message, creator, comments, likeCount, created_at } = req.body;
   var posts = db.collection("posts");

   try {
      const post = await posts.insertOne({ title, message, creator, comments, likeCount, created_at });
      res.json(post.insertedId);
   } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
   }
}

// PATCH request to add a comment to a post
export const updateComments = async (req, res) => {
   const { id: _id } = req.params;
   const comment = req.body;

   if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send('No post with that id');
   }
   else {
      var updatedPost = await Post.findByIdAndUpdate(_id, { $push: { "comments": comment } }, { new: true });
   }
   res.json(updatedPost);
}