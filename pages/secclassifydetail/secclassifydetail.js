// pages/secclassifydetail/secclassifydetail.js
const Index = require('../../module/index.js');
var WxParse = require('../../wxParse/wxParse.js');
const User = require('../../module/user.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    otherServiceDTO:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.twoClassificationId)
    let that = this 
    let data = {
      twoClassificationId : options.twoClassificationId
    }
    Index.getServiceDetail(data).then(function(res){
      console.log(res.data.otherServiceDTO)
      that.setData({
        otherServiceDTO:res.data.otherServiceDTO,
        oneClassificationId :res.data.otherServiceDTO.oneClassificationId,
        twoClassificationId :res.data.otherServiceDTO.twoClassificationId,
        name:res.data.otherServiceDTO.name
      })
      that.parseHtml()
      that.initTitle()
      that.recordPath()
    })
    
  },
  onShow(){
    this.recordPath()
  },
  recordPath() {
    let data = {
      pagePath: '/'+ this.data.title +'/'+ this.data.name
    }
    User.recordingPath(data).then(res => {

    })
  },
  initTitle(){
    let that = this 
    if (that.data.oneClassificationId == 2) {
      that.setData({
        title: '网约车平台'
      })
    } else if (that.data.oneClassificationId == 3) {
      that.setData({
        title: '维修保养'
      })
    } else {
      that.setData({
        title: '综合服务'
      })
    }
  },
  parseHtml(){
    var that = this;
    var article = this.data.otherServiceDTO.content;
    WxParse.wxParse('article', 'html', article, that, 5);
  },
  onSubmitTap(){
    // if (e.detail.errMsg == 'getUserInfo:ok') {
      let oneClassificationId = this.data.otherServiceDTO.oneClassificationId
      let twoClassificationId = this.data.otherServiceDTO.twoClassificationId
      wx.navigateTo({
        url: '../submitpage/submitpage?oneClassificationId=' + oneClassificationId + '&twoClassificationId=' + twoClassificationId,
      })
    // }
  },
  // getUserInfo: function(e) {
  //   console.log(e.detail.userInfo);
  //   let that = this;
  //   if (e.detail.userInfo) {
  //     console.log('确定');
  //     wx.login({
  //       complete: (res) => {
  //         console.log('code',res.code);
  //         that.postUserInfo(e.detail.userInfo,res.code);
  //       },
  //     })
      
  //   } else {
  //   }
  // },
  // postUserInfo: function(data,code) {
  //   var url = `${app.api.userInfo}`;
  //   var telephone = 15521026970;
  //   var that = this;
  //   var data = {
  //     "name": data.nickName,
  //     "telephone":telephone,
  //     "avatar":data.avatarUrl,
  //     "code":code
  //   }
  //   app.apiFunctions.requestUrl(
  //     url,
  //     'POST',
  //     true,
  //     true,
  //     data,
  //     function(data) {
  //       console.log(data);
  //       if (data.status == '2000000') {
  //         console.log(data);
  //         let user = data.data.appLoginUser;
  //         wx.setStorageSync('token', user.sessionId)
  //         // that.getCustomer()
  //         that.onSubmitTab()
  //       }
  //     }
  //   );
  // },
  
  formSubmit(e){
    console.log(e.detail.value)
    if(!e.detail.value.name || !e.detail.value.telephone){
      wx.showToast({
        title: '请补全基本信息',
        image: '../../images/icons/error.png',
        mask: true,
      })
    }else{
      let data = {
        // appUserId : this.data.appUserId,
        name : e.detail.value.name,
        telephone :  e.detail.value.telephone,
        oneClassificationId : this.data.oneClassificationId,
        twoClassificationId : this.data.twoClassificationId,
        carId : parseInt(this.data.carId) || '',
        drivingAge : e.detail.value.drivingAge || '',
        rideCertificate : e.detail.value.rideCertificate || '',
        licenseAddress : e.detail.value.licenseAddress || '',
        brand : e.detail.value.brand || '',
        model : e.detail.value.model || '',
        inviteCode : e.detail.value.inviteCode || ''
      }
      // console.log('data:',data)
      
      User.information(data).then(function(res){
        // console.log('res.result',res.status)
        if(res.status == 2000000){
          wx.showToast({
            title: '提交成功！请留意接听客服电话',
            icon: 'none',
            duration: 3000,
            complete:()=>{
              setTimeout(function() {
                wx.switchTab({
                  url: '../index/index',
                })
             }, 3000);
            }
          })
          
        }else{
          wx.showToast({
            title: 'res.msg',
          })
        }
      })
    }
    
  },
})