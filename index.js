const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const morgan = require("morgan");
const path = require("path");
const { getToken, getStreams, getGames, getViews } = require("./helpers");
require("dotenv").config();

const port = process.env.PORT || 4000;
const { json } = require("body-parser");

const buildPath = path.join(__dirname, "client/build");

const app = express();

app
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static(buildPath))

  // .get("/api/games", async (req, res) => {
  //   try {
  //     const AT = await getToken("https://id.twitch.tv/oauth2/token");
  //     const GAMES = await getGames("https://api.twitch.tv/helix/games", AT);

  //     res.send(GAMES);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // })

  // .get("/api/views", async (req, res) => {
  //   try {
  //     const AT = await getToken("https://id.twitch.tv/oauth2/token");
  //     const GAMES = await getGames("https://api.twitch.tv/helix/games", AT);
  //     const VIEWS = await getStreams(
  //       "https://api.twitch.tv/helix/streams",
  //       GAMES,
  //       AT
  //     );
  //     res.send(VIEWS);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // })

  if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }

const server = http.createServer(app);


// ###########   Socket.io
const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true
    }
});

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 10000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = async socket => {
  const response = new Date();
  const game = await getViews()
  socket.emit("FromAPI", game);
};

server.listen(port, () => console.log(`Listening on port ${port} `));