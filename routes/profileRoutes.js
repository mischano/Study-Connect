const express = require("express");
const profileModel = require("../models/profile");
const app = express();

app.get('/profiles', (req, res) => {

  profileModel.find({})
      .then((data) => {
        console.log('Data: ', data);
        res.json(data);
      })
      .catch((error) => {
        console.log('error');
      });
});

app.get("/profiles", async (request, response) => {
  const profiles = await profileModel.find({});

  try {
    response.send(profiles);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;