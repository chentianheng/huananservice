const Request = require('../request.js');
const Api = require('../api.js');

let Charging = {
  // 获取用户充电桩列表的资料
  getChargingPileList(data) {
    return Request.request({
      url: '/api/index/getChargingPileList.json',
      method: 'post',
      isRes: true,
      isFormData: true,
      data: data
    })
  },
  // 查看充电桩详情
  getChargingPile(data) {
    return Request.request({
      url: '/api/index/getChargingPile.json',
      method: 'post',
      isRes: true,
      isFormData: true,
      data: data
    })
  }
}

module.exports = Charging;