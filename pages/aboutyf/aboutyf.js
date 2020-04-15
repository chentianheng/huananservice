Page({
	data: {

	},

	onShow: function () {

	},
  onBackTap:function(e){
    console.log('hcj');
    wx.navigateBack({
			complete: (res) => {},
		})
  },
	callmeTap: function () {
		wx.makePhoneCall({
      phoneNumber: '13242329988'
		})
	}

});
