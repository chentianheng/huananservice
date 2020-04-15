const app = getApp()
Component({
  properties: {
    goodList: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal) { }
    },
    s_index:{
      type: Number,
      value: [],
      observer: function (newVal, oldVal) { }
    }
  },
  data: {
    url:'https://zhaocha.yf-gz.cn/file/1559989322164_c70247c6903ffddd6b01226312f74f07.jpeg'
  },
  attached: function () {

  },
  methods: {
    onGoodTap: function (e) {
      // console.log(e)
      const that = this
      var index = e.currentTarget.dataset.index
      // var tindex = e.currentTarget.dataset.tindex
      // console.log(index)
      var eventDetail = {
        data: that.data.goodList[index],
      }
      // 触发事件的选项 bubbles是否冒泡，composed是否可穿越组件边界，capturePhase 是否有捕获阶段
      var eventOption = {
        composed: true
      }
      this.triggerEvent('click_btn', eventDetail, eventOption);
    },
    onCartTap: function (e) {
      // console.log(e)
      const that = this
      var index = e.currentTarget.dataset.index
      // var tindex = e.currentTarget.dataset.tindex
      // console.log(index)
      var eventDetail = {
        data: {
          tindex:index,
          s_index: that.data.s_index
        },
      }
      // 触发事件的选项 bubbles是否冒泡，composed是否可穿越组件边界，capturePhase 是否有捕获阶段
      var eventOption = {
        composed: true
      }
      this.triggerEvent('cart_btn', eventDetail, eventOption);
    },
  }

}) 