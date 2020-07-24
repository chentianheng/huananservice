// pages/login/login.js
const app = getApp()
const Customer = require('../../module/customer.js');
const Distributor = require('../../module/distributor.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleBarHeight: app.globalData.titleBarHeight,
    statusBarHeight: app.globalData.statusBarHeight,
    windowWidth: app.globalData.windowWidth,
    windowHeight: app.globalData.windowHeight,
  },
  btnBack(){
    wx.navigateBack({
      
    })
  },
  getUserInfo: function (e) {
    console.log(e.detail.userInfo);
    if (e.detail.userInfo) {
      this.postUserInfo(e.detail.userInfo);
    } else {
      
    }
  },
  postUserInfo: function (data) {
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
      function (data) {
        if (data.status == 1) {
          console.log(data);
          wx.navigateBack({
            
          })
        }
      }
    );
  },
})