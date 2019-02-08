const express = require('express');
const cors = require('cors')
var bodyParser = require('body-parser');
const app = express();
const jsonfile = require('jsonfile')
const port = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json());

var whitelist = ['http://localhost', 'localhost']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/account_data', cors(corsOptionsDelegate), (req, res) => {
    res.sendFile(__dirname +'/Accounts.json');
});

app.get('/playlist_data', cors(corsOptionsDelegate), (req, res) => {
  res.sendFile(__dirname +'/Playlists.json');
});


app.post('/add_user', cors(corsOptionsDelegate), (req, res) => {
const file = __dirname +'/Accounts.json';
 console.log(req.body)
jsonfile.writeFile(file, req.body, { flag: 'a', spaces: 2, EOL: '\r\n' }, function (err) {
  if (err) console.error(err)
})

//var obj = JSON.parse(file);
//console.log(obj);
//obj.push(req.body);
//str = JSON.stringify(obj);

res.end('Yes');
});