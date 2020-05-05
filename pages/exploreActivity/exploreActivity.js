// pages/exploreActivity/exploreActivity.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArr: app.globalData.ColorList,
    /*
     *colorArr: ['cyan', 'blue', 'mauve', 'pink', 'red', 'orange', 'green', 'purple'],
     */
    randomColorArr: [], 
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    Monate: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        
    activitylist: [
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
        password: undefined
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
        password: undefined
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
        password: undefined
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
        password: undefined
    },
    ],
    
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
        password: undefined
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
        password: undefined
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
        password: undefined
    }],
    
    limit_per_request: 3,
    lastActivityTime: '', 
    tagBackgroundColor:"#39C5BB"
  },

  tapName: function(event) {
    console.log(event)
  },
  
  generateRandomBgColor: function() {
    // 为activitylist中每一卡片生成随机颜色
    let self=this,
        colorArr = self.data.colorArr,
        colorNum = colorArr.length,
        randomColorArr = self.data.randomColorArr,
        randomColorLen = randomColorArr.length,
        listLen = self.data.activitylist.length;
    do {
        let random = colorArr[Math.floor(Math.random() * colorNum)];
        randomColorArr.push(random.name);
        randomColorLen ++;
    } while (randomColorLen < listLen)
        
    self.setData({
        randomColorArr: randomColorArr
    })
  },
  
  getWeekday: function() {
      let self=this,
          activitylist = self.data.activitylist,
          i = 0,
          len = self.data.activitylist.length,
          weekdays = self.data.weekdays,
          Monate = self.data.Monate;
      for (; i < len; i++)
      {
          let item = activitylist[i], 
              date = new Date(item.startTime * 1000);
          activitylist[i].day = 
            (Monate[date.getMonth()]) + ' ' + date.getDate() + ' ' + (weekdays[date.getDay()]);
      }
      self.setData({
        activitylist: activitylist
    })
  },
  getActivityList: function() {
    let self = this,
        third_session = wx.getStorageSync('third_session');
    console.log('get third_session: ', third_session)
    let send = {
            third_session: third_session,
            limit: JSON.stringify(self.data.limit_per_request),
            lastActivityTime: JSON.stringify(self.data.lastActivityTime),
        }
    console.log('sends ', send)
    wx.request({
        url: 'http://127.0.0.1:5000/user/getActivityList',
        data: {
            third_session: third_session,
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
            let list = self.data.newlist
            if (typeof self.data.activitylist !== "undefined")
                list = self.data.activitylist
            console.log('current list: ', list)
       
            if (typeof res.data.alist !== "undefined")
                list = list.concat(res.data.alist)
            else
                list = list.concat(self.data.newlist)
            self.setData({
                activitylist: list,
                lastActivityTime: res.data.lastActivityTime
            })
            
            self.generateRandomBgColor()
            self.getWeekday()
            console.log(self.data.activitylist)
        },
        fail: function(res) {
            console.log('登陆失败！' + res.errMsg)
        }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log('onLoad:')
      var self = this;
      self.setData({
          activitylist: [],
          lastActivityTime: '',
      })
    // 获取最新发布的活动列表
    self.getActivityList()
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      console.log('onShow:')
      /*
      var self = this;
      self.setData({
          activitylist: [],
          lastActivityTime: '',
      })
      self.getActivityList()
      */
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      console.log('onPullDownRefresh')
  },
  upperHandler: function() {
      console.log('upperHandler')
    // TODO: 获取最新发布的活动列表
    
      self.setData({
          activitylist: self.data.newlist
      })
      
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      console.log('onReachBottom')
  },
  /**
   * 页面上拉触底事件的处理函数
   *
   * scroll-view内的元素无法触发onReachBottom，
   * 参考https://developers.weixin.qq.com/community/develop/doc/00006e0f474898aad419c97aa56000?_at=1568995170898
   * 实现触底加载
   */
  bottomHandler: function () {
      console.log('bottomHandler')
      let self=this;
      self.getActivityList()
      console.log(self.data.activitylist)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onRefreshClick: function() {
      console.log('onRefreshClick:')
      var self = this;
      self.setData({
          activitylist: [],
          lastActivityTime: '',
      })
    // 获取最新发布的活动列表
    self.getActivityList()
      
  }
})