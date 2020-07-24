const Api = require('../api.js');
const Tools = require('../tools.js');

let Postage = {
  listPostage(data) {
     return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/wx/postage',
        method: 'get',
        isRes: true,
      },
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        });
    }); 

    return Request.request({
      url: '/api/wx/postage',
        method: 'get',
        isRes: true,
        data:data
    })

  },
}


module.exports = Postage;