// components/retail/retail.js
let app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: 0,
      // observer: function (newVal, oldVal) { }
    },
    hidden:{
      type: Boolean,
      value: 0,
    },
    whiteBg: {
      type: Boolean,
      value: 0,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    titleBarHeight: app.globalData.titleBarHeight,
    statusBarHeight: app.globalData.statusBarHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onbackTap(){
      wx.navigateBack({
        fail: function () {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      })
    },
    onbackHomeTap(){
      console.log('onbackHomeTap')
       wx.switchTab({
         url: '/pages/index/index',
       })
    }
  }
})
