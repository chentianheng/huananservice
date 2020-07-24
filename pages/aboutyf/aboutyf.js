const app = getApp()
Page({
	data: {
    titleBarHeight: app.globalData.titleBarHeight,
    statusBarHeight: app.globalData.statusBarHeight,
	},

	onShow: function () {
    this.setNaviBar()
	},
  setNaviBar() {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#19285C',
    })
    wx.setNavigationBarTitle({
      title: '做小程序找云风科技',
    })
  },
  onBackTap:function(e){
    console.log('hcj');
    wx.navigateBack({
			complete: (res) => {},
		})
  },
	callmeTap: function () {
		wx.makePhoneCall({
      phoneNumber: '15521026970'
		})
	}

});
