const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// create a GET route
app.get('/express_backend', (req, res) => {
    res.sendFile(__dirname +'/Accounts.json');
});