// pages/vanlist/vanlist.js
const Ads = require('../../module/ads.js');
const Van = require('../../module/van.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search:{
      pageSize:10,
      pageNumber:1,
    },
    list:[],
    bList:[]
  },
  onLoad: function (options) {
    this.getAdvertising()
    this.getVanList()
    this.getBVanList()
  },
  getAdvertising: function (e) {
    var that = this;
    let bannerList = that.data.bannerList
    var data = {
      position : 2
    }
    Ads.getAds(data).then(function (res) {
      // console.log('ad',res.data.adDTOList)
      bannerList = res.data.adDTOList
      that.setData({
        bannerList
      })
    })
  },
  getVanList(){
    let that = this
    let search = that.data.search
    search.twoClassificationId = 16
    let list = that.data.list
    Van.getTruckList(search).then(function(res){
      console.log('res.data',res.data.truckDTOList)
      that.setData({
        list:res.data.truckDTOList
      })
    })
  },
  getBVanList() {
    let that = this
    let search = that.data.search
    search.twoClassificationId = 17
    let bList = that.data.bList
    Van.getTruckList(search).then(function (res) {
      console.log('res.data', res.data.truckDTOList)
      that.setData({
        bList: res.data.truckDTOList
      })
    })
  },
  onDetailTap(e){
    wx.navigateTo({
      url: '../vandetail/vandetail?id=' + e.currentTarget.id,
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // let search = this.data.search
    // let num = search.pageSize
    // search.pageSize = num + 10 
    // this.setData({
    //   search
    // })
    // this.getVanList()
  },
})