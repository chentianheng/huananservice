const Tools = require('../tools.js');
const Api = require('../api.js');

let Showcase = {
  getList(data) {
    return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/wx/showcase',
        method: 'get',
        isRes: true,
        data: data
      },
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        });
    });

    /* return Request.request({
      url: '/api/wx/showcase',
        method: 'get',
        isRes: true,
        data: data
    }) */
  }
}

module.exports = Showcase;