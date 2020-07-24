const Request = require('../request.js');
const Api = require('../api.js');

let Index = {
  getIndex() {
    return Request.request({
      url: '/api/index/index.json',
      method: 'post',
      isRes: true,
    })
  },
  getSecondClassify(data){
    return Request.request({
      url: '/api/index/twoClassification.json',
      method: 'post',
      isRes: true,
      isFormData: true,
      data:data
    })
  },
  // /api/index/getServiceDetail.json
  getServiceDetail(data){
    return Request.request({
      url: '/api/index/getServiceDetail.json',
      method: 'post',
      isRes: true,
      isFormData: true,
      data:data
    })
  },
}



module.exports = Index;