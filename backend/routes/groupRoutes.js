import express from "express";

const router = express.Router();


export default router;


/*
app.get("/conversations", async (req, res) => {
    const conversations = await conversationModel.find({});

    try {
        res.send(conversations);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.post("/conversation", async (req, res) => {
    const conversation = new conversationModel(req.body);

    try {
        await conversation.save();
        res.send(conversation);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.patch("/conversation/:id", async (req, res) => {
    try {
        await conversationModel.findByIdAndUpdate(req.params.id, req.body);
        await conversationModel.save();
        res.send(conversation);
    } catch (error) {
        res.status(500).send(error);
    }
});

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
*/
