const Request = require('../request.js');
const Api = require('../api.js');

let Search = {
  publishSearch: function (data) {
    return Request.request({
      url: '/api/wx/publish/search',
      method: 'get',
      data:data
    })
  },

  getHotSearch: function (data) {
    return Request.request({
      url: '/api/wx/search/hot',
      method: 'get',
      data:data
    })
  },
  getHistorySearch:function(data){
    return Request.request({
      url: '/api/wx/search/history',
      method: 'get',
      data:data
    })
  },
  searchBykeyword:function(data){
    return Request.request({
      url: '/api/wx/tea/searchKeywords',
      method: 'get',
      data:data
    })
  }
}

module.exports = Search;