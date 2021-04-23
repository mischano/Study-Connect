/*****************************************************
 * npm run dev -- To run the server on local host.   *
 * http://localhost:3000/                            *
 ****************************************************/

const express = require("express");
const mongoose = require("mongoose");
const socketio = require('socket.io');
const axios = require('axios');
const path = require('path');
const http = require('http');

const profileRouter = require("./routes/profileRoutes.js");
const classRouter = require("./routes/classRoutes.js");
const messageRouter = require("./routes/messageRoutes.js");
const conversationRouter = require("./routes/conversationRoutes.js");

const Profile = require("./models/profile");
const Class = require("./models/class");

const app = express();
const server = http.createServer(app);  // create local server
const io = socketio(server);    // connect socket to server
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');
const { response } = require("./routes/profileRoutes.js");

const PORT = 3000 || process.env.PORT;
const botName = 'chat bot ';
const localHostName = 'http://localhost:3000/profile';
const localHostMsg = 'http://localhost:3000/message';

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

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

/*
 * All socket 'message' are caught in/from public -> js -> main.js *
 */
// Run when client connects to a chat room
io.on('connection', socket => {     // listen for 'connection' event
    socket.on('joinRoom', ({ username, room }) => {
        // Send user data to utils -> users.js
        const user = userJoin(socket.id, username, room); 
        
        socket.join(user.room); // join a specific room
        
        // Store user information in the database
        axios.post(localHostName, {
            user: user.username,
            pass: user.room,
            college: user.id
        })

        /* Retrive all data from database */
        // axios.get('http://localhost:3000/profiles')
        //     .then((response) => {
        //         console.log(response.data);
        //     })

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
        
            axios.post(localHostMsg, {
            content: msg
        });
        console.log(msg);
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

app.use(classRouter);
app.use(conversationRouter);
app.use(messageRouter);
app.use(profileRouter);
