const express = require("express");
const conversationModel = require("../models/conversation");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

/* Establishes a /conversation endpoint for GET requests */
app.get("/conversations", async (req, res) => {
    const conversation = await conversationModel.find({});

    try {
        res.send(conversations);
    } catch (error) {
        res.status(500).send(error);
    }
});

/* Establishes a /conversation endpoint for POST requests to
   create a new conversation and save it to the database */
app.post("/conversation", async (req, res) => {
    const conversation = new conversationModel(req.body);

    try {
        await conversation.save();
        res.send(conversation);
    } catch (error) {
        res.status(500).send(error);
    }
});

/* Establishes a /conversation/:id endpoint for PATCH requests
   to update an existing conversation and save the changes to
   the database */
app.patch("/conversation/:id", async (req, res) => {
    try {
        await conversationModel.findByIdAndUpdate(req.params.id, req.body);
        await conversationModel.save();
        res.send(conversation);
    } catch (error) {
        res.status(500).send(error);
    }
});

/* Establishes a /conversation/:id endpoint for DELETE requests
   to remove an existing conversation and save the changes to
   the database */
app.delete("/conversation/:id", async (req, res) => {
    try {
        const conversation = await conversationModel.findByIdAndDelete(req.params.id);

        if (!conversation)Cache
            res.status(404).send("No conversation found.");
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = app;