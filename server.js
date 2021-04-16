/*****************************************************
 * npm run dev -- To run the server on local host.   *
 * http://localhost:3000/                            *
 ****************************************************/

const express = require("express");
const mongoose = require("mongoose");
const socketio = require('socket.io');

const profileRouter = require("./routes/profileRoutes.js");
const Profile = require("./models/profile");
const Class = require("./models/class");

const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);  // create local server
const io = socketio(server);    // connect socket to server
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

const PORT = 3000 || process.env.PORT;
const botName = 'chat bot ';

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

/*
 * All socket 'message' are caught in/from public -> js -> main.js *
 */
// Run when client connects to a chat room
io.on('connection', socket => {     // listen for 'connection' event
    socket.on('joinRoom', ({ username, room }) => {
        // Send user data to utils -> users.js
        const user = userJoin(socket.id, username, room); 
        
        socket.join(user.room); // join a specific room

        // Emit to connected (single) user
        socket.emit(
            'message', 
            formatMessage(botName, 'Welcome to chat')
            );  

        // Emit to everyone in a specific room
        socket.broadcast
            .to(user.room)
            .emit(
            'message', 
            formatMessage(botName, `${user.username} has joined the chat`)
            ); 
    });

    // Listen for chat message
    socket.on('chatMessage', msg => {
        // Get from utils -> users.js
        const user = getCurrentUser(socket.id); 

        // Emit to everyone in a specific room
        io.to(user.room)
            .emit(
            'message', 
            formatMessage(user.username, msg)
            );
    });
    
    // If client disconnects from chat room
    // Emit to everyone
    socket.on('disconnect', () => {  
        // Get from utils -> users.js
        const user = userLeave(socket.id);

        // Emit to everyone in a specific room
        if (user) {
            io.to(user.room)
                .emit(
                'message', 
                formatMessage(botName, `${user.username} has left the chat`)
                );
        }
    });
});

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

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

app.listen(PORT, () => {
   console.log('Server is running...')
});
*/