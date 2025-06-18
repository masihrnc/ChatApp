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

io.on("connection", (socket) => {
  console.log(`New Socket Connection: ${socket.id}`);

  socket.on("room:join", (data) => {
    const { username, displayPicture, platform } = data;
    users.set(socket.id, {
      socketId: socket.id,
      username,
      displayPicture,
      platform,
      joinedAt: new Date(),
      isConnected: false,
    });
    io.emit("refresh:user-list");
  });

  socket.on("peer:call", (data) => {
    const { to, offer } = data;
    socket.to(to).emit("peer:incomming-call", {
      from: socket.id,
      user: users.get(socket.id),
      offer,
    });
  });

  socket.on("peer:call:accepted", (data) => {
    const { to, offer } = data;
    if (users.has(to)) {
      //@ts-ignore
      users.get(to)?.isConnected = true;
    }
    if (users.has(socket.id)) {
      //@ts-ignore
      users.get(socket.id)?.isConnected = true;
    }

    socket.to(to).emit("peer:call:accepted", {
      from: socket.id,
      user: users.get(socket.id),
      offer,
    });

    const whiteboardID = uuidV4();
    io.to([to, socket.id]).emit("whiteboard:id", { whiteboardID });

    io.emit("refresh:user-list");
  });

  socket.on("peer:negotiate", (data) => {
    const { to, offer } = data;

    socket.to(to).emit("peer:negotiate", { from: socket.id, offer });
  });

  socket.on("peer:negosiate:result", (data) => {
    const { to, offer } = data;

    socket.to(to).emit("peer:negosiate:result", { from: socket.id, offer });
  });

  socket.on("whiteboard:drawing", (data) => {
    const { to } = data;

    socket.to(to).emit("whiteboard:data", { from: socket.id, data: data });
  });

  socket.on("chat:message", (data) => {
    const { to, message } = data;
    socket.emit("chat:message", {
      from: socket.id,
      message,
      self: true,
      user: users.get(socket.id),
    });
    socket.to(to).emit("chat:message", {
      from: socket.id,
      message,
      user: users.get(socket.id),
    });
  });

  socket.on("disconnect", () => {
    users.delete(socket.id);
    io.emit("user-disconnected", { socketId: socket.id });
    io.emit("refresh:user-list");
  });
});


