const StudentService = require('../student')
const TeacherService = require('../teacher')
const jwt = require('jsonwebtoken')

class ProfileService {
  constructor(req, res) {
    this.req = req
    this.res = res
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

module.exports = ProfileService;