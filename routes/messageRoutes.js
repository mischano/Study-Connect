const express = require("express");
const messageModel = require("../models/message");

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

/* Establishes a /messages endpoint for GET requests */
app.get("/messages", async (req, res) => {
    const messages = await messageModel.find({});

    try {
        res.send(messages);
    } catch (error) {
        res.status(500).send(error);
    }
});

/* Establishes a /message endpoint for POST requests to
   create a new message and save it to the database */
app.post("/message", async (req, res) => {
    const message = new messageModel(req.body);

    try {
        await message.save();
        res.send(message);
    } catch (error) {
        res.status(500).send(error);
    }
});

/* Establishes a /message/:id endpoint for PATCH requests
   to update an existing profile and save the changes to
   the database */
app.patch("/message/:id", async (req, res) => {
    try {
        await messageModel.findByIdAndUpdate(req.params.id, req.body);
        await messageModel.save();
        res.send(message);
    } catch (error) {
        res.status(500).send(error);
    }
});

/* Establishes a /message/:id endpoint for DELETE requests
to remove an existing message and save the changes to
the database */
app.delete("/message/:id", async (req, res) => {
    try {
        const message = await messageModel.findByIdAndDelete(req.params.id);

        if (!message)
            res.status(404).send("No message found.");
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = app;