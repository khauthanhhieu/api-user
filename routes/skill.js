const express = require('express');
const router = express.Router();

const skillService = require('../services/skill')

router.get("/", function(req, res) {
  console.log("GET '/skill'")
  let skillServiceObj = new skillService(req, res)
  skillServiceObj.getAll()
})

module.exports = router;