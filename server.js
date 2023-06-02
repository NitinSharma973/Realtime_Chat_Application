const express = require("express");
const { emit } = require("process");

const app = express();
const http = require("http").createServer(app);

const Port = process.env.Port || 3000;

http.listen(Port, () => {
  console.log(`listen on port ${Port}`);
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//socket

const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("connected..");

  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
