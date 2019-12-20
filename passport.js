const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const StudentService = require('./services/student')
const TeacherSerivce = require('./services/teacher')

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
}, function (req, username, password, cb) {
  const role = req.body.role
  let UserService = undefined
  if (role == 1) {
    UserService = TeacherService
  } else {
    UserService = StudentService
  }
  return UserService.findOne(username, password)
    .then(user => {
      if (!user) {
        return cb(null, false, { isSuccess: false })
      }
      return cb(null, user, { isSuccess: true })
    }).catch(err => cb(err))
}))

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'doctor'
}, function (jwtPayload, cb) {
  const role = jwtPayload.role
  console.log(jwtPayload)
  return StudentService.findOneById(jwtPayload.id)
    .then(user => cb(null, user))
    .catch(err => cb(err));
}));