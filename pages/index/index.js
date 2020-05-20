//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    
    init_cur: 0,
    init_alist: [
    {
        id:0, 
        name:'約奶茶', 
        startTime: '2020-04-01 00:02:00', 
        registrationDDL: '2020-04-01 00:02:00',
        maxParticipantNumber:4,
        currentParticipantNumber:2,
        description: "",
        location: {
            name: '理教',
            longitude: 116.0,
            latitude: 40.0,
        },
    },
    {
        id:1, 
        name:'借充电器', 
        startTime: '2020-04-02 00:01:00', 
        registrationDDL: '2020-04-01 00:01:00',
        maxParticipantNumber:6,
        currentParticipantNumber:4,
        description: "",
        location: {
            name: '理教',
            longitude: 116.0,
            latitude: 40.0,
        },
    },

    {
        id:2, 
        name:'拼外卖', 
        startTime: '2020-04-03 00:00:00', 
        registrationDDL: '2020-04-01 00:00:00',
        maxParticipantNumber:6,
        currentParticipantNumber:4,
        description: "",
        location: {
            name: '理教',
            longitude: 116.0,
            latitude: 40.0,
        },
    },
    {
        id:3, 
        name:'約奶茶', 
        startTime: '2020-04-04 00:00:00', 
        registrationDDL: '2020-04-01 00:00:00',
        maxParticipantNumber:6,
        currentParticipantNumber:4,
        description: "",
        location: {
            name: '理教',
            longitude: 116.0,
            latitude: 40.0,
        },
    },
    ],

    part_cur: 0,
    part_alist: [
    {
        id:4, 
        name:'約奶茶', 
        startTime: '2020-04-05 00:00:00', 
        registrationDDL: '2020-04-01 00:00:00',
        maxParticipantNumber:4,
        currentParticipantNumber:2,
        description: "",
        location: {
            name: '理教',
            longitude: 116.0,
            latitude: 40.0,
        },
    },
    {
        id:5, 
        name:'借充电器', 
        startTime: '2020-04-06 00:00:00', 
        registrationDDL: '2020-04-01 00:00:00',
        maxParticipantNumber:6,
        currentParticipantNumber:4,
        description: "",
        location: {
            name: '理教',
            longitude: 116.0,
            latitude: 40.0,
        },
    },

    {
        id:6, 
        name:'拼外卖', 
        startTime: '2020-04-07 00:00:00', 
        registrationDDL: '2020-04-01 00:00:00',
        maxParticipantNumber:6,
        currentParticipantNumber:4,
        description: "",
        location: {
            name: '理教',
            longitude: 116.0,
            latitude: 40.0,
        },
    }],

    limit_per_request: 6,
  },
  // cardSwiper
  partCardSwiper(e) {
    this.setData({
      part_cur: e.detail.current
    })
  },
  initCardSwiper(e) {
    this.setData({
      init_cur: e.detail.current
    })
  },
  clickMoreInitActivity: function(e) {
      wx.navigateTo({
        url: '../initiatedActivity/initiatedActivity',
      })
  },
  clickMorePartActivity: function(e) {
      wx.navigateTo({
        url: '../participatedActivity/participatedActivity',
      })
  },
  
  clickForActivityDetail: function(e){
      console.log(e)
      console.log(e.currentTarget)
      console.log(e.currentTarget.dataset)
      var that = this
      var query = JSON.stringify(e.currentTarget.dataset.obj)
      wx.navigateTo({
        url: '../activityInfo/activityInfo?query=' + query,
      })
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
