// pages/list/list.js
const app = getApp()
const Year = require('../../common/const.js');
const Classify = require('../../module/classify.js');
const Showcase = require('../../module/showcase.js');
const Product = require('../../module/product.js');
const Ads = require('../../module/ads.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleBarHeight: app.globalData.titleBarHeight,
    statusBarHeight: app.globalData.statusBarHeight,
    windowWidth: app.globalData.windowWidth,
    windowHeight: app.globalData.windowHeight,
    title: '分类',
    hidden: true,
    classifyList: [],
    goodList: [],
    search: {
      classifyId: '',
      year: '',
      productionTechnology: '',
      page: 1,
      pageSize: 20
    },
    year: Year.getYear1,
    teaClassify: [{
        name: '全部',
        id: -1,
        choosed: true
      },
      {
        name: '生茶',
        id: 1,
        choosed: false
      },
      {
        name: '熟茶',
        id: 2,
        choosed: false
      },
      {
        name: '生熟套装',
        id: 3,
        choosed: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    const that = this
    // that.getIconsList()
    that.getList()
    that.processClassify(app.globalData.classifyList)
    that.getAdvertising()
  },
  getAdvertising: function (e) {
    var that = this;
    var data = {
      type: 'banner'
    }
    Ads.getAds(data).then(function (data) {
      if (data.status == 1) {
        that.setData({
          bannerList: data.data
        })
      }
    })
  },
  getList: function () {
    var that = this;
    // console.log(that.data.search)
    Product.getList(that.data.search).then(function (data) {
      console.log(data.status)
      if (data.status == 1) {
        if (data.data.length > 0) {
          that.processProdcutData(data.data)
        } else {
          that.setData({
            goodList: []
          })
        }

      }
    })
  },
  processProdcutData: function (data) {
    console.log("获取的分类", data)
    const that = this
    var temp = {
      classify: '',
      goods: []
    }
    var productList = that.data.goodList
    for (var i in data) {
      data[i].price = data[i].price / 100
      productList.push(data[i])
    }
    this.setData({
      goodList: productList
    })
  },

  getIconsList: function (e) {
    var that = this;
    Classify.getList().then(function (data) {
      console.log("获取的分类", data)
      if (data.status == 1) {
        that.processClassify(data.data)
      }
    })
  },
  processClassify: function (data) {
    const that = this
    var temp = {
      id: 0,
      name: '全部',
      choosed: true
    }
    var classifyList = []
    classifyList.push(temp)
    for (var idx in data) {
      data[idx].choosed = false
      classifyList.push(data[idx])
    }

    that.setData({
      classifyList: classifyList
    })
  },
  onProcessChoose: function (e) {
    console.log(e.currentTarget.dataset.id)
    const that = this
    var id = e.currentTarget.dataset.id
    if (id != that.data.classifyList[0].id) {
      that.data.search.classifyId = id
    } else {
      that.data.search.classifyId = ''
    }

    for (var idx in that.data.classifyList) {
      if (that.data.classifyList[idx].id == id) {
        that.data.classifyList[idx].choosed = true
      } else {
        that.data.classifyList[idx].choosed = false
      }
    }
    that.setData({
      classifyList: that.data.classifyList,
      search: that.data.search
    })
    that.data.goodList = []
    that.getList()
  },
  onYearChoose: function (e) {
    const that = this
    var id = e.currentTarget.dataset.id
    var year = e.currentTarget.dataset.name
    var chooseYear = year.substring(0, 4);
    if (chooseYear != '全部') {
      that.data.search.year = chooseYear
    } else {
      that.data.search.year = ''
    }


    for (var idx in that.data.year) {
      if (that.data.year[idx].id == id) {
        that.data.year[idx].choosed = true
      } else {
        that.data.year[idx].choosed = false
      }
    }
    that.setData({
      year: that.data.year,
      search: that.data.search
    })
    that.data.goodList = []
    that.getList()
  },
  onTechnologyChoose: function (e) {
    console.log(e.currentTarget.dataset)
    const that = this
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    if (id != that.data.teaClassify[0].id) {
      that.data.search.productionTechnology = name
    } else {
      that.data.search.productionTechnology = ''
    }

    for (var idx in that.data.teaClassify) {
      if (that.data.teaClassify[idx].id == id) {
        that.data.teaClassify[idx].choosed = true
      } else {
        that.data.teaClassify[idx].choosed = false
      }
    }
    that.setData({
      teaClassify: that.data.teaClassify,
      search: that.data.search
    })
    that.data.goodList = []
    that.getList()
  },
  cart_btn: function (e) {
    console.log(e)
    var tindex = e.detail.data.tindex
    var s_index = e.detail.data.s_index
    this.addToCart(s_index, tindex)
  },
  addToCart() {
    var that = this;
    var stock = this.data.chooseProduct.stock;
    var num = this.data.num;
    if (num > stock || num < 1) {
      var msg = '';
      if (num < 1) {
        msg = '商品数量少于1';
      } else {
        msg = '库存不足';
      }
      wx.showModal({
        title: msg,
        showCancel: false,
      })
    } else {
      var data = {
        subProductId: that.data.chooseProduct.id,
        count: that.data.num,
      }
      Cart.add(data).then(function (data) {
        console.log(data.status)
        if (data.status == 1) {
          wx.showToast({
            title: '已添加到购物车',
            icon: 'success',
            duration: 2000
          });
          that.onChangeCartShowState();
        }
      })
    }
  },
  onGoodTap: function (e) {
    console.log(e.detail.data)
    wx.navigateTo({
      url: '../detail/detail?productId=' + e.detail.data.id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this
    that.data.search.page = 1
    let classifyId = app.globalData.classifyId || null;
    app.globalData.classifyId = undefined;
    console.log('classifyId')
    console.log(classifyId)
    console.log(that.data.classifyList.length)
    if (classifyId) {
      that.data.search.classifyId = classifyId
      for (var idx in that.data.classifyList) {
        if (that.data.classifyList[idx].id == classifyId) {
          that.data.classifyList[idx].choosed = true
        } else {
          that.data.classifyList[idx].choosed = false
        }
      }
      that.setData({
        goodList: [],
        classifyList: that.data.classifyList,
        search: that.data.search
      })
      this.getList()

    }
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

  }
})