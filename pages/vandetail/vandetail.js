// pages/vandetail/vandetail.js
const Van = require('../../module/van.js');
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp();
const User = require('../../module/user.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    truckDetailDTO:{},
    bannerList:[],
    defaultImg:"https://dwh.yf-gz.cn/file/1596993311999_abff47aaef960e519e99539e5b1bed49.png",
    defaultBanner:'https://dwh.yf-gz.cn/file/1597053913976_86a05964c6d2394e16b38c41f40e8fbd.png',
    title:'货车'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('id',options.id)
    this.getTruckDetail(options.id)
  },
  onShow(){
    this.recordPath()
  },
  recordPath() {
    let data = {
      pagePath: '/'+ this.data.title + "/" + this.data.name
    }
    User.recordingPath(data).then(res => {

    })
  },
  getTruckDetail(id){
    let data = {
      id : id
    }
    let bannerList = this.data.bannerList
    let truckDetailDTO = this.data.truckDetailDTO
    Van.getTruckDetail(data).then(res =>{
      console.log(res.data.truckDetailDTO)
      truckDetailDTO = res.data.truckDetailDTO
      let bannerString = res.data.truckDetailDTO.banner
      var arr1 = bannerString.split(";");
      for (let idx in arr1){
         arr1[idx] = {
          image : arr1[idx]
        }
        bannerList.push(arr1[idx])
      }
      // console.log("bannerList",bannerList)
      this.setData({
        bannerList,
        truckDetailDTO,
        name:res.data.truckDetailDTO.name
      })
      this.parseHtml()
      this.recordPath()
    })
  },
  parseHtml(){
    var that = this;
    var article = this.data.truckDetailDTO.content;
    WxParse.wxParse('article', 'html', article, that, 5);
  },
  imageLoad(){
    let that = this
    setTimeout(function(){
      that.setData({
        loadComplete: true
      })
    },1000)
  },
  onSubmitTap(){
    // if (e.detail.errMsg == 'getUserInfo:ok') {
      let oneClassificationId = this.data.truckDetailDTO.oneClassificationId
      let twoClassificationId = this.data.truckDetailDTO.twoClassificationId
      wx.navigateTo({
        url: '../submitpage/submitpage?oneClassificationId=' + oneClassificationId + '&twoClassificationId=' + twoClassificationId + '&carId=' + this.data.truckDetailDTO.id,
      })
    // }
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
    var data = {
      "name": data.nickName,
      "telephone":telephone,
      "avatar":data.avatarUrl,
      "code":code,
      "city": data.city,
      "country": data.country
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
          that.onSubmitTap()
        }
      }
    );
  },
})