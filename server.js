const express = require('express')
const app = express()
require('dotenv').config();
const https = require('https');
const fs = require('fs');

const LOCAL_PORT = process.env.LOCAL_PORT
const SSL_PORT = process.env.SSL_PORT
const REDIRECT_URL = process.env.REDIRECT_URL

/*  EXPRESS */

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

app.get('/my-documents/payslip', function (req, res) {
  const id = req.query.id
  res.redirect(`/users/sign_in?id=${id}`)
})

app.get('/users/sign_in', function (req, res) {
  const timestamp = Date.now()
  const id = req.query.id
  fs.appendFile('./data/landing.txt', `${timestamp},${id}\n`, function (err) {
    if (err) return console.log(err);
    console.log(`${timestamp},${id} > /data/landing.txt`);
  });
  res.render('pages/login', {
    googlePath: `/google?id=${id}`,
    microsoftPath: `/microsoft?id=${id}`,
    emailPath: `/email?id=${id}`,
    ssoPath: `/sso?id=${id}`,
  })
})

app.get('/google', function (req, res) {
  const timestamp = Date.now()
  const id = req.query.id
  fs.appendFile('./data/login-with-google.txt', `${timestamp},${id}\n`, function (err) {
    if (err) return console.log(err);
    console.log(`${timestamp},${id} > /data/login-with-google.txt`);
  });
  res.redirect(REDIRECT_URL)
})

app.get('/microsoft', function (req, res) {
  const timestamp = Date.now()
  const id = req.query.id
  fs.appendFile('./data/login-with-microsoft.txt', `${timestamp},${id}\n`, function (err) {
    if (err) return console.log(err);
    console.log(`${timestamp},${id} > /data/login-with-microsoft.txt`);
  });
  res.redirect(REDIRECT_URL)
})

app.get('/sso', function (req, res) {
  const timestamp = Date.now()
  const id = req.query.id
  fs.appendFile('./data/login-with-sso.txt', `${timestamp},${id}\n`, function (err) {
    if (err) return console.log(err);
    console.log(`${timestamp},${id} > /data/login-with-sso.txt`);
  });
  res.redirect(REDIRECT_URL)
})

app.post('/email', function (req, res) {
  const timestamp = Date.now()
  const id = req.query.id
  fs.appendFile('./data/login-with-email.txt', `${timestamp},${id}\n`, function (err) {
    if (err) return console.log(err);
    console.log(`${timestamp},${id} > /data/login-with-email.txt`);
  });
  res.redirect(REDIRECT_URL)
})

app.get('/', function (req, res) {
  const id = req.query.id
  res.redirect(`/users/sign_in?id=${id}`)
})


// LOCAL SERVER
app.listen(LOCAL_PORT, () => console.log('App listening on port ' + LOCAL_PORT))

// SERVER WITH SSL: uncomment the lines bellow and comment the local server line
// const options = {
//   key: fs.readFileSync(`${process.env.PRIVATEKEY}`),
//   cert: fs.readFileSync(`${process.env.CERT}`),
//   ca: fs.readFileSync(`${process.env.CA}`)
// };
// https.createServer(options, app).listen(SSL_PORT, () => console.log('App listening on port ' + SSL_PORT))
