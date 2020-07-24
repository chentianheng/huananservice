// pages/list/list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},
  onShow:function(){
    console.log('show')
    let that = this
    setTimeout(function() {
      that.jumpOther()
   }, 500);
  },
  onLoad(){
  //   console.log('load')
  //   let that = this
  //   setTimeout(function() {
  //     that.jumpOther()
  //  }, 1000);
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