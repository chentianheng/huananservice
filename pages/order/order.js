// pages/order/order.js
const Order = require('../../module/order.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleBarHeight:app.globalData.titleBarHeight,
    statusBarHeight:app.globalData.statusBarHeight,
    windowWidth:app.globalData.windowWidth,
    windowHeight:app.globalData.windowHeight,
    title:'我的订单',
    orders: [],
    status: '',
    statusBarHeight: '',
    titleBarHeight: '',
    orderStatus: [
      {
        status: '0',
        name: '全部'
      },
      {
        status: '1',
        name: '待支付'
      },
      {
        status: '2',
        name: '待发货'
      },
      {
        status: '3',
        name: '已完成'
      }
    ],
    choose: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    let status = options.status;
    let choose = {}
    if (!status) {
      status = "0";
    }
    switch (status) {
      case "0":
        choose = this.data.orderStatus[0];
        break;
      case "1":
        choose = this.data.orderStatus[1];
        break;
      case "2":
        choose = this.data.orderStatus[2];
        break;
      case "3":
        choose = this.data.orderStatus[3];
        break;
    }
    this.setData({
      choose: choose,
      status: status,
    })

    if (status == 0){
      this.listOrder();
    }else{
      this.listOrder(status);
    }
    
  },
  listOrder(status) {
    let that = this;
    Order.listOrder(status).then(function (data) {
      for (let i in data) {
        data[i].updatedAt = app.util.formatTime(new Date(data[i].updatedAt));
        switch (data[i].status) {
          case 1:
            data[i].statusStr = '待支付';
            data[i].statusClass = 'status-prepay';
            break;
          case 2:
            data[i].statusStr = '待发货';
            data[i].statusClass = 'status-pay';
            break;
          case 3:
            data[i].statusStr = '已完成';
            data[i].statusClass = 'status-complete';
            break;
          case -1:
            data[i].statusStr = '已取消';
            data[i].statusClass = 'status-cancel';
          case -2:
            data[i].statusStr = '已退款';
            data[i].statusClass = 'status-cancel';
            break;
        }
      }
      that.setData({
        orders: data
      })
    })
  },
  onPay(e) {
    let orderId = e.currentTarget.dataset.id;
    Order.prepay(orderId).then(function (data) {
      wx.requestPayment({
        timeStamp: data.timestamp,
        nonceStr: data.nonceStr,
        package: 'prepay_id=' + data.prepay_id,
        signType: 'MD5',
        paySign: data.paySign,
        success: function (res) {
          console.log('success')
          console.log(res);
          wx.navigateTo({
            url: '../order/order?status=2',
          })
        },
        fail: function (res) {
          console.log('fail')
          console.log(res);
        }
      })
    })
  },
  onbackTap() {
    wx.navigateBack({

    })
  },
  onTypeTap: function (e) {
    console.log(e.currentTarget.dataset.id)
    const that = this
    var id = e.currentTarget.dataset.id
    this.data.choose = this.data.orderStatus[id]
    this.setData({
      choose: that.data.choose,
    })
    if (this.data.status != this.data.orderStatus[id].status) {
      this.data.status = this.data.orderStatus[id].status;
      if (this.data.status == 0) {
        this.listOrder();
      } else {
        this.listOrder(this.data.status);
      }

    }
  },
  onCopyTap: function (e) {
    var expressId = e.currentTarget.dataset.expressid;
    wx.setClipboardData({
      data: expressId,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            // console.log(res.data) 
          }
        })
      }
    })
  },
  getBarheight() {
    if (app.globalData && app.globalData.statusBarHeight && app.globalData.titleBarHeight) {
      this.setData({
        statusBarHeight: app.globalData.statusBarHeight,
        titleBarHeight: app.globalData.titleBarHeight
      });
    } else {
      let that = this
      wx.getSystemInfo({
        success: function (res) {
          if (!app.globalData) {
            app.globalData = {}
          }
          if (res.model.indexOf('iPhone') !== -1) {
            app.globalData.titleBarHeight = 44
          } else {
            app.globalData.titleBarHeight = 48
          }
          app.globalData.statusBarHeight = res.statusBarHeight
          that.setData({
            statusBarHeight: app.globalData.statusBarHeight,
            titleBarHeight: app.globalData.titleBarHeight
          });
        },
        failure() {
          that.setData({
            statusBarHeight: 0,
            titleBarHeight: 0
          });
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getBarheight()
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
  onShareAppMessage: function () {

  },
  phoneCall: function () {
    let that = this;
    wx.makePhoneCall({
      phoneNumber: '13242329988',
    })
  },
})