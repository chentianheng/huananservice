// pages/address/address.js

const Address = require('../../module/address.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleBarHeight:app.globalData.titleBarHeight,
    statusBarHeight:app.globalData.statusBarHeight,
    windowWidth:app.globalData.windowWidth,
    windowHeight:app.globalData.windowHeight,
    title:'收获地址',
    name: '',
    phone: '',
    checked: true,
    msg:'默认地址',
    addressList:[],
    items: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'FRA', value: '法国' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.listAddress();
  },
  listAddress() {
    let that = this;
    Address.listAddress().then(function(data) {
      that.setData({
        addressList: data
      })
    })
  },
  selectAddress(e) {
    // console.log(e);
    let index = e.currentTarget.dataset.index;
    Address.touchAddress(this.data.addressList[index].id).then(function(data) {
      console.log(data);
      wx.navigateBack({
        delta: 1,
      })
    })
  },
  onbackTap(){
    wx.navigateBack({
      
    })
  },
  onEdit(e)  {
    let id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../newaddress/newaddress?id=' + id,
    })
  },
  onCreat()  {
    wx.navigateTo({
      url: '../newaddress/newaddress',
    })
  },
  onChooseAddressTap: function (e) {
    const that = this
    if (wx.chooseAddress) {
      wx.chooseAddress({
        success: function (res) {
          console.log(JSON.stringify(res))
          let address = {
            userName: res.userName,
            telNumber: res.telNumber,
            provinceName: res.provinceName,
            cityName: res.cityName,
            countyName: res.countyName,
            detailInfo: res.detailInfo
          };
          that.setData({
            address: address
          })
          console.log(address)
           that.onSave(address)
        },
        fail: function (err) {
          console.log(JSON.stringify(err))
        }
      })
    } else {
      console.log('当前微信版本不支持chooseAddress');
    }
  },
  onSave(address) {
    let that = this;
    console.log(address);
    Address.postAddress(address).then(function (data) {
      console.log(data);
      that.listAddress();
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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