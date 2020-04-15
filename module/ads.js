const Request = require('../request.js');
const Api = require('../api.js');

let Ads = {
  getAds(data) {
    return Request.request({
      url: '/api/wx/ads',
      method: 'get',
      isRes: true,
      data: data
    })
  },
}


module.exports = Ads;