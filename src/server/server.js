const scom = require('./serverCommunication.js');

const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const app = express();
const jsonfile = require("jsonfile");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

var whitelist = ['http://localhost', 'localhost','ponceplayer.com','http://ponceplayer.com']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/account_data", cors(corsOptionsDelegate), (req, res) => {
  res.sendFile(__dirname + "/Accounts.json");
});

app.get("/playlist_data", cors(corsOptionsDelegate), (req, res) => {
  res.sendFile(__dirname + "/Playlists.json");
});

//POST route to add a new user
app.post("/add_user", cors(corsOptionsDelegate), (req, res) => {
  const file = __dirname + "/Accounts.json"; //filepath

  jsonfile.readFile(file, function(err, obj) {
    //reads the existing json file
    if (err) console.error(err); //print errors

    obj.push(req.body); //inserts the new data into existing object

    jsonfile.writeFile(file, obj, { spaces: 2, EOL: "\r\n" }, function(err) {
      //overwrites existing file with new data
      if (err) console.error(err); //print errors
    });
  });
  res.end("True"); //just a response to the react app
});

app.post("/add_playlist", cors(corsOptionsDelegate), (req, res) => {
  const file = __dirname + "/Playlists.json"; //filepath

  jsonfile.readFile(file, function(err, obj) {
    //reads the existing json file
    if (err) console.error(err); //print errors

    // obj = JSON.parse(req.body); // turns request into json object
    obj = req.body;
    jsonfile.writeFile(file, obj, { spaces: 2, EOL: '\r\n' }, function (err) { //overwrites existing file with new json
      if (err) console.error(err) //print errors
    })

  })
  res.end('True'); //just a response to the react app
}); 

