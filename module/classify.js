// const Request = require('../request.js');
const Tools = require('../tools.js');
const Api = require('../api.js');

let Classify = {
  /**********************************************
    function:   getAdvertising
    author:     hcj
    ulr:        '/api/wx/ads'
    desc:       get Advertise(banner) from service
    date:       2019-01-28
  ************************************************/
 getList() {
    return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/wx/product/classify',
        method: 'get',
        isRes: true
      },
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        });
    });

   /*  return Request.request({
      url: '/api/wx/product/classify',
        method: 'get',
        isRes: true
    }) */
  }
}

module.exports = Classify;