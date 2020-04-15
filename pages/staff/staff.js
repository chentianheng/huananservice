var app = getApp();
var util = require("../../util.js");
const Distributor = require('../../module/distributor.js');
Page({
  data: {
    titleBarHeight: app.globalData.titleBarHeight,
    statusBarHeight: app.globalData.statusBarHeight,
    windowWidth: app.globalData.windowWidth,
    windowHeight: app.globalData.windowHeight,
    // 组件所需的参数
    title: '员工',
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    tabs: [],
    activeIndex: 0,
    subordinateCount: 0,
    distributor: {},
    profits: [],
    withdraws: [],
    search: {
      distributorId: '',
      page: 1,
      pageSize: 20
    }
  },


  previewQRCode(e) {
    const that = this;
    let url = that.data.qrcodeUrl;
    wx.previewImage({
      current: url,
      urls: [url]
    });
  },

  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    });
  },



  onLoad: function (options) {
    this.data.tabs.push({
      steamType: 0,
      label: "订单"
    }, {
      steamType: 1,
      label: "提现明细"
    });
    this.setData({
      tabs: this.data.tabs
    });
    this.getSubordinateCount();
    this.getProfits();
    this.getWithdraws();
    this.getDistributor();
    this.getDistributorMsg();
  },

  onPullDownRefresh() {
    this.getSubordinateCount();
    this.getProfits();
    this.getWithdraws();
  },
  getDistributor: function (e) {
    const that = this
    Distributor.getDistributor(that.data.search).then(function (res) {
      res.data.total = (res.data.total / 100).toFixed(2);
      res.data.balance = (res.data.balance / 100).toFixed(2);
      res.data.withdrawed = (res.data.withdrawed / 100).toFixed(2);
      res.data.withdrawing = (res.data.withdrawing / 100).toFixed(2);
      that.setData({
        distributor: res.data
      })

    })
  },
  getDistributorMsg: function (e) {
    const that = this
    Distributor.getDistributorMsg(that.data.search).then(function (res) {
      /* res.data.total = (res.data.total / 100).toFixed(2);
      res.data.balance = (res.data.balance / 100).toFixed(2);
      res.data.withdrawed = (res.data.withdrawed / 100).toFixed(2);
      res.data.withdrawing = (res.data.withdrawing / 100).toFixed(2); */
      that.setData({
        distributorMsg: res.data
      })

    })
  },
  /*  getSubordinate: function (e) {
     const that = this
     Distributor.getSubordinate(that.data.search).then(function (res) {
       that.setData({
         subordinateCount: res.extra.count
       })

     })
   }, */
  getProfits() {
    var that = this;
    // console.log(that.data.search)
    Distributor.getProfits().then(function (res) {

      console.log(res)
      for (var i in res.data) {
        res.data[i].createdAt = util.formatTime(new Date(res.data[i].createdAt));
        /*       res.data[i].order.wxOrder.price = (res.data[i].order.wxOrder.price / 100).toFixed(2); */
        res.data[i].price = (res.data[i].price / 100).toFixed(2);
        res.data[i].totalPrice = (res.data[i].totalPrice / 100).toFixed(2);
        res.data[i].profit = (res.data[i].profit / 100).toFixed(2);
      }
      that.setData({
        profits: res.data
      })

    })
  },

  getWithdraws() {
    let that = this;

    Distributor.getWithdraws().then(function (res) {
      for (var i in res.data) {
        res.data[i].createdAt = util.formatTime(new Date(res.data[i].createdAt));
        res.data[i].withdraw = (res.data[i].withdraw / 100).toFixed(2);
      }
      that.setData({
        withdraws: res.data
      })

    })

  },

  getSubordinateCount() {
    let that = this;
    Distributor.getSubordinateCount().then(function (res) {
      console.log('ldkfhg')
      console.log(res)
      if (res.status == 1) {
        that.setData({
          subordinateCount: res.data
        });
        /*  that.getSubordinate() */
      } else {
        wx.redirectTo({
          url: '../distributorlogin/distributorlogin',
        })
      }
    })
  },
  logout: function (e) {
    let that = this;
    Distributor.logout().then(function (res) {
      console.log('logout')
      console.log(res)
      if (res.status == 1) {
        wx.redirectTo({
          url: '../distributorlogin/distributorlogin',
        })
      } else {

      }
    })
  },
  onLogoutTap: function (e) {
    const that = this
    wx.showModal({
      title: '提示',
      content: '是否退出登陆',
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
          // console.log('用户点击重试')
          that.logout();
        } else if (res.cancel) {
          // console.log('用户点击关闭')
        }
      }
    })
  }

});