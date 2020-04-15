//app.js
const util = require('util.js');
const tools = require('tools.js');
const api = require('api.js');
const Classify = require('./module/classify.js');
const apiFunctions = require('apiFunctions.js');
App({
  util: util,
  tools: tools,
  api:api,
  apiFunctions:apiFunctions,
  onLaunch: function () {
   this.getBarHeight()
   /* this.getIconsList() */
  },
  getBarHeight() {
    const that = this
    let titleBarHeight = 0
    let statusBarHeight = 0
    wx.getSystemInfo({
      success: function (res) {
        if (res.model.indexOf('iPhone') !== -1) {
          titleBarHeight = 44
        } else {
          titleBarHeight = 48
        }
        that.globalData.titleBarHeight = titleBarHeight
        that.globalData.statusBarHeight = res.statusBarHeight
        that.globalData.windowWidth = res.windowWidth
        that.globalData.windowHeight = res.windowHeight
        that.globalData.screenHeight = res.screenHeight
      },
      failure() {
      }
    })
  },
  getIconsList: function (e) {
    var that = this;
    Classify.getList().then(function (data) {
      if (data.status == 1) {
        that.globalData.classifyList = data.data
      }
    })
  },
  globalData: {
    titleBarHeight: '',
    statusBarHeight: '',
    windowWidth: '',
    windowHeight: '',
    cartList:[],
    classifyId:'',
    classifyList:[]
  }
})