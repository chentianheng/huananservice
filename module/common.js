// const Request = require('../request.js');
const Tools = require('../tools.js');
const QQMapWX = require('../qqmap-wx-jssdk1.0/qqmap-wx-jssdk.js');
let qqmapsdk = ''
let Conmon = {
  getToday: function (e) {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },
  /**********************************************
    function:   getLocation
    input:      ''
    author:     hcj
    desc_en:       get user location
    desc_zh:       获取用户位置
    date:       2019-01-29
  ************************************************/
  getLocation: function (e) {
    qqmapsdk = new QQMapWX({
      key: '7QQBZ-V2JRO-ORRWF-SFQ6S-WZBFT-CNFKN'
    });
    const that = this;
    return new Promise(function (resolve, reject) {
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success: function (res) {
              resolve(res);
            },
            fail: function (err) {
              reject(err);
            }
          });
        },
        fail: function (err) {
          reject(err);
        }
      });
    });


  },
  /**********************************************
    function:   previewImage
    input:      flag=true,img=[];flag=flase,img=url
    author:     hcj
    desc_en:       preview image
    desc_zh:       预览图片
    date:       2019-01-29
  ************************************************/
  previewImage: function (img, flag) {
    // let index = e.currentTarget.dataset.index;
    let index = 0;
    let imgList = [];
    if (flag) {
      img.forEach(photo => {
        imgList.push(photo.url);
      });
    } else {
      imgList.push(img);
    }
    wx.previewImage({
      current: imgList[index],
      urls: imgList
    });
  },
  /******************************************************
    function:   datetoWeek
    input:      new Date()
    author:     hcj
    desc_en:    date timestamp to Week
    desc_zh:    日期／时间转化为星期
    date:       2019-01-29
  *******************************************************/
  datetoWeek: function (date) {
    var that = this;
    var week = '';
    week = "周" + "日一二三四五六".charAt(date.getDay());
    return week;
  },
  /******************************************************
      function:   dateTostring
      input :     new Date()
      author:     hcj
      desc_en:    date timestamp to string
      desc_zh:    日期／时间转化成字符串格式 
      date:       2019-01-29
    *******************************************************/
  dateTostring: function (date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    var day = date.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    return year + '-' + month + '-' + day;
  },
  /******************************************************
        function:   getWindowHeigthWidth
        desc_en:    get window height width
        desc_zh:    获取屏幕宽度高度 
      *******************************************************/
  getWindowWidth() {
    const that = this;
    var windowWidth = ''
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        windowWidth = res.windowWidth
      }
    });
    return windowWidth
  },
  getWindowHeight() {
    const that = this;
    var windowHeight = ''
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        windowHeight = res.windowHeight
      }
    });
    return windowHeight
  }
}

module.exports = Conmon;