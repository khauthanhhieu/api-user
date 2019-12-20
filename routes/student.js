const express = require('express');
const router = express.Router();

const StudentService = require('../services/student')
const AuthStudentService = require('../services/auth/student')

router.get("/getall", function(req, res) {
  console.log("GET '/student/getall'")
  let studentServiceObj = new StudentService(req, res)
  studentServiceObj.getAll()
})

router.post("/login", function(req, res) {
  console.log("POST '/student/login'")
  let authStudentServiceObj = new AuthStudentService(req, res)
  authStudentServiceObj.login();
})

module.exports = router;