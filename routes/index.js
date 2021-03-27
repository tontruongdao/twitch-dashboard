const routes = require("express").Router();

const getGames = require("./games");
const getStreams = require("./streams");

routes.get("/", (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Connected!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});


// /api/game
routes.use("/game", getGames);
routes.use("/stream", getStreams);

module.exports = routes;