// components/retail/retail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onShopTap:function(){
      wx.switchTab({
        url: '../list/list',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  }
})
