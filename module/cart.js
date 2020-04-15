// const Request = require('../request.js');
const Tools = require('../tools.js');
const Api = require('../api.js');

let Cart = {
  getList() {
    return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/wx/cart',
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
      url: '/api/wx/cart',
      method: 'get',
      isRes: true
    }) */

  },
  add(param) {
    return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/wx/cart/add',
        method: 'post',
        isRes: true,
        isFormData: true,
        data: param
      },
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        });
    });

   /*  return Request.request({
      url: '/api/wx/cart/add',
      method: 'post',
      isRes: true,
      isFormData: true,
      data: param
    }) */

  },
  remove(param) {
      return new Promise(function (resolve, reject) {
        Tools.requestByLogin({
            url: '/api/wx/cart/remove',
            method: 'post',
            isFormData: true,
            isRes: true,
            data: param
          },
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          });
      });

  /*   return Request.request({
      url: '/api/wx/cart/remove',
      method: 'post',
      isFormData: true,
      isRes: true,
      data: param
    }) */
  },
  removeList(data) {
     return new Promise(function (resolve, reject) {
       Tools.requestByLogin({
           url: '/api/wx/cart/removeList',
           method: 'post',
           isFormData: true,
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

   /*  return Request.request({
      url: '/api/wx/cart/removeList',
      method: 'post',
      isFormData: true,
      isRes: true,
      data: data
    }) */

  }
}

module.exports = Cart;