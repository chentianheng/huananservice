// pages/my/my.js
const app = getApp()
const Order = require('../../module/order.js');
const Customer = require('../../module/customer.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleBarHeight:app.globalData.titleBarHeight,
    statusBarHeight:app.globalData.statusBarHeight,
    windowWidth:app.globalData.windowWidth,
    windowHeight:app.globalData.windowHeight,
    serviceList:[
      {
        name:'购物车',
        url:'/images/icons/list_icons_1.png',
        path:'../cart/cart',
        show:true
      },
      {
        name:'我的收藏',
        url:'/images/icons/ic_main_shop.png',
        path:'',
        show:false
      },
      {
        name:'分销商',
        url:'/images/icons/ic_main_loan.png',
        path:'../distributor/distributor',
        show:true
      }
    ],
    imgUrl:'/images/icons/acvartar.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* var data = {
      "addressId":1
    }
    this.vipSubmit(data) */
    this.getCustomer()
  },
  vipSubmit:function(data){
    Order.vipSubmit(data).then(function (data) {
      console.log(data)
    })
  },

  getCustomer:function(e){
    const that = this
    Customer.getCustomer().then(function (data) {
      console.log(data)
      if(data){
        that.data.serviceList[2].show = true
      }else{
        that.data.serviceList[2].show = false
      }
      that.setData({
        customer:data,
        serviceList: that.data.serviceList
      })
    })
  },
  getUserInfo: function(e) {
    console.log(e.detail.userInfo);
    if (e.detail.userInfo) {
      console.log('queding');
      this.postUserInfo(e.detail.userInfo);
    } else {
    }
  },
  postUserInfo: function(data) {
    var url = `${app.api.userInfo}`;
    var that = this;
    var data = {
      "nickName": data.nickName,
      "gender": data.gender,
      "country": data.country,
      "province": data.province,
      "city": data.city,
      "avatarUrl": data.avatarUrl
    }
    app.apiFunctions.requestUrl(
      url,
      'POST',
      true,
      false,
      data,
      function(data) {
        if (data.status == 1) {
          console.log(data);
          that.getCustomer()
        }
      }
    );
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