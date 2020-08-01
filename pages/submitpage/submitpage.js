// import { threadId } from "worker_threads"
const User = require('../../module/user.js')
const Van = require('../../module/van.js');
// pages/submitpage/submitpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appUserId:null,
    oneClassificationId:null,
    twoClassificationId:null,
    appUserId:'',
    showSuccess:false,
    classifyName:'',
    truckDetailDTO:{},
    bannerList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let oneClassificationId = options.oneClassificationId
    let twoClassificationId = options.twoClassificationId
    let carId = options.carId
    this.setData({
      oneClassificationId,
      twoClassificationId,
      carId
    })
    this.getUser()
    this.processName()
    this.getTruckDetail(carId)
  },
  onShow() {
    this.recordPath()
  },
  recordPath() {
    let data = {
      pagePath: this.data.classifyName + '留资页'
    }
    User.recordingPath(data).then(res => {

    })
  },
  getTruckDetail(id){
    if(id){
      let data = {
        id : id
      }
      let truckDetailDTO = this.data.truckDetailDTO
      let bannerList = this.data.bannerList
      Van.getTruckDetail(data).then(res =>{
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
          truckDetailDTO
        })
      })
    }
  },
  processName(){
    let twoClassificationId = this.data.twoClassificationId
    let classifyName = this.data.classifyName
    // let that = this 
    console.log('twoClassificationId',twoClassificationId)
    
    if(twoClassificationId == 1){
      classifyName = '货车'
    }else if(twoClassificationId == 2){
      classifyName = '网约车'; 
    }else if(twoClassificationId == 3){
      classifyName = '维修保养';  
    }else if(twoClassificationId == 4){
      classifyName = '充电桩';  
    }else if(twoClassificationId == 5){
      classifyName = '综合服务';  
    }else if(twoClassificationId == 6){
      classifyName = '如祺出行'; 
    }else if(twoClassificationId == 7){
      classifyName = 'T3';
    }else if(twoClassificationId == 8){
      classifyName = '曹操';
    }else if(twoClassificationId == 9){
      classifyName = '携程';  
    }else if(twoClassificationId == 10){
      classifyName = '新能源汽车';  
    }else if(twoClassificationId == 11){
      classifyName = '汽油车'; 
    }else if(twoClassificationId == 12){
      classifyName = '机动车行驶证'; 
    }else if(twoClassificationId == 13){
      classifyName = '车辆营运证';
    }else if(twoClassificationId == 14){
      classifyName = '营运资格证';
    }else if(twoClassificationId == 15){
      classifyName = '车载卫星定位GPS';  
    }else if(twoClassificationId == 18){
      classifyName = '年审';  
    }
    wx.setNavigationBarTitle({
      title: classifyName 
    })
    this.setData({
      classifyName
    })


    // switch(twoClassificationId){
    
    //   case 7:
    //     classifyName = 'T3';
    //     break;
    //   case 8:
    //     classifyName = '曹操';  
    //     break;
    //   case 9:
    //     classifyName = '携程';  
    //     break;
    //   case 10:
    //     classifyName = '新能源汽车';  
    //     break;
    //   case 11:
    //     classifyName = '汽油车';  
    //     break;  
    //   case 12:
    //     classifyName = '机动车行驶证';  
    //     break;   
    //   case 13:
    //     classifyName = '车辆营运证';  
    //     break;
    //   case 14:
    //     classifyName = '营运资格证';  
    //     break;
    //   case 15:
    //     classifyName = '车载卫星定位GPS';  
    //     break;
    //   case 18:
    //     classifyName = '年审';  
    //     break;          
    // }
    
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
        appUserId : res.data.userInfoDTO.id
      })
    })
  },
  formSubmit(e){
    console.log(e.detail.value)
    if(!e.detail.value.name || !e.detail.value.telephone){
      wx.showToast({
        title: '请补全基本信息',
        image: '../../images/icons/error.png',
        mask: true,
      })
    }else{
      let newData = {}
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
      for(let k in data){
        if (data[k]){
          console.log('key', k)
          console.log('value', data[k])
          newData[k] = data[k]
        }
      }
      console.log('newData:', newData)
      
      User.information(newData).then(function(res){
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