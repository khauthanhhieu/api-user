const express = require('express');
const router = express.Router();

const ProfileService = require('../services/auth/profile')

router.get('/', function (req, res) {
  console.log("GET '/profile'")
  const profileServiceObj = new ProfileService(req, res)
  profileServiceObj.getProfile()
})

module.exports = router;