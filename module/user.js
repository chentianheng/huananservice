const Request = require('../request.js');
const Api = require('../api.js');

let User = {
  // 获取用户个人中心的资料
  getPersonalInfo(data) {
    return Request.request({
      url: '/api/user/personalInfo.json',
      method: 'post',
      isRes: true,
      isFormData: true,
      data:data
    })
  },
  // 查看用户之前的填写记录
  getInfo(data) {
    return Request.request({
      url: '/api/user/getInfo.json',
      method: 'post',
      isRes: true,
      isFormData: true,
      data:data
    })
  },
  // 提交信息/api/user/recordingPath.json
  information(data) {
    return Request.request({
      url: '/api/user/information.json',
      method: 'post',
      isRes: true,
      isFormData: true,
      data:data
    })
  },
  // 记录用户最后路径
  recordingPath(data) {
    return Request.request({
      url: '/api/user/recordingPath.json',
      method: 'post',
      isRes: true,
      isFormData: true,
      data:data
    })
  },
}

module.exports = User;