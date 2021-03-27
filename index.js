const express = require('express');
const bodyParser = require("body-parser"); 
const path = require('path');
const morgan = require("morgan"); // Helps with error message
const fetch = require("isomorphic-fetch"); //Uses fetch in express, from browser.

const routes = require('./routes')

const app = express();

// Allows us to do CRUD in BE
app.use(function (req, res, next) {
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

app.use(morgan("tiny"))
// app.use(express.static("./server/assets"))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/hello', (req, res) => {
    res.send( {data: "hello"} )
});

app.use('/api', routes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });

const port = process.env.PORT || 4000;
app.listen(port);


console.log(`App listening on ${port}`);