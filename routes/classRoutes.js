const express = require("express");
const classModel = require("../models/class");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

/* Establishes a /classes endpoint for GET requests */
app.get("/classes", async (req, res) => {
   const classes = await classModel.find({});

   try {
      res.send(classes);
   } catch (error) {
      res.status(500).send(error);
   }
});

/* Establishes a /class endpoint for POST requests to
   create a new class and save it to the database */
app.post("/class", async (req, res) => {
   const singleClass = new classModel(req.body);

   try {
      await singleClass.save();
      res.send(singleClass);
   } catch (error) {
      res.status(500).send(error);
   }
});

/* Establishes a /class/:id endpoint for PATCH requests
   to update an existing class and save the changes to
   the database */
app.patch("/class/:id", async (req, res) => {
   try {
      await classModel.findByIdAndUpdate(req.params.id, req.body);
      await classModel.save();
      res.send(singleClass);
   } catch (error) {
      res.status(500).send(error);
   }
});

/* Establishes a /class/:id endpoint for DELETE requests
   to remove an existing class and save the changes to
   the database */
app.delete("/class/:id", async (req, res) => {
   try {
      const singleClass = await classModel.findByIdAndDelete(req.params.id);

      if (!singleClass)
         res.status(404).send("No class found.");
      res.status(200).send();
   } catch (error) {
      res.status(500).send(error);
   }
});

module.exports = app;