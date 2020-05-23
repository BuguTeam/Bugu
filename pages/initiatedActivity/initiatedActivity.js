// pages/initiatedActivity/initiatedActivity.js
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArr: app.globalData.ColorList,
    newlist: app.globalData.activity_list_fake,
    
    randomColorArr: [], 
    activitylist: [],
    show_message: false,
    
    
    limit_per_request: 3,
    lastActivityTime: '', 
    tagBackgroundColor:"#39C5BB",
    message: undefined,
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
            let list = self.data.newlist
            if (typeof self.data.activitylist !== 'undefined')
                list = self.data.activitylist
            
            console.log('current list: ', list)
       
            let newlist = self.data.newlist;
            if (typeof res.data.alist !== "undefined")
                newlist = res.data.alist
            
            list = list.concat(newlist)
            /*
            // For debug
            if (list.length == 0)
              list = self.data.newlist
            */
            // For deployment
            if (list.length == 0) {
                self.setData({
                    message: 'You have not initated any activity yet!',
                    show_message:true
                })
            }
            
            util.getWeekday(list)
            self.setData({
                activitylist: list,
                lastActivityTime: res.data.lastActivityTime
            })
            
            self.generateRandomBgColor()
            console.log(self.data.activitylist)
        },
        fail: function(res) {
            console.log('登陆失败！' + res.errMsg)
        }
    })
  },

  clickForActivityDetail: function(e){
      console.log(e)
      var that = this
      var index = e.currentTarget.id
      console.log(index)
      //将对象转为string
      var query = JSON.stringify(that.data.activitylist[index])
      wx.navigateTo({
        url: '../activityInfo/activityInfo?query=' + query,
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