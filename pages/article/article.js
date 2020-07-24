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
    title: '详情',
    classifyList:[
      {
        type:1,
        name:"平台加盟"
      },{
        type:2,
        name:"新能源汽车"
      },{
        type:3,
        name:"行业资讯"
      }],
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

    Article.getOne(articleId).then(function (res) {
      console.log('getArticle')
      console.log(res)
      let article = res.data.articleDTO;
      let classifyList = that.data.classifyList
      article.formatUpdated = app.util.getDateDiff(article.updateTime);
      for(let ii in classifyList){
        if(article.type == classifyList[ii].type){
          article.classifyName = classifyList[ii].name
        }
      }
      that.parseHtml(article);
      that.setData({
        article,
        title: article.title
      });
    })

  },
  

  parseHtml(article) {
    let that = this;
    let detail = article.content;
    WxParse.wxParse('detail', 'html', detail, that, 5);
  },
});