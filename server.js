const express = require('express')
const app = express()
require('dotenv').config();
const https = require('https');
const fs = require('fs');

const PORT = process.env.PORT
const REDIRECT_URL = process.env.REDIRECT_URL

/*  EXPRESS */

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

app.get('/google', function (req, res) {
  res.render('pages/google')
})

app.get('/', function (req, res) {
  res.render('pages/auth')
})

// const options = {
//   key: fs.readFileSync(`${process.env.PRIVATEKEY}`),
//   cert: fs.readFileSync(`${process.env.CERT}`),
//   ca: fs.readFileSync(`${process.env.CA}`)
// };

// WITH SSL
// https.createServer(options, app).listen(PORT, () => console.log('App listening on port ' + PORT))

// LOCAL
app.listen(PORT, () => console.log('App listening on port ' + PORT))
