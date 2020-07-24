// const Request = require('../request.js');
const Tools = require('../tools.js');
const Api = require('../api.js');

let Distributor = {
  getDistributorMsg(data) {
     return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/wx/distributor',
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
      url: '/api/wx/distributor',
        method: 'get',
        isRes: true
    }) */
  },
 getProfits(data) {
     return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/wx/distributor/profit',
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
      url: '/api/wx/distributor/profit',
      method: 'get',
      isRes: true
    }) */
  },
  getWithdraws(data) {
     return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/wx/distributor/withdraw',
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
      url: '/api/wx/distributor/withdraw',
        method: 'get',
        isRes: true
    }) */
  },
  getDistributor(data) {
     return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/wx/distributor/account',
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

    /* return Request.request({
      url: '/api/wx/distributor/account',
        method: 'get',
        isRes: true
    }) */
  },
  setRelate(data){
    return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/wx/distributor/relate',
        method: 'post',
        isRes: true,
        isFormData: true,
        data:data
      },
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        });
    });

    /* return Request.request({
      url: '/api/wx/distributor/relate',
        method: 'post',
        isRes: true,
        isFormData: true,
        data:data
    }) */
  },
  logout(){
     return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/wx/distributor/logout',
        method: 'post',
        isRes: true
      },
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        });
    }); 

    /* return Request.request({
      url: '/api/wx/distributor/logout',
        method: 'post',
        isRes: true
    }) */
  },
  getSubordinate(data) {
    return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/wx/distributor/subordinate',
        method: 'get',
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

   /*  return Request.request({
      url: '/api/wx/distributor/subordinate',
        method: 'get',
        isRes: true,
        data:data
    }) */
  },
  getSubordinateCount(){
    return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/wx/distributor/subordinate/count',
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
  bindStaff(data){
    return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/wx/distributor/bindStaff',
        method: 'post',
        isRes: true,
        isFormData: true,
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
  bindCustomer(data) {
    return new Promise(function (resolve, reject) {
      Tools.requestByLogin({
        url: '/api/wx/customer/bind',
        method: 'post',
        isRes: true,
        isFormData: true,
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

module.exports = Distributor;