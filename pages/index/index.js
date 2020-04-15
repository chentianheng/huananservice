//index.js
//获取应用实例
const app = getApp()
const Classify = require('../../module/classify.js');
const Showcase = require('../../module/showcase.js');
const Product = require('../../module/product.js');
const Ads = require('../../module/ads.js');
Page({
  data: {
    titleBarHeight: app.globalData.titleBarHeight,
    statusBarHeight: app.globalData.statusBarHeight,
    windowWidth: app.globalData.windowWidth,
    windowHeight: app.globalData.windowHeight,
    search: {
      page: 1,
      pageSize: 20
    },
    bannerList: [],
    classifyList: []
  },
  onLoad: function () {
    const that = this
    that.getList()
    that.getIconsList()
    that.getAdvertising()
    /* console.log(app.globalData.classifyList)
    that.data.classifyList  = app.globalData.classifyList
    that.setData({
      classifyList:that.data.classifyList
    }) */
  /*   this.getIconsList() */
  },
  getAdvertising: function (e) {
    var that = this;
    var data = {
      type: 'banner'
    }
    Ads.getAds(data).then(function (data) {
      if (data.status == 1) {
        that.setData({
          bannerList: data.data
        })
      }
    })
  },
  getIconsList: function (e) {
    var that = this;
    Classify.getList().then(function (data) {
      if (data.status == 1) {
        app.globalData.classifyList = data.data
        that.setData({
          classifyList: data.data,
          classify: data.data[0].name
        })
      }
    })
  },
  getList: function () {
    var that = this;
    console.log(that.data.search)
    Showcase.getList(that.data.search).then(function (data) {
      console.log(data.status)
      if (data.status == 1) {
        if (data.data.length > 0) {
          that.processProdcutData(data.data)
        } else {
          that.setData({
            goodList: []
          })
        }

      }
    })
  },
  processProdcutData: function (data) {
    console.log(data)
    const that = this
    var productList = []
    var temp = {
      classify: '',
      goods: []
    }
    var h_goodList = []
    var s_goodList = []
    var flag = false
    for (var ii in data) {
      for (var i in data[ii].products) {
        data[ii].products[i].product.price = data[ii].products[i].product.price / 100
        console.log(app)
        data[ii].products[i].product.createdAt = app.util.formatTime(new Date(data[ii].products[i].product.createdAt), true);
      }
      if (data[ii].showType == 2) {
        h_goodList.push(data[ii])
      } else {
        s_goodList.push(data[ii])
      }
      productList.push(data[ii])
    }
    this.setData({
      goodList: productList,
      h_goodList: h_goodList,
      s_goodList: s_goodList
    })
  },
  onGoodTap: function (e) {
    console.log('onGoodTap')
    console.log(e)
    wx.navigateTo({
      url: '../detail/detail?productId=' + e.detail.data.product.id,
    })
  },
  onTeaTap: function (e) {
    console.log('onTeaTap')
    console.log(e.detail.data)
    var obj = e.detail.data
    wx.navigateTo({
      url: '../detail/detail?productId=' + obj.product.id + '&teaId=' + obj.product.teaId,
    })
  },
  onIconTap: function (e) {
    var icon = e.detail.data
    console.log(icon)
    app.globalData.classifyId = icon.id
    wx.switchTab({
      url: '../list/list',
    })
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