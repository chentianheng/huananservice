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
  getCustomer() {
    return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/wx/customer',
        method: 'get',
      },
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        });
    });
  }
}

module.exports = Qrcode;