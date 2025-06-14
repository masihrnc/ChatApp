const express = require('express')
const bojdparser = require('body-parser')
const app = express()
const cors = require("cors");
const mongoose = require("mongoose");
const routeSignup = require("./routes/signup.js");
const routeLogin = require("./routes/login.js");
const routeMessage = require("./routes/message.js");
const socket = require("socket.io");
require("dotenv").config();


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors());
app.use(bojdparser.json())
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });
app.use("/api/signup", routeSignup);
app.use("/api/login", routeLogin);
app.use("/api/message", routeMessage);


const server =  app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})

const io = socket(server, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "*",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;

//   socket.emit("msg-recieve", "world", (response) => {
//   console.log( "response",response); // "got it"
// });
//  socket.on("add-user", (arg ) => {
//   console.log( "argument",arg); // "world"
  
// });
  
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

 

  socket.on("send-msg", 
    (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
})


