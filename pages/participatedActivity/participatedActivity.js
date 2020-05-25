// pages/participatedActivity/participatedActivity.js
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newlist: app.globalData.activity_list_fake,
    
    randomColorArr: [], 
        
    activitylist: [],
    
    
    limit_per_request: 3,
    lastActivityTime: '', 
    tagBackgroundColor:"#39C5BB",
    message: undefined,
  },

    show_message: false,
  tapName: function(event) {
    console.log(event)
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
        url: app.globalData.rootUrl + 'user/UserActivityHistory',
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
            
            let oldList = self.data.fakeList,
                newList = self.data.fakeList;
                
            if (typeof self.data.activitylist !== "undefined")
                oldList = self.data.activitylist
            else
                util.getWeekday(oldList)
            
            if (typeof res.data.alist !== "undefined")
                newList = res.data.alist
       
            util.getWeekday(newList)
            
            let list = oldList.concat(newList),
                randomColorArr = self.data.randomColorArr.concat(util.generateRandomBgColor(list.length))
            
            
            // For debug
            if (list.length == 0) {
              list = self.data.newlist
              randomColorArr = util.generateRandomBgColor(list.length)
            }
            
            // For deployment
            // If current activity list is empty, show a message.
            
            if (list.length == 0) {
                self.setData({
                    message: 'You have not participated any activity yet!',
                    show_message:true
                })
            }
            
            util.generateBgColor(list)
            self.setData({
                activitylist: list,
                lastActivityTime: res.data.lastActivityTime,
                randomColorArr: randomColorArr
            })
            
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
      
  },
  clickDeleteButton: function(e){
    let self = this;
    let index = e.currentTarget.dataset.actindex,
        activity_id = self.data.activitylist[index].id;
    console.log('clickDeleteButton: ', activity_id)
    console.log('e: ', e)
    wx.request({
        url: app.globalData.rootUrl + "user/exitfromActivity",
        data: {
          third_session: wx.getStorageSync('third_session'),
          activity_id: activity_id
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'chartset': 'utf-8'
        },
        success: function (res) {
          console.log(res);
          wx.showToast({
            title: res.data,
            icon: 'none',
            duration: 4000
          })
        }
    })
  }
})