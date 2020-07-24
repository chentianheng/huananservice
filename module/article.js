const Request = require('../request.js');
const Api = require('../api.js');

let Article = {
  getList(data) {
    return Request.request({
      url: '/api/article/getArticleList.json',
      method: 'post',
      isRes: true,
      isFormData: true,
      data: data
    })
  },
  getOne(id) {
    return Request.request({
      url: '/api/article/getArticle.json?articleId='+ id,
      method: 'post',
      isRes: true
    })
  },
}


module.exports = Article;