import express from "express";

import { signin, signup, updateUser, getUser } from '../controllers/user.js'

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.patch('/:id', updateUser);
router.get('/users/:id', getUser);

export default router;

/*
app.get("/profiles", async (req, res) => {
   const profiles = await profileModel.find({});

   try {
      res.send(profiles);
   } catch (error) {
      res.status(500).send(error);
   }
});


app.post("/profile", async (req, res) => {
   const profile = new profileModel(req.body);

   try {
      await profile.save();
      res.send(profile);
   } catch (error) {
      res.status(500).send(error);
   }
});


app.patch("/profile/:id", async (req, res) => {
   try {
      await profileModel.findByIdAndUpdate(req.params.id, req.body);
      await profileModel.save();
      res.send(profile);
   } catch (error) {
      res.status(500).send(error);
   }
});

app.delete("/profile/:id", async (req, res) => {
   try {
      const profile = await profileModel.findByIdAndDelete(req.params.id);

      if (!profile)
         res.status(404).send("No profile found.");
      res.status(200).send();
   } catch (error) {
      res.status(500).send(error);
   }
});
// module.exports = app;
*/
