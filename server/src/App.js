const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { clearInterval } = require("timers");
const opc = require("../dist/opc/opc-client");
//CORS specifica i metodi e le funzionalità permesse sul server
const port = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);
const controller = require("./db/controller");

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let interval;

io.on("connect", (socket) => {
  console.log("New socket connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    emitStatus(socket);
    emitJobs(socket);
    emitCycles(socket);
  }, 2000);

  socket.on("disconnect", () => {
    console.log("socket disconnected");
    socket.disconnect;
    clearInterval(interval);
  });

  const emitJobs = async (socket) => {
    socket.emit("jobs", await controller.getJobs());
  };

  const emitStatus = (socket) => {
    socket.emit("status", opc.endpoints);
  };

  const emitCycles = async (socket) => {
    socket.emit("cycles", await controller.getCycles());
  };

  socket.on("new job", (DATA) => {
    opc.sendJob(DATA);
    controller.setJob(DATA);
    console.log("Dati inviati !");
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
