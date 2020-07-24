// const Request = require('../request.js');
const Tools = require('../tools.js');
const Api = require('../api.js');

let Comment = {
  /**********************************************
    function:   getTag
    author:     stenry
    ulr:        '/api/wx/ads'
    desc:       get commentTag from service
    date:       2020-05-04
  ************************************************/
  getTag() {
    return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/wx/product/appraise/tag',
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

  },
  postComment(data) {
    return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/wx/product/appraise',
        method: 'post',
        isRes: true,
        data:data
      },
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        });
    });

  },
  getComment(data) {
    return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/wx/product/appraise',
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

  },
}

module.exports = Comment;