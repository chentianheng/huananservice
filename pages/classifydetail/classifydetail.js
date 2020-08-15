// pages/classifydetail/classifydetail.js
const Index = require('../../module/index.js');
const app = getApp();
const User = require('../../module/user.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    title:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id)
    let that = this 
    let data = {
      classificationId :options.id
    }
    let list = that.data.list
    if (data.classificationId == 2){
      that.setData({
        title:'网约车司机加盟'
      })
    } else if (data.classificationId == 3){
      that.setData({
        title: '维修保养'
      })
    }else{
      that.setData({
        title: '综合服务'
      })
    }
    wx.setNavigationBarTitle({
      title: that.data.title
    })
    Index.getSecondClassify(data).then(function(res){
        console.log(res.data.tow_classificationDTOList)
        list = res.data.tow_classificationDTOList
        that.setData({
          list,
          classificationId : options.id,
        })

    })
   
  },
  onShow() {
    this.recordPath()
  },
  recordPath() {
    let that = this
    let data = {
      pagePath: that.data.title
    }
    User.recordingPath(data).then(res => {

    })
  },
  onDetailTap(e){
      let classificationId = this.data.classificationId
      console.log(e)
    if (classificationId == 2 || classificationId == 3){
        //携带ID跳转到info页面
        wx.navigateTo({
          url:'../secclassifydetail/secclassifydetail?twoClassificationId='+e.currentTarget.id
        })
      }else if(classificationId == 5){
        console.log('555')
        wx.navigateTo({
          url: '../submitpage/submitpage?oneClassificationId=' + classificationId + '&twoClassificationId=' + e.currentTarget.id,
        })
      }else {
        wx.navigateTo({
          url: '../servicedetail/servicedetail?oneClassificationId=' + classificationId + '&twoClassificationId=' + e.currentTarget.id,
        })
      }
  },
  getUserInfo: function(e) {
    console.log(e.detail.userInfo);
    let that = this;
    if (e.detail.userInfo) {
      console.log('确定');
      wx.login({
        complete: (res) => {
          console.log('code',res.code);
          that.postUserInfo(e.detail.userInfo,res.code,e);
        },
      })
      
    } else {
    }
  },
  postUserInfo: function(data,code,e) {
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
          that.onDetailTap(e)
        }
      }
    );
  },
})