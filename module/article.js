const Request = require('../request.js');
const Api = require('../api.js');

let Article = {
  getList(data) {
    return Request.request({
      url: '/api/wx/article',
      method: 'get',
      isRes: true,
      data: data
    })
  },
  getOne(id) {
    return Request.request({
      url: '/api/wx/article'+ '/' + id,
      method: 'get',
      isRes: true
    })
  },
  getClassify(data) {
    return Request.request({
      url: '/api/wx/article/classify',
      method: 'get',
      isRes: true
    })
  },
}


module.exports = Article;