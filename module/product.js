const Request = require('../request.js');
const Api = require('../api.js');

let Product = {
  getOne(id) {
    return Request.request({
      url: '/api/wx/product' + '/' + id,
      method: 'get',
      isRes: true,
    })
  },
  getList(data) {
    return Request.request({
      url: '/api/wx/product',
      method: 'get',
      isRes: true,
      data: data
    })
  },
  getProductList(data) {
    return Request.request({
      url: '/api/wx/product/list',
      method: 'get',
      isRes: true,
      data: data
    })
  }
}


module.exports = Product;