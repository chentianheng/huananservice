// const Request = require('../request.js');
const Api = require('../api.js');
const Tools = require('../tools.js');
let Order = {
  postOrder(data) {
    return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/wx/order',
        method: 'post',
        data: data,
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
  prepay(orderId) {
    return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/wx/order/prepay',
        method: 'post',
        isFormData:true,
        data: {
        orderId: orderId,
        }
      },
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        });
    });
  },
  listOrder(status) {
    let data = {};
    if (status) {
      data.status = status;
    }
    var url = '/api/wx/order';
    return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: url,
        method: 'GET',
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
  shopOrder(data) {
    var url = '/api/shop/order';
    return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: url,
        method: 'GET',
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
  getShopOne(id) {
    var url = `/api/shop/order/${id}`;
    return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: url,
        method: 'GET'
      },
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        });
    });
  },
  completeOrder(data) {
    return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/shop/order/complete',
        method: 'POST',
        isFormData:true,
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
  refund(orderId) {
    return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/shop/order/refund',
        method: 'POST',
        isFormData: true,
        data: {
          orderId: orderId,
          msg: ''
        }
      },
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        });
    });
  },
  vipSubmit:function(data){
    return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/wx/customer/submitOrder',
        method: 'post',
        data: data,
        isRes: true
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


module.exports = Order;