const AuthService = require('./user')

class AuthTeacherService extends AuthService {
  constructor(req, res) {
    super(req, res)
    this.role = "1"
  }
}

module.exports = AuthTeacherService;