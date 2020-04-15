// const Request = require('../request.js');
const Tools = require('../tools.js');
const Api = require('../api.js');

let Qrcode = {
  /**********************************************
    function:   getAdvertising
    author:     hcj
    ulr:        '/api/wx/ads'
    desc:       get Advertise(banner) from service
    date:       2019-01-28
  ************************************************/
  getQrcode(url) {
    return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: url,
        method: 'get',
      },
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        });
    });
/* 
    return Request.request({
      url: url,
      method: 'get',
    }) */
  }
}

module.exports = Qrcode;