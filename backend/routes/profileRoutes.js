const express = require("express");
const profileModel = require("../models/profile");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

/* Establishes a /profiles endpoint for GET requests */
app.get("/profiles", async (req, res) => {
   const profiles = await profileModel.find({});

   try {
      res.send(profiles);
   } catch (error) {
      res.status(500).send(error);
   }
});

/* Establishes a /profile endpoint for POST requests to
   create a new profile and save it to the database */
app.post("/profile", async (req, res) => {
   const profile = new profileModel(req.body);

   try {
      await profile.save();
      res.send(profile);
   } catch (error) {
      res.status(500).send(error);
   }
});

/* Establishes a /profile/:id endpoint for PATCH requests
   to update an existing profile and save the changes to
   the database */
app.patch("/profile/:id", async (req, res) => {
   try {
      await profileModel.findByIdAndUpdate(req.params.id, req.body);
      await profileModel.save();
      res.send(profile);
   } catch (error) {
      res.status(500).send(error);
   }
});

/* Establishes a /profile/:id endpoint for DELETE requests
   to remove an existing profile and save the changes to
   the database */
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

module.exports = app;