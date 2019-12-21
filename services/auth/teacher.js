const passport = require('passport')
const jwt = require('jsonwebtoken');

class AuthTeacherService {
  constructor(req, res) {
    this.req = req
    this.res = res
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
      const token = jwt.sign({ _id: user._id, role: "1" }, 'doctor', { expiresIn: '2h' });
      this.res.cookie('access_token', token, {
        maxAge: 2 * 60 * 60 * 100,
      })
      return this.res.json({ isSuccess: true, token })
    })(this.req, this.res)
  }
}

module.exports = AuthTeacherService;