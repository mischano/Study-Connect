const express = require("express");
const mongoose = require("mongoose");
const profileRouter = require("./routes/profileRoutes.js");
const Profile = require("./models/profile");
const Class = require("./models/class");

port = 3000

const app = express();

mongoose.connect(
   "mongodb+srv://StudyConnectUser:srcAVv$vq!7Lvfr@studyconnect.dscne.mongodb.net/StudyConnect?retryWrites=true&w=majority",
   {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
   });


/*
const classData = {
    department: 'CSC',
    number: 430,
    startTime: 12,
    endTime: 14
}

const userData = {
    user: 'Lucas Radovan',
    pass: '1234',
    college: 'CPSLO',
    major: 'CS',
    friends: ['Raphael', 'Mansur', 'Keith', 'Caroline'],
    classes: []
}

const newUser = new Profile(userData);

newUser.classes.push(new Class(classData));

newUser.save((error) => {
    if (error) {
        console.log('Something went wrong');
    } else {
        console.log('data has been saved');
    }
})
/*
app.use(profileRouter);

app.get('/', (req, res) => {
   res.send("Hello world!")
});

app.listen(port, () => {
   console.log('Server is running...')
});
*/