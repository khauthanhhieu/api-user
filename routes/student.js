const express = require('express');
const router = express.Router();

const StudentService = require('../services/student')

router.get("/getall", function(req, res) {
  console.log("GET '/getall")
  let studentServiceObj = new StudentService(req, res)
  studentServiceObj.getAll()
})

module.exports = router;