const express = require('express');
const router = express.Router();

const TeacherService = require('../services/teacher')
const AuthTeacherService = require('../services/auth/teacher')

router.get("/getall", function(req, res) {
  console.log("GET '/teacher/getall'")
  let teacherServiceObj = new TeacherService(req, res)
  teacherServiceObj.getAll()
})

router.post("/login", function(req, res) {
  console.log("POST '/teacher/login'")
  let authTeacherServiceObj = new AuthTeacherService(req, res)
  authTeacherServiceObj.login();
})

module.exports = router;