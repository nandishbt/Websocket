import express from "express";
import http from "http";
import {Server} from "socket.io";

const app = express(); //for http req, res
const server = http.createServer(app);  // server for http and ws connections
const io = new Server(server); // for ws connections

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("./public/index.html", { root: __dirname });
});

io.on("connection", (socket) => {
  socket.on("message",(msg)=>{
    let reply='Hello from server'
    if(msg==='hi'){
      reply='hell0 boss'

    }
    if(msg==='how are you'){
      reply='I am fine, thank you'
    }
    io.emit("message_c", reply) //send to all clients including sender
    io.to(socket.id).emit("message_c", reply) //send to sender only
  })
  });


server.listen(3000, () => {
  console.log("Server is running on port 3000");
});