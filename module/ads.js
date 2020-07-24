const Request = require('../request.js');
const Api = require('../api.js');

let Ads = {
  getAds(data) {
    return Request.request({
      url: '/api/index/bannerList.json',
      method: 'post',
      isRes: true,
      isFormData: true,
      data: data
    })
  },
}


module.exports = Ads;