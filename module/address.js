const Request = require('../request.js');
const Api = require('../api.js');

let Address = {
  listAddress() {
    return Request.request({
      url: '/api/wx/address',
      method: 'get',
    })
  },
  getAddress(id) {
    return Request.request({
      url: '/api/wx/address' + '/' + id,
      method: 'get',
    })
  },
  getDefaultAddress() {
    return Request.request({
      url: '/api/wx/address/default',
      method: 'get',
    })
  },
  postAddress(data) {
    return Request.request({
      url: '/api/wx/address',
      method: 'post',
      data: data,
    })
  },
  putAddress(id, data) {
    return Request.request({
      url: '/api/wx/address' + '/' + id,
      method: 'put',
      data: data,
    })
  },
  touchAddress(id) {
    return Request.request({
      url: '/api/wx/address/touch',
      method: 'post',
      data: {
        addressId: id,
      },
      isFormData:true,
    })
  },

}


module.exports = Address;