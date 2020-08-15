//index.js
//获取应用实例
const app = getApp();
const Ads = require('../../module/ads.js');
const Index = require('../../module/index.js');
const User = require('../../module/user.js');

Page({
  data: {
    bannerList:[],
    classificationDTOList: [], 
    fixedBanner:[
      {
        id:6,
        name:'如期出行',
        image:'https://dwh.yf-gz.cn/file/1596264194746_6aed6a2352b9cee168813ee0707da5a5.jpg'
      }, {
        id: 7,
        name: 'T3',
        image: 'https://dwh.yf-gz.cn/file/1596264197383_fee1f4242ec3c2d1686ad126a6708ae6.jpg'
      }, {
        id: 24,
        name: '滴滴货运',
        image: 'https://dwh.yf-gz.cn/file/1597118241195_3fb716735f137d81f0c6cdb5131aac15.jpg'
      }, {
        id: 9,
        name: '携程',
        image: 'https://dwh.yf-gz.cn/file/1596264201955_7315545ffea9696aaeb76bc5903076a5.jpg'
      },
    ]
  },
  onLoad: function (options) {
    this.getAdvertising()
    this.getIndex()
  },
  onShow(){
    this.recordPath()
  },
  recordPath(){
    let data={
      pagePath :'主页'
    }
    User.recordingPath(data).then(res =>{

    })
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
    if (e.target.id == 2 || e.target.id == 3 ){
        wx.navigateTo({
          url: '../classifydetail/classifydetail?id='+ e.target.id,
        })
    }else if(e.target.id == 1){
      wx.navigateTo({
        url: '../vanlist/vanlist'
      })
    }else if(e.target.id == 5){
       wx.showToast({
        title: '敬请期待',
      })
    }else{
      // e.target.id == 5
      wx.navigateTo({
        url: '../charging/charging',
      })
      // wx.showToast({
      //   title: '敬请期待',
      // })
    }
  },
  onBannerTap(e) {
    // 其他页面的话还需要处理跳转
    // let classificationId = this.data.classificationId
    // console.log(e)
    // if (classificationId == 2) {
      //携带ID跳转到info页面
      wx.navigateTo({
        url: '../secclassifydetail/secclassifydetail?twoClassificationId=' + e.currentTarget.id
      })
    // } 
  },
  getUserInfo: function (e) {
    console.log(e.detail.userInfo);
    let that = this;
    if (e.detail.userInfo) {
      console.log('确定');
      wx.login({
        complete: (res) => {
          console.log('code', res.code);
          that.postUserInfo(e.detail.userInfo, res.code, e);
        },
      })

    } else {
    }
  },
  postUserInfo: function (data, code, e) {
    var url = `${app.api.userInfo}`;
    var telephone = 15521026970;
    var that = this;
    var data = {
      "name": data.nickName,
      "telephone": telephone,
      "avatar": data.avatarUrl,
      "code": code,
      "city": data.city,
      "country": data.country
    }
    app.apiFunctions.requestUrl(
      url,
      'POST',
      true,
      true,
      data,
      function (data) {
        console.log(data);
        if (data.status == '2000000') {
          console.log(data);
          let user = data.data.appLoginUser;
          wx.setStorageSync('token', user.sessionId)
          // that.getCustomer()
          that.onBannerTap(e)
        }
      }
    );
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
   
  }
})