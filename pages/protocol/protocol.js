// pages/protocol/protocol.js
var app = getApp();
const Article = require('../../module/article.js');
const WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleBarHeight:app.globalData.titleBarHeight,
    statusBarHeight:app.globalData.statusBarHeight,
    windowWidth:app.globalData.windowWidth,
    windowHeight:app.globalData.windowHeight,
    title: '注册协议',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOne()
  },
  getOne:function(e){
    const  that = this
    var articleId = 1
    Article.getOne(articleId).then(function(data) {
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})