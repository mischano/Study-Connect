import Comment from '../models/comment.js';
import db from '../server.js';
import mongoose from 'mongoose';

export const getComment = async (req, res) => {
    const { id: _id } = req.params;
    const post = await Post.findOne({ _id: mongoose.Types.ObjectId(_id) });
 
    res.json({ post });
 }
 
 export const makeComment = async (req, res) => {
    const { title, message, creator, comments, likeCount, created_at } = req.body;
    var comments = db.collection("comments");
 
    try {
       const post = await comments.insertOne({ title, message, creator, comments, likeCount, created_at });
       res.json(post.insertedId);
    } catch (error) {
       res.status(500).json({ message: 'Something went wrong' });
    }
 }