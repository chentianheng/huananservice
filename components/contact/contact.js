// components/contact/contact.js
Component({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    callByTap(){
      wx.makePhoneCall({
        phoneNumber: '13711701527',
      })
    },
    serviceByTap(){
     
    }
  }
})