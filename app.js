const express = require('express')
const app = express()

const jwt = require('jsonwebtoken');
//const passport = require('./passport')
//const AuthService = require('./services/auth')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

var cookieParser = require('cookie-parser');
app.use(cookieParser())

// Router
const studentRouter = require('./routes/student');

// user Router
//app.use('/api/user', userRouter);

app.get('/', function (req, res) {
  res.send('Xin chào, đây là API người dùng')
})

app.use('/api/student', studentRouter);

app.get('/api/me', function(req, res) {
  console.log("GET '/me'")
  let authService = new AuthService(req, res)
  authService.getMe()
})

app.listen(3000, function () {
  console.log('Web app service listening on port 3000!')
})