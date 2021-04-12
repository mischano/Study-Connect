const express = require("express");
const mongoose = require("mongoose");
const profileRouter = require("./routes/profileRoutes.js");
port = 3000

const app = express();
app.use(express.json);

mongoose.connect(
   "mongodb+srv://StudyConnectUser:srcAVv$vq!7Lvfr@studyconnect.dscne.mongodb.net/StudyConnect?retryWrites=true&w=majority",
   {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
   }
);

app.use(profileRouter);

app.get('/', (req, res) => {
   res.send("Hello world!")
});

app.listen(port, () => {
   console.log('Server is running...')
});