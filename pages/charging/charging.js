// pages/charging/charging.js
const Index = require('../../module/index.js');
const app = getApp();
const User = require('../../module/user.js');
const Charging = require('../../module/charging.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: {
      isRecommend: 1,
      pageSize: 10,
      pageNumber: 1,
    },
    title:'充电桩',
    banner:[],
    classifyList:[
      {
        isRecommend:1,
        name: "推荐排序",
        choosed: true
      },{
        isRecommend:"",
        name:"综合排序",
        
      }],
  },
  onColumnChoose(e){
    // console.log("点击分类",e.currentTarget.dataset.id)
    let id  = e.currentTarget.dataset.id
    let classifyList = this.data.classifyList
    let search = this.data.search
    for (let idx in classifyList){
      if (id == classifyList[idx].isRecommend){
        classifyList[idx].choosed = true
        // console.log("该idx变成真了：",idx)
      }else{
        classifyList[idx].choosed = false
      }
    }
    search.isRecommend = id
    this.setData({
      classifyList,
      search
    })
    this.getList()
  },
  getList(){
    let search = this.data.search
    wx.showLoading({
      title: '加载中..',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    Charging.getChargingPileList(search).then(res =>{
      wx.hideLoading()
      console.log('查看返回地址', res.data.chargingPileDTOList)
      let chargingPileDTOList = res.data.chargingPileDTOList
      for (let i in chargingPileDTOList){
        let tags = []
        let tagString = res.data.chargingPileDTOList[i].tags
        if (tagString != null){
          if (tagString.indexOf(";") != -1) {
            var arr1 = tagString.split(";");
            for (let idx in arr1) {
              arr1[idx] = {
                tag: arr1[idx]
              }
              tags.push(arr1[idx])
              chargingPileDTOList[i].tags = tags
            }
          }else{
            arr1[0] = {
              tag: tagString
            }
            tags.push(arr1[0])
            chargingPileDTOList[i].tags = tags
          }
        }
        
        let dis = res.data.chargingPileDTOList[i].distance /1000
        chargingPileDTOList[i].dis = dis.toFixed(1);
      }
      
      this.setData({
        list : chargingPileDTOList
      })
    })
  },
  guideTap(e){
    // console.log('e', e)
    let data = {
      chargingPileId:e.currentTarget.id
    }
    Charging.getChargingPile(data).then(res => {
      console.log('charing.res', res)
    })
   
    wx.openLocation({
      name: e.currentTarget.dataset.name,
      address: e.currentTarget.dataset.address,
      latitude: e.currentTarget.dataset.latitude,
      longitude: e.currentTarget.dataset.longitude,
    })
  },
  getBanner(){
    let data = {
      classificationId :4
    }
    let bannerList = []
    let that = this
    Index.getSecondClassify(data).then(function(res){
      console.log(res.data.tow_classificationDTOList)
      let chargingPileDTOList = res.data.tow_classificationDTOList
      for (let i in chargingPileDTOList){
        let bannerString = chargingPileDTOList[i].image
        var arr1 = bannerString.split(";");
        for (let idx in arr1){
            arr1[idx] ={
              image : arr1[idx]
            }
          bannerList.push(arr1[idx])
        }
      }
      that.setData({
        banner:bannerList
      })

  })
  },
  getLocation(){
    
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      wx.getLocation({
                        success: res=> {
                          console.log(res);
                          let search = this.data.search
                          search.latitude = res.latitude
                          search.longitude = res.longitude
                          this.setData({
                            search
                          })
                          // console.log(app.globalData.location);
                          // console.log(this.data.location)
                        },
                      })
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          wx.getLocation({
            success: res=> {
              console.log(res);
              let search = this.data.search
              search.latitude = res.latitude
              search.longitude = res.longitude
              this.setData({
                search
              })
              // console.log(app.globalData.location);
              // console.log(this.data.location)
            },
          })
        }
        else {
          //调用wx.getLocation的API
          wx.getLocation({
            success: res=> {
              console.log(res);
              let search = this.data.search
              search.latitude = res.latitude
              search.longitude = res.longitude
              this.setData({
                search
              })
              // console.log(app.globalData.location);
              // console.log(this.data.location)
            },
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBanner()
    wx.getLocation({
      success: res=> {
        console.log(res);
        let search = this.data.search
        search.latitude = res.latitude
        search.longitude = res.longitude
        this.setData({
          search
        })
        this.getList()
        // console.log(app.globalData.location);
        // console.log(this.data.location)
      },
      fail:res=>{
        this.getList()
      }
    })
  },
  onShow(){
    this.getLocation()
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
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let search = this.data.search
    let num = search.pageSize
    search.pageSize = num + 10
    this.setData({
      search
    })
    this.getList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})