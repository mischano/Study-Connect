/*****************************************************
 * npm run dev -- To run the server on local host.   *
 * http://localhost:5000/                            *
 ****************************************************/

const express = require("express");
const mongoose = require("mongoose");

const profileRouter = require("./routes/profileRoutes.js");
const classRouter = require("./routes/classRoutes.js");
const messageRouter = require("./routes/messageRoutes.js");
const conversationRouter = require("./routes/conversationRoutes.js");

const app = express();

const PORT = 5000 || process.env.PORT;

mongoose.connect(
   "mongodb+srv://StudyConnectUser:srcAVv$vq!7Lvfr@studyconnect.dscne.mongodb.net/StudyConnect?retryWrites=true&w=majority",
   {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
   });

const db = mongoose.connection;
db.once('open', _ => {
    console.log('Database connected...');
});

db.on('error', err => {
    console.error('Database connection error...', err);
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

app.use(classRouter);
app.use(conversationRouter);
app.use(messageRouter);
app.use(profileRouter);
