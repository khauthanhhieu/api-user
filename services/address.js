const axios = require('axios');

class AddressService {
  constructor(req, res) {
    this.baseURL = "https://thongtindoanhnghiep.co/api";
    this.req = req;
    this.res = res;
  }

  async getAllCityWithID() {
    return await axios.get(this.baseURL + "/city")
      .then((res) => {
        let data = res.data.LtsItem;
        return data.map(item => ({ ID: item.ID, name: item.Title }))
      })
  }

  async getAllCity() {
    return await this.getAllCityWithID()
      .then(
        (result) =>
          this.res.json({
            isSuccess: true,
            cities: result,
          })
      ).catch(
        (err) =>
          this.res.status(503).json({
            isSuccess: false,
            mess: "Lỗi kết nối !"
          })
      )
  }

  async getDistrictOfCity() {
    const id = this.req.query.id
    return await axios.get(this.baseURL + `/city/${id}/district`)
      .then(res => res.data)
      .then((result) =>
        this.res.json({
          isSuccess: true,
          districts: result.map(item => ({ ID: item.ID, name: item.Title })),
        })
      ).catch(
        (err) =>
          this.res.status(503).json({
            isSuccess: false,
            mess: "Lỗi kết nối !"
          })
      )
  }

  async getWardOfDistrict() {
    const id = this.req.query.id
    return await axios.get(this.baseURL + `/district/${id}/ward`)
      .then(res => res.data)
      .then((result) =>
        this.res.json({
          isSuccess: true,
          wards: result.map(item => ({ ID: item.ID, name: item.Title })),
        })
      ).catch(
        (err) =>
          this.res.status(503).json({
            isSuccess: false,
            mess: "Lỗi kết nối !"
          })
      )
  }  
}

module.exports = AddressService;