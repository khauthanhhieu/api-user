const AuthService = require('./user')

class AuthStudentService extends AuthService {
  constructor(req, res) {
    super(req, res);
    this.role = "2"
  }
}

module.exports = AuthStudentService;