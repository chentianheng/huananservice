const Tools = require('./tools.js');

let Request = {

  request(options) {
    return new Promise(function (resolve, reject) {
      Tools.requestByLogin(options,
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        });
    }
    );
  }
}

module.exports = Request;