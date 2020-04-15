const app = getApp()
Component({
  properties: {
    articleList: {
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
    onArticleTap: function (e) {
      const that = this
      var index = e.currentTarget.dataset.index
      // console.log(index)
      var eventDetail = {
        data: that.data.articleList[index],
      }
      // 触发事件的选项 bubbles是否冒泡，composed是否可穿越组件边界，capturePhase 是否有捕获阶段
      var eventOption = {
        composed: true
      }
      this.triggerEvent('click_btn', eventDetail, eventOption);
    },
    onPhoneTap: function (e) {
      const that = this
      var index = e.currentTarget.dataset.index
      // console.log(index)
      var eventDetail = {
        data: that.data.articleList[index],
      }
      // 触发事件的选项 bubbles是否冒泡，composed是否可穿越组件边界，capturePhase 是否有捕获阶段
      var eventOption = {
        composed: true
      }
      this.triggerEvent('phone_btn', eventDetail, eventOption);
    },
  }

}) 