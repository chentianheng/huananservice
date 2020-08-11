// pages/my/my.js
const app = getApp()
const User = require('../../module/user.js');
// const Customer = require('../../module/customer.js');
// const Distributor = require('../../module/distributor.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleBarHeight:app.globalData.titleBarHeight,
    statusBarHeight:app.globalData.statusBarHeight,
    windowWidth:app.globalData.windowWidth,
    windowHeight:app.globalData.windowHeight,
    superiorId: '',
    serviceList:[
      {
        name:'购物车',
        url:'/images/icons/list_icons_1.png',
        path:'../cart/cart',
        show:false
      },
      {
        name:'我的收藏',
        url:'/images/icons/ic_main_shop.png',
        path:'',
        show:false
      },
      {
        name:'分销商',
        url:'/images/icons/ic_main_loan.png',
        path:'../distributor/distributor',
        show:false
      }
    ],
    imgUrl:'/images/icons/acvartar.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUser()
  },
  onShow() {
    this.recordPath()
  },
  recordPath() {
    let data = {
      pagePath: '个人中心'
    }
    User.recordingPath(data).then(res => {

    })
  },
  jumpOther(){
    wx.navigateToMiniProgram({
      appId: 'wxc2088bd709a0f698',
      path: 'page/me/me',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'develop',
      success(res) {
        // 打开成功
        console.log('成功')
      }
    })
  },
  callCusPhone(){
    wx.makePhoneCall({
      phoneNumber: '13711701527',
    })
  },
  callCopPhone(){
    wx.makePhoneCall({
      phoneNumber: '18565561104',
    })
  },
  openLocation(){
    wx.openLocation({
      name:'华南新能源汽车服务',
      address:'广州国际采购中心负一层',
      latitude: 23.098769,
      longitude: 113.370002,
    })
  },
  getUserInfo: function(e) {
    console.log(e.detail.userInfo);
    let that = this;
    if (e.detail.userInfo) {
      console.log('确定');
      wx.login({
        complete: (res) => {
          console.log('code',res.code);
          that.postUserInfo(e.detail.userInfo,res.code);
        },
      })
      
    } else {
    }
  },
  postUserInfo: function(data,code) {
    var url = `${app.api.userInfo}`;
    var telephone = 15521026970;
    var that = this;
    // var data = {
    //   "nickName": data.nickName,
    //   "gender": data.gender,
    //   "country": data.country,
    //   "province": data.province,
    //   "city": data.city,
    //   "avatarUrl": data.avatarUrl
    // }
    var data = {
      "name": data.nickName,
      "telephone":telephone,
      "avatar":data.avatarUrl,
      "code":code
    }
    app.apiFunctions.requestUrl(
      url,
      'POST',
      true,
      true,
      data,
      function(data) {
        console.log(data);
        if (data.status == '2000000') {
          console.log(data);
          let user = data.data.appLoginUser;
          wx.setStorageSync('token', user.sessionId)
          // that.getCustomer()
          that.getUser()
        }
      }
    );
  },
  getUser(){
    let that = this 
    let data = {
      oneClassificationId : that.data.oneClassificationId,
      twoClassificationId : that.data.twoClassificationId,
      carId : that.data.carId || ''
    }
    User.getPersonalInfo(data).then(function(res){
      console.log('res.data:',res.data)
      that.setData({
        appUserId : res.data.userInfoDTO.id,
        userName : res.data.userInfoDTO.name,
        avatar : res.data.userInfoDTO.avatar,
      })
    })
  },
})