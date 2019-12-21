const express = require('express');
const router = express.Router();

const AddressService = require('../services/address')

router.get("/city", function (req, res) {
  let addressServiceObj = new AddressService(req, res)
  addressServiceObj.getAllCity()
})

router.get("/district", function(req, res) {
  let addressServiceObj = new AddressService(req, res)
  addressServiceObj.getDistrictOfCity()
})

router.get('/ward', function(req, res) {
  let addressServiceObj = new AddressService(req, res)
  addressServiceObj.getWardOfDistrict()
})

module.exports = router;