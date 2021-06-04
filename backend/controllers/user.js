import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/user.js';

// POST request to sign in
export const signin = async (req, res) => {
   const { email, password } = req.body;
   try {
      let existingUser;
      existingUser = await User.findOne({ email });
      if (!existingUser) return res.status(404).json({ message: "User doesn't exit" });

      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });
      res.status(200).json({ result: existingUser, token });
   } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
   }
}

// POST request to sign up
export const signup = async (req, res) => {
   const { email, password, confirmPassword, firstName, lastName, major, gradDate } = req.body;
   try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });

      if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match" });
      const hashedPassword = await bcrypt.hash(password, 12);

      let result;
      result = await User.create({
         email, password: hashedPassword, name: `${firstName} ${lastName}`, major: major,
         gradDate: gradDate, bio: "", avatar: ""
      });

      const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });
      res.status(200).json({ result: result, token });
   } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
   }
}

// PATCH request to change the classes attributed to a user
export const updateClasses = async (req, res) => {
   const { id: _id } = req.params;
   const classes = req.body;

   if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send('No user with that id');
   }
   else {
      var updatedUser = await User.findByIdAndUpdate(_id, { $push: { "classes": classes } }, { new: true });
   }
   res.json(updatedUser);
}

// PATCH request to change the groups a user is in
export const updateGroups = async (req, res) => {
   const { id: _id } = req.params;
   const groups = req.body;

   if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send('No user with that id');
   }
   else {
      var updatedUser = await User.findByIdAndUpdate(_id, { $push: { "groups": groups } }, { new: true });
   }
   res.json(updatedUser);
}

// PATCH request to remove a user from a group
export const leaveGroup = async (req, res) => {
   const { id: _id } = req.params;
   const group = req.body;

   if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send('No user with that id');
   }
   else {
      var updatedUser = await User.findByIdAndUpdate(_id, { $pull: { groups: { $in: [group.data] } } },
         { new: true });
   }
   res.json(updatedUser);
}

// GET request to fetch a given user
export const getUser = async (req, res) => {
   const { id: _id } = req.params;
   const user = await User.findOne({ _id: mongoose.Types.ObjectId(_id) });
   res.json({ user });
}

// GET request to fetch all of the profiles stored in the database
export const getProfiles = async (req, res) => {
   const profiles = await User.find({});

   try {
      res.send(profiles);
   } catch (error) {
      res.stats(500).json({ message: 'Error in backend: controllers -> user.js' });
   }
}

// PATCH request to update a user's friends
export const updateFriends = async (req, res) => {
   const { id: _id } = req.params;
   const friends = req.body;

   if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send('No user with that id');
   } else {
      var updatedUser = await User.findByIdAndUpdate(_id, { $push: { "friends": friends } }, { new: true });
   }
   res.json(updatedUser);
}

// PATCH request to remove a friend from a user's friend list
export const removeFriend = async (req, res) => {
   const { id: _id } = req.params;
   const friend = req.body;

   if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send('No friend with that id');
   }
   else {
      var updatedFriends = await User.findByIdAndUpdate(_id, { $pull: { friends: { $in: [friend.data] } } },
         { new: true });
   }
   res.json(updatedFriends);
}

// PATCH request to edit a user's profile
export const editProfile = async (req, res) => {
   const { id: _id } = req.params;
   const newName = req.body.name;
   const newEmail = req.body.email;
   const newMajor = req.body.major;
   const newGradDate = req.body.gradDate;
   const newAvatar = req.body.avatar;
   const newBio = req.body.bio;

   if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send('No user with that id');
   } else {
      var updateProfile = await User.findByIdAndUpdate(_id,
         {
            name: newName,
            email: newEmail,
            major: newMajor,
            gradDate: newGradDate,
            bio: newBio,
            avatar: newAvatar
         }, { new: true });
   }
   res.json(updateProfile);
}