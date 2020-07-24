//index.js
//获取应用实例

const Ads = require('../../module/ads.js');
const Index = require('../../module/index.js');

Page({
  data: {
    bannerList:[],
    classificationDTOList:[]
  },
  onLoad: function (options) {
    this.getAdvertising()
    this.getIndex()
  },

  getAdvertising: function (e) {
    var that = this;
    let bannerList = that.data.bannerList
    var data = {
      position : 1
    }
    Ads.getAds(data).then(function (res) {
      // console.log('ad',res.data.adDTOList)
      bannerList = res.data.adDTOList
      that.setData({
        bannerList
      })
    })
  },
  
  getIndex(){
    let that = this
    let classificationDTOList = that.data.classificationDTOList
    Index.getIndex().then(function(res){
      classificationDTOList = res.data.classificationDTOList
      that.setData({
        classificationDTOList
      })
    })
  },
  onDetailTap(e){
    // console.log(e)
    if(e.target.id == 2 || e.target.id == 3 ){
        wx.navigateTo({
          url: '../classifydetail/classifydetail?id='+ e.target.id,
        })
    }else if(e.target.id == 1){
      wx.navigateTo({
        url: '../vanlist/vanlist'
      })
    }else{
      // e.target.id == 5
      // wx.navigateTo({
      //   url: '../secclassifydetail/secclassifydetail?twoClassificationId=19',
      // })
      wx.showToast({
        title: '敬请期待',
      })
    }
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
  onShareAppMessage: function (options) {
   
  }
})