const getStreams = require("express").Router();
const single = require("./single");

// api/game
getStreams.get("/:id", single);

// getStreams.get('/', (req, res) => {
//     res.send( {data: "hello"} )
// });


module.exports = getStreams;