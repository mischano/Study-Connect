import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from 'cors';

import groupRouter from './routes/groupRoutes.js';
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js'
import friendReqRouter from './routes/friendReqRoutes.js';

const app = express();

const PORT = 5000;

/* Set up routes */
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/user', userRouter);
app.use('/group', groupRouter);
app.use('/post', postRouter);
app.use('/friends', friendReqRouter);

// Connect to the mongoDB database
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
   res.send('Hello World!');
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

export default db;