// pages/info/info.js
const app = getApp()
const Article = require('../../module/article.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleBarHeight:app.globalData.titleBarHeight,
    statusBarHeight:app.globalData.statusBarHeight,
    windowWidth:app.globalData.windowWidth,
    windowHeight:app.globalData.windowHeight,
    title:'巅味学堂',
    classifyList:[],
    articleList:[],
    search:{
      page:1,
      pageSize:10,
      classifyId: '1'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getClassify()
    this.getList()
  },
  getList:function(e){
    var that = this;
    Article.getList(that.data.search).then(function(res) {
      if (res.status == 1) {
        that.processarticleList(res.data)
      }
    })
  },
  processarticleList(data) {
    var that = this;
    console.log(data)
    var articleList = that.data.articleList;
    var newList = [];
    for (var i = 0; i < data.length; i++) {
      data[i].formatUpdated = app.util.getDateDiff(data[i].createdAt)
      newList.push(data[i]);
    }
    if (newList != articleList){
      articleList = newList
    }
    that.setData({
      articleList: articleList
    })
  },
  getClassify:function(e){
    const  that = this
    Article.getClassify().then(function(res) {
      // console.log("返回分类：",res)
      if (res.status == 1) {
        for(var idx in res.data){
          if(idx  == 1){
            res.data[idx].choosed = true
          }else{
            res.data[idx].choosed = false
          }
        }
        that.setData({
          classifyList: res.data
        })
      }
    })
  },
  onArticleTap:function(e){
    console.log(e.detail.data)
    var article  = e.detail.data
    if(article.type=1){
      wx.navigateTo({
        url: '../article/article?articleId=' + article.id,
      })
    }else{
      wx.navigateTo({
        url: '../website/website?url=' + article.articleUrl,
      })
    }
  },
  onColumnChoose(e){
    // console.log("点击分类",e.currentTarget.dataset)
    let id  = e.currentTarget.dataset.id
    let classifyList = this.data.classifyList
    let search = this.data.search
    for (let idx in classifyList){
      if (id == classifyList[idx].id){
        classifyList[idx].choosed = true
        // console.log("该idx变成真了：",idx)
      }else{
        classifyList[idx].choosed = false
      }
    }
    search.classifyId = id
    this.setData({
      classifyList,
      search
    })
    this.getList()
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
    let search = this.data.search
    let num = search.pageSize
    search.pageSize = num + 10 
    this.setData({
      search
    })
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})