const app = getApp()
Component({
  properties: {
    products: {   //navbarData   由父页面传递的数据，变量名字自命名
      type: Array,
      value: [],
      observer: function (newVal, oldVal) { }
    }
  },
  data: {
    nopic: '/images/icons/nopic.png'
  },
  attached: function () {
   
  },
  methods: {
    onTeaTap: function (e) {
      console.log(e)
      const that = this
      var index = e.currentTarget.dataset.index
      var eventDetail = {
        data: that.data.products[index],
      }
      // 触发事件的选项 bubbles是否冒泡，composed是否可穿越组件边界，capturePhase 是否有捕获阶段
      var eventOption = {
        composed: true
      }
      this.triggerEvent('click_btn', eventDetail, eventOption);
    },
  }

}) 