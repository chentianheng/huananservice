// pages/linshi/linshi.js
const Article = require('../../module/article.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    articleId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var articleId = options.articleId
    this.setData({
      articleId:articleId
    })
    this.getArticle()
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
      let url = that.data.url;
      url = article.content;
      that.setData({
        url
      })
      // let classifyList = that.data.classifyList
      // article.formatUpdated = app.util.getDateDiff(article.updateTime);
      // for(let ii in classifyList){
      //   if(article.type == classifyList[ii].type){
      //     article.classifyName = classifyList[ii].name
      //   }
      // }
      // that.parseHtml(article);
      // that.setData({
      //   article,
      //   title: article.title
      // });
    })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})