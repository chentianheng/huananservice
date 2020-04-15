const app = getApp()
Component({
  properties: {
    cartList: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal) { }
    }
  },
  data: {

  },
  attached: function () {

  },
  methods: {
    onSubTap: function (e) {
      console.log('onSubTap')
      const that = this
      var index = e.currentTarget.dataset.index
      // console.log(index)
      var data = {
        status: 3,
        data: that.data.cartList[index]
      }
      var eventDetail = {
        data: data,
      }
      // 触发事件的选项 bubbles是否冒泡，composed是否可穿越组件边界，capturePhase 是否有捕获阶段
      var eventOption = {
        composed: true
      }
      this.triggerEvent('click_btn', eventDetail, eventOption);
    },
    checkboxChange02: function (e) {
      // console.log(e)
      var data = {
        status: 1,
        data: e.detail.value
      }
      var eventDetail = {
        data: data
      }
      var eventOption = {
        composed: true
      }
      this.triggerEvent('click_btn', eventDetail, eventOption);
    },
    onAddTap: function (e) {
      console.log('onAddTap')
      const that = this
      var index = e.currentTarget.dataset.index
      // console.log(index)
      var data = {
        status: 2,
        data: that.data.cartList[index]
      }
      var eventDetail = {
        data: data,
      }
      // 触发事件的选项 bubbles是否冒泡，composed是否可穿越组件边界，capturePhase 是否有捕获阶段
      var eventOption = {
        composed: true
      }
      this.triggerEvent('click_btn', eventDetail, eventOption);
    },
  },
  
}) 