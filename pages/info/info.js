// pages/info/info.js
const app = getApp()
const Article = require('../../module/article.js');
const User = require('../../module/user.js');
const Distributor = require('../../module/distributor.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleBarHeight:app.globalData.titleBarHeight,
    statusBarHeight:app.globalData.statusBarHeight,
    windowWidth:app.globalData.windowWidth,
    windowHeight:app.globalData.windowHeight,
    title:'巅味学堂',
    classifyList:[
      {
        type:1,
        name:"平台加盟"
      },{
        type:2,
        name:"新能源汽车",
        
      },{
        type:3,
        name:"行业资讯",
        choosed: true
      }],
    articleList:[],
    superiorId: '',
    search:{
      type: 3,
      pageSize:10,
      pageNumber:1,
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    that.getList()
  },
  onShow() {
    this.recordPath()
  },
  recordPath() {
    let data = {
      pagePath: '资讯页'
    }
    User.recordingPath(data).then(res => {

    })
  },
  getList:function(e){
    var that = this;
    Article.getList(that.data.search).then(function(res) {
      // console.log('文章',res.data.articleDTOList)
      // if (res.status == 1) {
        that.processarticleList(res.data.articleDTOList)
      // }
    })
  },
  processarticleList(data) {
    var that = this;
    console.log(data)
    var articleList = that.data.articleList;
    let classifyList = that.data.classifyList;
    var newList = [];
    for (var i = 0; i < data.length; i++) {
      data[i].formatUpdated = app.util.getDateDiff(data[i].createTime)
    
      for(let ii in classifyList){
        if(data[i].type == classifyList[ii].type){
          data[i].classifyName = classifyList[ii].name
        }
      }
      newList.push(data[i]);
    }
    if (newList != articleList){
      articleList = newList
    }
    that.setData({
      articleList: articleList
    })
  },

  onArticleTap:function(e){
    console.log(e.detail.data)
    var article  = e.detail.data
    if(article.formatType == 1){
      wx.navigateTo({
        url: '../article/article?articleId=' + article.id,
      })
    }else{
      wx.navigateTo({
        url: '../website/website?articleId=' + article.id,
      })
    }
  },
  onColumnChoose(e){
    // console.log("点击分类",e.currentTarget.dataset.id)
    let id  = e.currentTarget.dataset.id
    let classifyList = this.data.classifyList
    let search = this.data.search
    for (let idx in classifyList){
      if (id == classifyList[idx].type){
        classifyList[idx].choosed = true
        // console.log("该idx变成真了：",idx)
      }else{
        classifyList[idx].choosed = false
      }
    }
    search.type = id
    this.setData({
      classifyList,
      search
    })
    this.getList()
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
})