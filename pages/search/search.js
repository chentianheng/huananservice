// pages/search/search.js
const app = getApp()
const Search = require('../../module/search.js');
const Product = require('../../module/product.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleBarHeight: app.globalData.titleBarHeight,
    statusBarHeight: app.globalData.statusBarHeight,
    windowWidth: app.globalData.windowWidth,
    windowHeight: app.globalData.windowHeight,
    hot: [],
    goodList: [],
    search: {
      classifyId: '',
      name: '',
      year: '',
      productionTechnology: '',
      page: 1,
      pageSize: 20
    },
    showHot:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotSearchTea()
  },
  getHotSearchTea: function (e) {
    var that = this;
    var data = {
      type: 1,
      page: 1,
      pageSize: 10
    }
    Search.getHotSearch(data)
      .then(function (data) {
        console.log('Search')
        console.log(data);
        if (data.length > 0) {
          that.setData({
            hot: data
          })
        } else {
          that.setData({
            showHot: false
          })
        }
        wx.hideLoading({
          complete: (res) => {},
        })
      })
      .catch(function (data) {})
  },
  getList: function () {
    var that = this;
    console.log(that.data.search)
    Product.getList(that.data.search).then(function (data) {
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
    var temp = {
      classify: '',
      goods: []
    }
    /*  var h_goodList  = []
     var s_goodList  = [] */
    var productList = that.data.goodList
    for (var i in data) {
      /* for (var i in data[ii].products) {
        data[ii].products[i].product.price = data[ii].products[i].product.price / 100
        console.log(app)
        data[ii].products[i].product.createdAt = app.util.formatTime(new Date(data[ii].products[i].product.createdAt), true);
      }
      if (data[ii].showType == 2){
        h_goodList.push(data[ii])
      }else{
        s_goodList.push(data[ii])
      } */
      data[i].price = data[i].price / 100
      productList.push(data[i])
    }
    this.setData({
      goodList: productList,
      showHot: false
      /*       h_goodList: h_goodList,
            s_goodList: s_goodList */
    })
  },
  onSearchFocus:function(e){
    this.setData({
      showHot: true
    })
  },
  onConfirm: function (e) {
    console.log(e.detail.value)
    const that = this
    var teaName = e.detail.value
    that.data.search.name = teaName
    that.data.goodList = []
    that.getList()
    that.setData({
      search: that.data.search,
      inputVal: name
    })
  },
  onHotTap: function (e) {
    console.log('onHotTap')
    console.log(e)
    const that = this
    var name = e.currentTarget.dataset.name;
    that.data.search.name = name
    that.data.goodList = []
    that.getList()
    that.setData({
      search: that.data.search
    })
  },
  onGoodTap:function(e){
    console.log(e.detail.data)
    wx.navigateTo({
      url: '../detail/detail?productId=' + e.detail.data.id,
    })
  },
  onBackTap:function(e){
    wx.navigateBack({})
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