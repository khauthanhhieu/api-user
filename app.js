const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
const passport = require('./passport')
//const AuthService = require('./services/auth')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

var cookieParser = require('cookie-parser');
app.use(cookieParser())

// Router
const studentRouter = require('./routes/student')
const teacherRouter = require('./routes/teacher')
const addressRouter = require('./routes/address')
const skillRouter = require('./routes/skill')
const profileRouter = require('./routes/profile')


app.get('/', function (req, res) {
  res.send('Xin chào, đây là API người dùng')
})

app.use('/api/student', studentRouter)
app.use('/api/teacher', teacherRouter)
app.use('/api/address', addressRouter)
app.use('/api/skill', skillRouter)
app.use('/api/profile', profileRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Web app service listening on port ${PORT}!`)
})