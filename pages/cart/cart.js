// pages/cart/cart.js
let app = getApp();
const tools = require('../../tools.js');
const Cart = require('../../module/cart.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleBarHeight:app.globalData.titleBarHeight,
    statusBarHeight:app.globalData.statusBarHeight,
    windowWidth:app.globalData.windowWidth,
    windowHeight:app.globalData.windowHeight,
    title:'我的购物车',
    param_add:{
      'productId':'',
      'count':''
    },
    param_remove: {
      'cartProductId': ''
    },
    productIds:[],
    cartList:[
    ],
    shop: [
      { name: '易杨堂茶叶', value: '0'}
    ],
    totalPrice: 0.00,
    editflag:false,
    edit:'编辑',
    confirmFLag:'去结算',
    all:  1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getList: function (e) {
    var that = this;
    Cart.getList().then(function (data) {
      if (data.status == 1) {
        that.setData({
          cartList: data.data,
          carts: data.data
        })
      }
    })
  },
  add: function (e) {
    var that = this;
    Cart.add(that.data.param_add).then(function (data) {
      if (data.status == 1) {

      }
    })
  },
  remove: function (e) {
    var that = this;
    var data = {
      cartProductIds: that.data.productIds
    }
    console.log(that.data.productIds[0])
    console.log(data)
    Cart.removeList(data).then(function (data) {
      if (data.status == 1) {
        that.getList()
      }
    })
  },
  onCartTap(e){
    console.log('onCartTap')
    console.log(e.detail.data)
    var obj = e.detail.data
    console.log(obj.status)
    if (obj.status == 1) {
      this.change(obj.data)
    }
    if (obj.status == 2) {
      this.onPlus(obj.data)
    }
    if (obj.status == 3) {
      this.onMinus(obj.data)
    }
  },
  checkboxChange01(e){
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    const that = this
    if (e.detail.value.length>0){
      for (var idx in that.data.cartList){
        that.data.productIds.push(that.data.cartList[idx].id)
        that.data.cartList[idx].checked =  true
        that.data.cartList[idx].chose = true
        that.data.totalPrice = that.data.totalPrice + that.data.cartList[idx].price * that.data.cartList[idx].count
      }
      that.setData({
        cartList: that.data.cartList,
        totalPrice: that.data.totalPrice,
        productIds: that.data.productIds
      })
    }else{
      for (var idx in that.data.cartList) {
        that.data.cartList[idx].checked = false
        that.data.cartList[idx].chose = false
      }
      that.setData({
        cartList: that.data.cartList,
        totalPrice: 0.00,
        productIds:[]
      })
    }
  },
  checkboxChange02(e){
    console.log('checkboxChange02')
    console.log(e.detail.value)
    const that = this
    var data = e.detail.value
    that.data.totalPrice = 0.00
    console.log(data.length)
    var flag = false
    if (data.length > 0){
      for (var j in that.data.cartList){
        console.log(j)
        for (var idx in data){
          if (data[idx] == that.data.cartList[j].id){
            that.data.totalPrice = that.data.totalPrice + that.data.cartList[j].price * that.data.cartList[j].count
            that.data.carts[j].chose = true
            break
          }else{
            console.log('ss')
            console.log(j)
            if(j != 'count'){
              that.data.carts[j].chose = false
            }
            
          }
        }
      }
    }else{
      for (var k in that.data.carts){
        that.data.carts[k].chose = false
      }
    }
    
    this.setData({
      productIds: data,
      totalPrice: that.data.totalPrice,
      carts: that.data.carts
    })
  },
  onSubTap(e){
    const that = this
    let index = e.currentTarget.dataset.index
    var cartList = that.data.cartList
    if (cartList[index].count>1){
      --cartList.count
      --this.data.carts[index].count
      if (this.data.carts[index].chose) {
        that.data.totalPrice = that.data.totalPrice - cartList[index].price
      }
    }
    
    this.setData({
      carts: that.data.carts,
      totalPrice: that.data.totalPrice
    })
  },
  onAddTap(e){
    const that = this
    let index = e.currentTarget.dataset.index
    console.log(index)
    var cartList = that.data.cartList
    
    var productId = cartList[index].productId
    var data = {
      productId: productId,
      count: 1,
      version: 2
    }
    Cart.add(data).then(function (data) {
      console.log(data)
      if (data.status == 1) {
        // wx.showToast({
        //   title: '已添加到购物车',
        //   icon: 'success',
        //   duration: 2000
        // });

        if (cartList[index].count <= 10) {
          ++cartList[index].count

          if (that.data.carts[index].chose) {
            that.data.totalPrice = that.data.totalPrice + cartList[index].price
          }
        }
        that.setData({
          carts: that.data.carts,
          totalPrice: that.data.totalPrice
        })

      }
    })

  },
  getCardList:function(){
     var cardList = []
     var temp = {
       'productId':'',
       'count':''
     }
    for (var idx in this.data.productIds){
      for (var i in this.data.cartList) {
        if (this.data.productIds[idx] == this.data.cartList[i].productId){
          temp.productId = this.data.cartList[idx].productId
          temp.count = this.data.cartList[idx].count
          cardList.push(temp)
        }

      }
    }
    console.log(cardList)
    app.globalData.cartList = cardList
  },
  setCardListToGrobalData:function(){
    const that = this
    var temp = {}
    var cartList = []
    for(var idx in that.data.carts){
      if (that.data.carts[idx].chose){
        temp = {
          "subProductId": that.data.carts[idx].subProductId,
          "count": that.data.carts[idx].count
        }
        cartList.push(temp)
      }
    }
    app.globalData.cartList = cartList
    console.log(cartList)

  },
  comfirmOrder: function () {
    const that = this
    if (!that.data.editflag){
      this.setCardListToGrobalData()
      wx.navigateTo({
        url: '../confirmorder/confirmorder?fromCart=' + true
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '是否执行此操作',
        showCancel: true,
        cancelText: "确定",
        confirmText: "确定",
        success: function (res) {
          if (res.cancel) {
          } else {
            that.remove()
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
      
    }
    
  },
  onEditTap:function(){
    const that = this
    that.data.editflag = !that.data.editflag
    if (that.data.editflag){
      that.data.edit = '关闭',
      that.data.confirmFLag = '删除'
    }else{
      that.data.edit = '编辑',
        that.data.confirmFLag = '去结算'
    }
    for (var idx in that.data.cartList){
      that.data.cartList[idx].chose = false
    }
    that.setData({
      totalPrice: 0.00,
      productIds:[],
      cartList: that.data.cartList,
      edit: that.data.edit,
      editflag: that.data.editflag,
      confirmFLag: that.data.confirmFLag
    })
  },
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList()
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