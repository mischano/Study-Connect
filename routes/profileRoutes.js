const express = require("express");
const profileModel = require("../models/profile");
const app = express();

app.get("/profiles", async (request, response) => {
  const profiles = await profileModel.find({});

  try {
    response.send(profiles);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;