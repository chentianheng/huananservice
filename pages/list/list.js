// pages/list/list.js
const User = require('../../module/user.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  onShow:function(){
    console.log('show')
    let that = this
    that.recordPath()
    setTimeout(function() {
      that.jumpOther()
   }, 500);
  },
  recordPath() {
    let data = {
      pagePath: '商城'
    }
    User.recordingPath(data).then(res => {

    })
  },
  onLoad(){
  },
  jumpOther(){
    wx.navigateToMiniProgram({
      appId: 'wxc2088bd709a0f698',
      path: 'page/index/index',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'develop',
      success(res) {
        // 打开成功
        console.log('成功')
      },
      fail(){
        // wx.navigateBack({
        //   delta:1
        // })
        wx.switchTab({
          url: '../index/index',
        })
      }
    })
  }
  

  
})

// {
//   "pagePath": "pages/list/list",
//   "text": "商城",
//   "iconPath": "images/icons/shop_void.png",
//   "selectedIconPath": "/images/icons/shop.png"
// },