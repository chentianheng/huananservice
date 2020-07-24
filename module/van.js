const Request = require('../request.js');
const Api = require('../api.js');

let Van = {
  // 获取用户个人中心的资料
  getTruckList(data) {
    return Request.request({
      url: '/api/index/getTruckList.json',
      method: 'post',
      isRes: true,
      isFormData: true,
      data:data
    })
  },
  // 查看用户之前的填写记录
  getTruckDetail(data) {
    return Request.request({
      url: '/api/index/getTruckDetail.json',
      method: 'post',
      isRes: true,
      isFormData: true,
      data:data
    })
  }
}

module.exports = Van;