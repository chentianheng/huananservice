// pages/subordinate/subordinate.js
var app = getApp();
const Distributor = require('../../module/distributor.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleBarHeight:app.globalData.titleBarHeight,
    statusBarHeight:app.globalData.statusBarHeight,
    windowWidth:app.globalData.windowWidth,
    windowHeight:app.globalData.windowHeight,
    title:'我的下线',
    subordinate:[],
    subordinateCount:0,
    search: {
      distributorId: '',
      page: 1,
      pageSize: 20
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    var distributorId = options.distributorId
    that.data.search.distributorId = distributorId
    that.setData({
      search:that.data.search
    })
    that.getSubordinate();
  },
  getSubordinate: function (e) {
    const that = this
    Distributor.getSubordinate(that.data.search).then(function (data) {
      var subordinate =  that.data.subordinate
      for(var idx in  data.data){
        subordinate.push(data.data[idx])
      }
      that.setData({
        subordinate:subordinate,
        subordinateCount: subordinate.length
      })

    })
  },
  bindStaff:function(e){
    console.log(e)
    var customerId = e.currentTarget.dataset.customerid
    var data = {
      customerId:customerId
    }
    Distributor.bindCustomer(data).then(function (data) {
      console.log(data)
      if(data.status  == 1){
        wx.showToast({
          title: '绑定成功',
        })
      }
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
    const that = this

    ++that.data.search.page;
    that.setData({
      search:that.data.search
    }) 


    that.getSubordinate()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})