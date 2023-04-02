Component({
  data: {
    selected: 0,
    color: "#86909C",
    selectedColor: "#165DFF",
    tabList: [{
      pagePath: "/pages/index/index",
      iconPath: "/assets/images/home.png",
      selectedIconPath: "/assets/images/home-selected.png",
      text: "首页"
    }, {
      pagePath: "/pages/my/index",
      iconPath: "/assets/images/my.png",
      selectedIconPath: "/assets/images/my-selected.png",
      text: "我的"
    }]
  },

  methods: {
    switchTab(e) {
      console.log(this.getTabBar());
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url
      })
      this.setData({
        selected: data.index
      })
    }
  }
})