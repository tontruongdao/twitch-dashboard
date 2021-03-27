const getGames = require("express").Router();
const single = require("./single");

// api/game
getGames.get("/:id", single);

// getGames.get('/:id', (req, res) => {
//     res.send( {data: "hello"} )
// });


module.exports = getGames;