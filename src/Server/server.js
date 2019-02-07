const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;

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