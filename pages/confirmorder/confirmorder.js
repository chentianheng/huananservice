// pages/confirmorder/confirmorder.js
const Product = require('../../module/product.js');
const Postage = require('../../module/postage.js');
const Address = require('../../module/address.js');
const Order = require('../../module/order.js');
const Common = require('../../module/common.js');
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
    title: '确认订单',
    productId: null,
    product: {},
    count: 1,
    postageList: [],
    address: null,
    selectPostage: null,
    top: app.globalData.titleBarHeight + app.globalData.statusBarHeight,
    lineNum: [],
    totalPrice:  0.00,
    fromCart: false,
    postagePrice: 0.0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this;
    that.data.fromCart = options.fromCart;
    console.log(app.globalData.cartList)
    var cartList = app.globalData.cartList
    var ids = this.processIds(cartList)
    console.log(ids)
    that.setData({
      ids: ids,
      productId: cartList[0].productId,
      cartList: cartList
    })
    that.getProductList(ids)
    that.getWindowWidth()
  },
  processIds(data) {
    var str = ''
    data.forEach(item => {
      console.log(item)
      str += `${item.subProductId}`;
      str += ',';
    });
    return str.slice(0, -1);
  },
  getWindowWidth() {
    var windowWidth = ''
    var num = ''
    windowWidth = Common.getWindowWidth()
    num = Math.ceil(windowWidth / 20)
    var i = 0
    for (var i = 0; i < num; i++) {
      this.data.lineNum.push(i)
    }
    this.setData({
      lineNum: this.data.lineNum
    })
    console.log(windowWidth)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getDefaultAddress();
  },
  // getProduct() {
  //   let that = this;
  //   Product.getOne(that.data.productId).then(function (data) {
  //     that.setData({
  //       product: data.data,
  //     })
  //   })
  // },
  getProductList(ids){
    let that = this;
    var data = {
      subProductIds: ids
    }
    var num = 0
    Product.getProductList(data).then(function (data) {
      for (var idx in data.data){
        for (var i in that.data.cartList){
          if (that.data.cartList[i].productId == data.data[idx].id){
            num = num + that.data.cartList[i].count
            data.data[idx].count = that.data.cartList[i].count,
              that.data.totalPrice = that.data.totalPrice + data.data[idx].price * that.data.cartList[i].count
          }
        }
      }
      that.setData({
        num: num,
        product: data.data,
        totalPrice: that.data.totalPrice
      })
      // that.listPostage();
    })
  },
  listPostage() {
    let that = this;
    var data = {
      addressId: that.data.address.id
    }
    Postage.listPostage(data).then(function (data) {
      that.setData({
        postage: data.data,
      })
      that.processPostage(data.data)
    })
    
  },
  processPostage: function (data) {
    const that = this
    let postagePrice = 0.0
    // var data = that.data.postage
      console.log(data)
    if (that.data.num <= data.baseCount) {
      if (data.baseCount != null && data.basePrice!=null){
        postagePrice = data.basePrice / 100
      } 
    } else {
      var extraTime = parseInt((that.data.num - data.baseCount) / data.extraCount);
      if ((that.data.num - data.baseCount) % data.extraCount != 0) {
        extraTime++;
      }
      postagePrice = parseInt((data.basePrice + extraTime * data.extraPrice)/100) ;
    }
    that.setData({
      postagePrice: postagePrice
    })
    console.log(postagePrice)
  },
  getDefaultAddress() {
    let that = this;
    Address.getDefaultAddress().then(function (data) {
      console.log('getDefaultAddress')
      console.log(data)
      that.setData({
        address: data,
      })
     /*  that.listPostage(); */
    })
  },
  radioChange: function (e) {
    console.log(e)
    console.log(e.detail.value);
    let index = e.detail.value;
    let that = this;
    if (that.data.address.countyName != '荔湾区' && index == '0') {
      wx.showModal({
        title: '提示',
        content: '仅芳村茶叶市场免运费',
        showCancel: false,
        confirmText: "确定",
        success: function (res) {
          if (res.cancel) {
          } else {
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      that.setData({
        selectPostage: that.data.postageList[index]
      })
    }

  },
  postOrder() {
    let that = this;
    if (!that.data.address) {
      wx.showModal({
        title: '提示',
        content: '请输入地址',
        showCancel: false,
      })
      return;
    }
    var data = {
      "products": that.data.cartList,
      "addressId": that.data.address.id,
      "fromCart": that.data.fromCart
    }
    
    Order.postOrder(data).then(function (data) {
      console.log(data)
      Order.prepay(data.data.id).then(function (data) {
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
      wx.hideLoading();
    })
    wx.showLoading({
      title: '订单提交中...',
    })
  },
  onMinus(e) {
    const that = this
    let index = e.currentTarget.dataset.index
    let count = this.data.product[index].count
    if (count > 1) {
      count--;
      this.data.product[index].count = count
      --this.data.cartList[index].count
      --this.data.num
      this.data.totalPrice = this.data.totalPrice - this.data.product[index].price
    }
    this.setData({ 
      num: that.data.num,
      count: count,
      product: that.data.product,
      totalPrice: that.data.totalPrice,
      cartList: that.data.cartList
    })
    if (count >= 1) {
      that.processPostage(that.data.postage)
    }
  },
  onPlus(e) {
    const that = this
    let index = e.currentTarget.dataset.index
    let count = this.data.product[index].count
    count++;
    if (count <= this.data.product[index].stock) {
      ++this.data.num
      this.data.product[index].count = count
      ++this.data.cartList[index].count
      this.data.totalPrice = this.data.totalPrice + this.data.product[index].price
      this.setData({
        num:that.data.num,
        count: count,
        product: that.data.product,
        totalPrice: that.data.totalPrice,
        cartList: that.data.cartList
      })
      that.processPostage(that.data.postage)
    } else {
      wx.showToast({
        title: '库存不足,库存只剩' + this.data.product[index].stock + '片',
        icon: 'none',
      })
    }
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var count = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      count: count
    });
  },
  onbackTap() {
    wx.navigateBack({})
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