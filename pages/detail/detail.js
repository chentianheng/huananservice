// pages/product/product.js
let app = getApp();
const Distributor = require('../../module/distributor.js');
const Product = require('../../module/product.js');
const Postage = require('../../module/postage.js');
const Cart = require('../../module/cart.js');
const Qrcode = require('../../module/qrcode.js');
var WxParse = require('../../wxParse/wxParse.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleBarHeight: app.globalData.titleBarHeight,
    statusBarHeight: app.globalData.statusBarHeight,
    windowWidth: app.globalData.windowWidth,
    windowHeight: app.globalData.windowHeight,
    showAddTOCart: false,
    showProductDetail: false,
    num: 1,
    productInfo: {},
    postage: {

    },
    showShareModal: false,
    goodsCanvasId: 'goods-canvas',
    canvasWHRate: 3,
    showCanvas: false,
    showShareModal: false,
    windowWidth: 300,
    wxQrCode: {},
    property: {},
    userInfo: {},
    distributor: {},
    teaId: '',
    ifLike: false,
    customer: '',
    chooseProduct:{
    },
    actValue: '加入购物车'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const that = this
    var productId = options.productId || 19


    if (productId) {
      this.getOne(productId)
    }
    // this.getPostage()
    // this.getDistributor()
    that.setData({
      productId: productId,
    })
   this.getWxQrCode()
  },
  setRelate: function (distributorId) {
    var data = {
      distributorId: distributorId
    }
    Distributor.setRelate(data).then(function (data) {
      console.log('setRelate')
      console.log(data)
      if (data.status == 1) {
        wx.showToast({
          title: '绑定成功',
        })
      }
    })
  },
  getOne: function (productId) {
    var that = this;
    console.log(that.data.search)
    Product.getOne(productId).then(function (data) {
      console.log(data.status)
      if (data.status == 1) {
        data.data.price = (data.data.price/100).toFixed(2)
        that.setData({
          productInfo: data.data
        })
        that.initProduct()
        that.parseHtml()
      }
    })
  },
  getDistributor:function(){
    let that = this;
    Distributor.getDistributorMsg().then(function(data) {
      console.log('kjhg')
      console.log(data)
      if (data.status == 1) {
          that.data.distributor = data.data;
      }
      that.getWxQrCode()
    })
  },
  getPostage: function (productId) {
    var that = this;
    console.log(that.data.search)
    Postage.listPostage().then(function (data) {
      console.log(data.status)
      if (data.status == 1) {
        let postage = 0.0
        data.data.price = data.data.price / 100
        that.setData({
          postage: data.data
        })
        that.processPostage()
      }
    })
  },
  processPostage: function () {
    const that = this
    let postagePrice = 0.0
    var data = that.data.postage
    if (that.data.num <= data.baseCount) {
      postagePrice = data.basePrice
    } else {
      var extraTime = parseInt((that.data.num - data.baseCount) / data.extraCount);
      if ((that.data.num - data.baseCount) % data.extraCount != 0) {
        extraTime++;
      }
      postagePrice = data.basePrice + extraTime * data.extraPrice;
    }
    that.setData({
      postagePrice: postagePrice / 100
    })
    console.log(postagePrice)
  },
  getWxQrCode() {
    console.log('getWxQrCode')
    let that = this;
    let url = '/api/wx/product/qrcode?productId=' + that.data.productId;
    // if (that.data.distributor.id) {
    //   url = url + '&distributorId=' + that.data.distributor.id;
    // }
    Qrcode.getQrcode(url).then(function (data) {
      console.log(data.status)
      that.setData({
        wxQrCode: data
      })
    })
  },
  parseHtml: function () {
    var that = this;
    var article = this.data.productInfo.content.content;
    WxParse.wxParse('article', 'html', article, that, 5);
  },
  submit: function () {
    const that = this
    app.globalData.cartList = [{
      'subProductId': that.data.chooseProduct.id,
      'count': that.data.num
    }]
    wx.navigateTo({
      url: '../confirmorder/confirmorder?fromCart=' + false
    })
    // wx.navigateTo({
    //   url: '../confirmorder/confirmorder?productIds=' + that.data.productInfo.id + '&&num=' + that.data.num,
    // })
  },
  onChangeCartShowState: function (e) {
    console.log('onChangeCartShowState')
    console.log(e.currentTarget.dataset.status)
    var that = this;
    if(e.currentTarget.dataset.status ==  1){
      that.data.actValue =  '加入购物车'
    }
    if(e.currentTarget.dataset.status ==  2){
      that.data.actValue =  '确认'
    }
    that.setData({
      showAddTOCart: (!that.data.showAddTOCart),
      num: 1,
      actValue:that.data.actValue
    })
  },

  bindPlus: function () {
    const that = this
    var num = this.data.num;
    var stock = this.data.chooseProduct.stock;
    if (!stock || num < stock) {
      num++;
    }
    // num++;
    // 不作过多考虑自增1  
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    var plusStatus = num >= stock && stock ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus,
      plusStatus: plusStatus,
    });
    if (!stock || num < stock) {
      that.processPostage()
    }
  },

  // 加减
  bindMinus: function () {
    const that = this
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    var stock = this.data.chooseProduct.stock;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    var plusStatus = stock && num >= stock ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus,
      plusStatus: plusStatus,
    });
    if (num > 1) {
      that.processPostage()
    }
  },
  /* 输入框事件 */
  bindManual: function (e) {
    const that = this
    var num = e.detail.value;
    this.setData({
      num: num
    });
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
  onConfirmTap:function(e){
    const that = this
    if(that.data.actValue  == '加入购物车'){
      that.addToCart()
    }
    if(that.data.actValue  == '确认'){
     /*  that.addToCart() */
     that.submit()
    }
  },
  onDetailTap: function (e) {
    const that = this
    wx.navigateTo({
      url: '../detail/detail?teaId=' + that.data.teaId,
    })
  },

  changeShareModal() {
    this.setData({
      showShareModal: !this.data.showShareModal
    });
  },

  makeGoodsCard: function (e) {
    const that = this;
    that.checkSaveImageAuthor().then(() => {
      that.setData({
        showShareModal: false
      });
      that.drawCanvas();
    });
  },

  checkSaveImageAuthor() {
    const that = this;
    return new Promise(function (resolve) {
      wx.getSetting({
        success: function (res) {
          let authorization = res.authSetting['scope.writePhotosAlbum'];
          authorization && resolve();
          authorization === false && wx.openSetting();
          authorization === undefined && wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: function () {
              resolve();
            }
          });
        }
      });
    });
  },
  downloadFile(url) {
    console.log(url)
    const that = this;
    return new Promise(function (resolve) {
      wx.downloadFile({
        url,
        success: function (downRes) {
          if (downRes.statusCode === 200) {
            wx.getImageInfo({
              src: downRes.tempFilePath,
              success: function (info) {
                resolve({
                  info,
                  url: downRes.tempFilePath
                });
              },
              fail: function () {
                resolve({
                  info: null,
                  url: downRes.tempFilePath
                });
              }
            });
          }
        }
      });
    });
  },
  downloadFileList(list) {
    const that = this;
    console.log(list)
    let pList = [];
    for (let i = 0; i < list.length; i++) {
      pList[i] = that.downloadFile(list[i]);
    }
    return Promise.all(pList);
  },
  drawCanvas() {
    const that = this;
    that.setData({
      showCanvas: true
    });
    let canvasColor = '#f7f7f7';
    let goods = that.data.productInfo;
    let windowWidth = that.data.windowWidth;
    let canvasWHRate = 1.5;
    let goodsCanvasId = that.data.goodsCanvasId;
    let ctx = wx.createCanvasContext('goods-canvas');
    let imgWHRate = 1;
    let padding = 20;
    let margin = 30;
    let radius = 10;
    let canvasWidth = windowWidth;
    let canvasHeight = canvasWidth * canvasWHRate;
    let cardWidth = canvasWidth - 2 * margin;
    let cardHeight = canvasHeight - 2 * (margin / 3 * 2);
    let imageWidth = windowWidth - 2 * padding - 2 * margin;
    let imageHeight = imageWidth * imgWHRate;
    let url = goods.images[0].url;
    let avatarWidth = 40;
    let avatarHeight = 40;
    // let canvasColor = 'white';
    let cardColor = 'white';
    let shadowColor = '#bbb';
    let nickFontSize = 20;
    let nickColor = '#757575';
    let titleFontSize = 25;
    let titleColor = 'black';

    let desFontSize = 15;
    let desColor = '#878787';

    let priceFontSize = 25;
    let priceColor = 'rgb(236, 54, 66)';
    let qrCodeWidth = 100;
    let qrCodeHeight = 100;

    // url = `${settings.domain}/oss/${url}`;
    // url = `${settings.domain}/oss/${url}`;
    wx.showLoading({
      title: '图片生成中...'
    });

    let imgList = [];
    imgList[0] = url;
    imgList[1] = that.data.userInfo.avatarUrl || app.settings.defaultHeadImg;
 /*    imgList[2] = that.data.wxQrCode.imgUrl; */
    imgList[2] = that.data.wxQrCode.imgUrl
    // imgList[1] = app.userInfo.avatarUrl || app.settings.defaultHeadImg;
    // imgList[2] = `${settings.domain}/shop/goods/qrcode?goodsId=${goods.id}`;

    // imgList[2] = this.data.wxQrCode.imgUrl;

    that.downloadFileList(imgList).then(urlList => {
      let isDrawAgain = false;
      (function draw() {
        margin  = 0;
       /*  let x = margin;
        let y = margin / 3 * 2; */

        //画布框
        ctx.setFillStyle(canvasColor);
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        //圆角框

        cardWidth = canvasWidth - margin * 2;
        cardHeight = canvasHeight - 2 * (margin / 3 * 2);
       let x = margin;
        let y = margin / 3 * 2;
      /*   cardWidth = canvasWidth;
        cardHeight = canvasHeight; */
        ctx.setFillStyle(cardColor);
        ctx.setStrokeStyle(shadowColor);
        ctx.beginPath();
        ctx.arc(x + radius, y + radius, radius, 1 * Math.PI, 1.5 * Math.PI);
        ctx.lineTo(x + cardWidth - radius, y);
        ctx.arc(x + cardWidth - radius, y + radius, radius, 1.5 * Math.PI, 2 * Math.PI);
        ctx.lineTo(x + cardWidth, cardHeight - y);
        ctx.arc(x + cardWidth - radius, y + cardHeight - radius, radius, 0 * Math.PI, 0.5 * Math.PI);
        ctx.lineTo(x + radius, y + cardHeight);
        ctx.arc(x + radius, y + cardHeight - radius, radius, 0.5 * Math.PI, 1 * Math.PI);
        ctx.closePath();
        ctx.setShadow(0, 0, 10, shadowColor);
        ctx.stroke();
        ctx.fill();
        ctx.setShadow(0, 0, 0, cardColor);

        //商品图片
        x+=30;
        x += padding;
        y += padding;
        let goodsImg = urlList[0];
        if (goodsImg.info) {
          let sw = goodsImg.info.width;
          let sh = goodsImg.info.height;
          let srh = sw * imgWHRate;
          let iLen = 10;
          let jLen = 10;

          //第一种方案
          // for (let i = 0; i < iLen; i++) {
          // 	for (let j = 0; j < jLen; j++) {
          // 		let sx = i * sw / iLen;
          // 		let sy = j * srh / jLen;
          // 		let dx = x + i * imageWidth / iLen;
          // 		let dy = y + j * imageHeight / jLen;
          // 		ctx.drawImage(goodsImg.url, sx, sy, sw / iLen, srh / jLen, dx, dy, imageWidth / iLen, imageHeight / jLen);
          // 	}
          // }

          //第二种方案
          // ctx.drawImage(goodsImg.url, 0, 0, sw, srh, x, y, imageWidth, imageHeight);

          //第三种方案
          imageHeight = sh / sw * imageWidth;
          ctx.drawImage(goodsImg.url, x, y, imageWidth, imageHeight);

          //如果高度比宽度低，上移
          // if (srh > sh) {
          // 	let len = (srh - sh) / srh * imageHeight;
          // 	y = y - len;
          // }
        } else {
          ctx.drawImage(goodsImg.url, x, y, imageWidth, imageHeight);
        }


        //头像
        y = y + imageHeight + 2 * padding;
        ctx.drawImage(urlList[1].url, x, y, avatarWidth, avatarHeight);

        //昵称标题
        x = x + padding + avatarWidth;
        y = y + avatarHeight;
        ctx.setFontSize(nickFontSize);
        ctx.setFillStyle(nickColor);
        ctx.fillText(`${that.data.userInfo.nickName || '你的好友'}  推荐你看`, x, y);

        // //二维码
        x = canvasWidth - margin - padding - qrCodeWidth;
        y += padding * 0.5;
        ctx.drawImage(urlList[2].url, x, y + padding, qrCodeWidth, qrCodeHeight);


        //商品名字
        x = margin + padding;
        y = y + padding * 2;
        ctx.setFontSize(titleFontSize);
        ctx.setFillStyle(titleColor);
        let len = goods.name.length;
        let step = 16;
        for (let i = 0; i * step < len; i++) {
          let start = i * step;
          let end = (i + 1) * step;
          ctx.fillText(goods.name.slice(start, end), x, y, cardWidth - qrCodeWidth - padding * 2);
          y = y + padding * 1.5;
        }
        //描述
        ctx.setFontSize(desFontSize);
        ctx.setFillStyle(desColor);
        var describe = goods.year + ' ' + ' ' + goods.productionTechnology
        console.log(describe)
        ctx.fillText(`${describe}`, x, y);
        //价格
        // if (goods.type === 2) {
        console.log('padding')
        console.log(padding)
        y = y + padding * 2;
        x = x - 5
        ctx.setFontSize(priceFontSize);
        ctx.setFillStyle(priceColor);
        ctx.fillText(`￥${goods.price}`, x, y);
        // }

        //设置截取空白
        canvasWHRate = (y + qrCodeHeight) / canvasWidth;
        that.setData({
          canvasWHRate
        });
        canvasHeight = canvasWidth * canvasWHRate;
        /* if (!isDrawAgain) {
          isDrawAgain = true;
          draw();
        } else {
          ctx.draw(false, function () {
            that.saveCanvas(canvasWidth, canvasWidth * canvasWHRate, goodsCanvasId).then(() => {
              wx.hideLoading();
            });
          });
        } */
        console.log('draw')
        ctx.draw(false, function () {
          wx.hideLoading();
          console.log(goodsCanvasId)
          that.saveCanvas(canvasWidth, canvasWidth * canvasWHRate, goodsCanvasId).then(() => {
            wx.hideLoading();
          });
        });

      })();
    });
  },
  saveCanvas(width, height, canvasId) {
    const that = this;
    console.log('saveCanvas00')
    console.log(width)
    console.log(height)
    console.log(canvasId)

    return new Promise(function (resolve) {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        canvasId,
        success: function (res) {
          resolve();
          console.log('saveCanvas')
          console.log(res)
          that.setData({
            showCanvas: false
          });
          wx.previewImage({
            urls: [res.tempFilePath]
          });
          /*  wx.saveImageToPhotosAlbum({
             filePath: res.tempFilePath,
             complete: function (res) {
               that.setData({
                 showCanvas: false
               });
             }
           }); */
        }
      });
    });
  },
  /* getWxQrCode() {
    console.log('getWxQrCode')
    let that = this;
    let url = '/api/wx/product/qrcode?productId=' + that.data.productId;
    if (that.data.distributor.id) {
      url = url + '&distributorId=' + that.data.distributor.id;
    }
    Qrcode.getQrcode(url).then(function (data) {
      console.log(data.status)
      that.setData({
        wxQrCode: data
      })
    })
  }, */
  onGotUserInfo: function (e) {
    const that = this
    console.log(e)
    console.log(e.detail.errMsg);
    if (e.detail.errMsg == 'getUserInfo:ok') {
      that.data.userInfo = e.detail.userInfo
    }

    that.setData({
      userInfo: that.data.userInfo,
      showShareModal: !this.data.showShareModal
    })

  },
  getWindowWidth() {
    const that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        });
      }
    });
  },
  onCollectTap: function (e) {
    if (this.data.ifLike) {
      this.cancelInterestingTea();
    } else {
      this.collectInterestingTea();
    }
  },
  collectInterestingTea: function () {
    let that = this;
    var data = {
      productId: that.data.productId
    };
    Product.collectInterestingTea(data)
      .then(function (data) {
        if (data.status == 1) {
          wx.showToast({
            title: '收藏成功',
          })
          that.data.ifLike = true;
          that.setData({
            ifLike: that.data.ifLike
          })
        }
      })
      .catch(function (data) {})
  },
  cancelInterestingTea: function () {
    var that = this;
    var data = {
      productId: that.data.productId
    };
    Product.cancelInterestingTea(data)
      .then(function (data) {
        if (data.status == 1) {
          wx.showToast({
            title: '取消成功'
          })
          that.data.ifLike = false;
          that.setData({
            ifLike: that.data.ifLike
          })
        }
      })
      .catch(function (data) {})
  },

  onValsTap: function (e) {
    // console.log(e)
    const that = this
    var sindex = e.currentTarget.dataset.sindex
    var vindex = e.currentTarget.dataset.vindex
    var specId = e.currentTarget.dataset.specid
    var name = e.currentTarget.dataset.name
    var work = e.currentTarget.dataset.work
    if (work) {
      that.data.productInfo.specs[sindex].vals[vindex].choosed = !that.data.productInfo.specs[sindex].vals[vindex].choosed
      for (var idx in that.data.productInfo.specs[sindex].vals) {
        if (idx != vindex) {
          that.data.productInfo.specs[sindex].vals[idx].choosed = false
        }
      }
      //选中规格
      if (that.data.productInfo.specs[sindex].vals[vindex].choosed) {
        that.data.productInfo.specs[sindex].choosed = true
      } else {
        that.data.productInfo.specs[sindex].choosed = false
      }
      that.getOtherSpescWork(specId,name)
    }
    if(that.conditionStatus()){
      that.data.chooseProduct = {}
      that.data.chooseProduct = that.confirmProduct()
      console.log("chooseProduct是:",that.data.chooseProduct)
    }else{
      wx.showToast({
        title: '请选择',
      })
    }
   
    that.setData({
      productInfo: that.data.productInfo,
      chooseProduct: that.data.chooseProduct
    })
  },
  //选择一个规格，判断其他规格情况
  getOtherSpescWork: function (specId_init, name_init) {
    const that = this
    for (var idx in that.data.productInfo.specs) {
      if (that.data.productInfo.specs[idx].id != specId_init) {

        for (var idx2 in that.data.productInfo.specs[idx].vals) {
         /*  if (that.data.productInfo.specs[idx].vals[idx2].work) { */
            if (that.judgeOrtherSpescWork(specId_init,name_init,that.data.productInfo.specs[idx].vals[idx2].specId, that.data.productInfo.specs[idx].vals[idx2].name)) {
              that.data.productInfo.specs[idx].vals[idx2].work = true
            } else {
              that.data.productInfo.specs[idx].vals[idx2].work = false
            }
            
        /*   } */

        }

      }
    }
    that.setData({
      productInfo: that.data.productInfo
    })
  },
  conditionStatus:function(e){
    const that = this
    for(var i in that.data.productInfo.specs){
      if(that.data.productInfo.specs[i].choosed){
        
      }else{
        return false
      }
    }
    return true
  },
  confirmProduct:function(e){
    const  that = this
    var  tempArray = that.data.productInfo.subProducts
    var chooseSpecs =  []
    var temp = {
      specId: '',
      name: ''
    }
    for(var idx in that.data.productInfo.specs){
      for(var idx2 in that.data.productInfo.specs[idx].vals){
        if(that.data.productInfo.specs[idx].vals[idx2].work){
          if(that.data.productInfo.specs[idx].vals[idx2].choosed){
            temp.specId  = that.data.productInfo.specs[idx].vals[idx2].specId
            temp.name = that.data.productInfo.specs[idx].vals[idx2].name
            chooseSpecs.push(temp)
            temp  = {}
            break
          }
        }
      }
    }
     that.setData({
      tempArray:tempArray
     })
    for(var i in chooseSpecs){
      tempArray  = that.slideProduct(chooseSpecs[i])
      that.data.tempArray = []
      that.setData({
        tempArray:tempArray
       })
    }
    return tempArray[0]
  },
  slideProduct:function(data){
    const  that = this
    var  array=[]
    var  targetArray = []
    /* console.log('slideProduct')
    console.log(data)
    console.log(that.data.tempArray) */
    targetArray  = that.data.tempArray
    for(var idx in targetArray){
      for(var idx2 in targetArray[idx].specVals){
        if(targetArray[idx].specVals[idx2].specId == data.specId &&  targetArray[idx].specVals[idx2].name == data.name){
          array.push(targetArray[idx])
        }
      }
    }
    /* console.log('array')
    console.log(array) */
    return array
  },
  //初始化产品数据 
  initProduct: function (e) {
    const that = this
    for (var idx in that.data.productInfo.specs) {
      that.data.productInfo.specs[idx].choosed = false
      for (var idx2 in that.data.productInfo.specs[idx].vals) {
        that.data.productInfo.specs[idx].vals[idx2].choosed = false
        if (that.judgeSpescWork(that.data.productInfo.specs[idx].vals[idx2].specId, that.data.productInfo.specs[idx].vals[idx2].name)) {
          that.data.productInfo.specs[idx].vals[idx2].work = true
        } else {
          that.data.productInfo.specs[idx].vals[idx2].work = false
        }
      }
    }

    for(var i in  that.data.productInfo.subProducts){
      if(that.data.productInfo.subProducts[i].type  == 1){
        that.data.chooseProduct = that.data.productInfo.subProducts[i]
        break;
      }
    }
    for(var j in that.data.chooseProduct.specVals){
      for(var j2 in that.data.productInfo.specs){
        if(that.data.productInfo.specs[j2].id == that.data.chooseProduct.specVals[j].specId){
          that.data.productInfo.specs[j2].choosed  = true
        }
        for(var j3 in that.data.productInfo.specs[j2].vals){
          if(that.data.productInfo.specs[j2].vals[j3].specId == that.data.chooseProduct.specVals[j].specId && that.data.productInfo.specs[j2].vals[j3].name == that.data.chooseProduct.specVals[j].name){
            that.data.productInfo.specs[j2].vals[j3].choosed  =  true
          }
        }
      }
    }
    
    that.setData({
      productInfo: that.data.productInfo,
      chooseProduct:that.data.chooseProduct
    })
  },
  judgeOrtherSpescWork:function(specId_init,name_init,specId,name){
    const that = this
    for (var idx in that.data.productInfo.subProducts) {
      for (var idx2 in that.data.productInfo.subProducts[idx].specVals) {
        if (that.data.productInfo.subProducts[idx].specVals[idx2].specId == specId_init && that.data.productInfo.subProducts[idx].specVals[idx2].name == name_init) {

          for (var idx2 in that.data.productInfo.subProducts[idx].specVals) {
            if (that.data.productInfo.subProducts[idx].specVals[idx2].specId == specId && that.data.productInfo.subProducts[idx].specVals[idx2].name == name) {
              return  true
              break
            }
          }

        }

      }
    }
    return false;
  },

  judgeSpescWork: function (specId, name) {
    const that = this
    for (var idx in that.data.productInfo.subProducts) {
      for (var idx2 in that.data.productInfo.subProducts[idx].specVals) {
        if (that.data.productInfo.subProducts[idx].specVals[idx2].specId == specId && that.data.productInfo.subProducts[idx].specVals[idx2].name == name) {
          return true
          break;
        }

      }
    }
    return false;
  },
  onBackTap:function(e){
    wx.navigateBack({

    })
  },
  onbackHomeTap:function(e){
    wx.switchTab({
      url: '../index/index',
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
    this.getWindowWidth()
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
  onShareAppMessage: function (options) {
    console.log(options);
    const that = this
    let product = this.data.productInfo;
    /* let showPrice = product.minPrice/100;
    if (product.minPrice < product.maxPrice) {
      showPrice = showPrice + '~' + product.maxPrice/100
    } */
    // let title = `${product.name}`;
    let title = `[ ￥${product.price} ] ${product.name}`;
    let path = `pages/detail/detail?productId=${product.id}&classifyId=${product.classify.id}`;
    // if (that.data.distributor.id) {
    //   path = path + '&distributorId=' + that.data.distributor.id;
    // }
    console.log(path);
    let imageUrl = product.images[0].url;

    return app.tools.onShare(options, {
      title,
      path,
      imageUrl
    });
  }
})