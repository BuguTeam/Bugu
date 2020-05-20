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
    init_alist: [],

    part_cur: 0,
    part_alist: [],

    limit_per_request: 6,
    lastActivityTime: '',
    
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    
    newlist: [
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
  getWeekDay: function() {
      console.log('on update')
      let self=this,
          ilist = self.data.init_alist,
          plist = self.data.part_alist,
          i = 0,
          ilen = self.data.init_alist.length,
          plen = self.data.part_alist.length,
          weekdays = self.data.weekdays,
          months = self.data.months;
      for (; i < ilen; i++)
      {
          let item = ilist[i], 
              date = new Date(item.startTime);
          ilist[i].day = 
            (months[date.getMonth()]) + ' ' + date.getDate() + ' ' + (weekdays[date.getDay()]);
      }
      for (i = 0; i < plen; i++)
      {
          let item = plist[i], 
              date = new Date(item.startTime);
          plist[i].day = 
            (months[date.getMonth()]) + ' ' + date.getDate() + ' ' + (weekdays[date.getDay()]);
      }
      self.setData({
        init_alist: ilist,
        part_alist: plist,
      })
  },
  
  getActivityList: function() {
    console.log('index - getActivityList');
    let self = this,
        third_session = wx.getStorageSync('third_session');
    console.log('get third_session: ', third_session)
    
    wx.request({
        url: 'http://127.0.0.1:5000/user/UserActivityHistory',
        data: {
            third_session: third_session,
            character: JSON.stringify("initiator"),
            status: JSON.stringify("全部"),
            limit: JSON.stringify(self.data.limit_per_request),
            lastActivityTime: JSON.stringify(self.data.lastActivityTime),
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'chartset': 'utf-8'
        },
        
        success:function(res){
            console.log('request getActList returns: ', res.data)
            console.log('request getActList returns: ', res.data.alist)
       
            let list = self.data.newlist;
            if (typeof res.data.alist !== "undefined")
                list = res.data.alist
            
            // For debug
            if (list.length == 0)
              list = self.data.newlist
            /*
            // For deployment
            if (list.length == 0) {
                self.setData({
                    message: 'You have not initated any activity yet!',
                    show_message:true
                })
            }
            */
            
            self.setData({
                init_alist: list,
            })
            self.getWeekDay()
            
        },
        fail: function(res) {
            console.log('登陆失败！' + res.errMsg)
        }
    })
    
    wx.request({
        url: 'http://127.0.0.1:5000/user/UserActivityHistory',
        data: {
            third_session: third_session,
            character: JSON.stringify("participant"),
            status: JSON.stringify("全部"),
            limit: JSON.stringify(self.data.limit_per_request),
            lastActivityTime: JSON.stringify(self.data.lastActivityTime),
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'chartset': 'utf-8'
        },
        
        success:function(res){
            console.log('request part getActList returns: ', res.data)
            console.log('request part getActList returns: ', res.data.alist)
       
            let list = self.data.newlist;
            if (typeof res.data.alist !== "undefined")
                list = res.data.alist
            
            // For debug
            if (list.length == 0)
              list = self.data.newlist
            /*
            // For deployment
            if (list.length == 0) {
                self.setData({
                    message: 'You have not initated any activity yet!',
                    show_message:true
                })
            }
            */
            
            self.setData({
                part_alist: list,
            })
            self.getWeekDay()
            
        },
        fail: function(res) {
            console.log('登陆失败！' + res.errMsg)
        }
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
    
    let self=this
    self.setData({
        init_alist: [],
        part_alist: [],
    })
    self.getActivityList()
  },
  
  onShow: function () {
      console.log('onShow:')
      
      var self = this;
      self.setData({
          init_alist: [],
          part_alist: [],
      })
      self.getActivityList()
      
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
