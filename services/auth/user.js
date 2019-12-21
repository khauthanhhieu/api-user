const StudentService = require('../student')
const TeacherService = require('../teacher')
const jwt = require('jsonwebtoken')
const passport = require('passport')

class AuthService {
  constructor(req, res) {
    this.req = req
    this.res = res
    this.role = undefined
  }

  login() {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        console.log(err)
        return this.res.json({ isSuccess: false })
      }
      this.req.login(user, { session: false }, (err) => {
        if (err)
          this.res.send(err)
      })
      const token = jwt.sign({ _id: user._id, role: this.role }, 'doctor', { expiresIn: '2h' });
      this.res.cookie('access_token', token, {
        maxAge: 2 * 60 * 60 * 100,
      })
      return this.res.json({ isSuccess: true, token })
    })(this.req, this.res)
  }

  async getProfile() {
    try {
      const verify = jwt.verify(this.req.headers['token'], 'doctor')
      const UserService = (verify.role == 1) ? TeacherService : StudentService
      const user = await UserService.findOneById(verify._id)
      return this.res.json({
        isSuccess: true,
        user: user,
      })
    } catch (err) {
      console.log(err)
      return this.res.status(403).json({
        isSuccess: false,
        mess: err,
      })
    }
  }
}

module.exports = AuthService;