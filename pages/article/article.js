const WxParse = require('../../wxParse/wxParse.js');
const Article = require('../../module/article.js');
let app = getApp();
Page({
  data: {
    titleBarHeight:app.globalData.titleBarHeight,
    statusBarHeight:app.globalData.statusBarHeight,
    windowWidth:app.globalData.windowWidth,
    windowHeight:app.globalData.windowHeight,
    articleId: null,
    article: {},
    title: '详情'
  },

  onLoad: function(options) {
    this.data.articleId = options.articleId;
    this.getArticle();
  },

  onShareAppMessage: function(res) {
    let articleId = this.data.articleId;
    return {
      path: `pages/article/article?articleId=${articleId}`
    }
  },

  getArticle() {
    const that = this;
    let articleId = that.data.articleId;
    /* Ajax.prototype.getArticleOne(articleId).then(res => {
      let article = res.data.data;
      that.parseHtml(article);
      that.setData({
        article
      });
    }); */

    Article.getOne(articleId).then(function (data) {
      console.log('getArticle')
      console.log(data)
      let article = data.data;
      article.formatUpdated = app.util.getDateDiff(article.updatedAt);
      that.parseHtml(article);
      that.setData({
        article,
        title: article.title
      });
    })

  },
  

  parseHtml(article) {
    let that = this;
    let detail = article.content.content;
    WxParse.wxParse('detail', 'html', detail, that, 5);
  },
});