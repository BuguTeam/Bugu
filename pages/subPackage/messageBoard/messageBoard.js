var util = require('../../../utils/util.js');
const app = getApp()
// 暂时没有实现“回复具体某条评论”，“删除评论”，“上传图片”的功能。
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // for debug
    debug: true,
    p1: "https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg",
    p2: "https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg",
    // page data
    InputBottom: 0,
    activityId: undefined,
    currentComment: "",
    inputValue: "",
    list: [],
    fake_message_list: [
    {
        id:1, // 当前回复的id
        userName: "Alice",
        userAvatarUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg",
        replyUserName: "Bob",
        replyUserAvatarUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg",
        myCommentFlag: false,
        is_img: false,
        content: "喵喵喵",
        insertTime: 1597852800000.0,
    },
    {
        id:2, // 当前回复的id
        userName: "Bob",
        userAvatarUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg",
        replyUserName: "Alice",
        replyUserAvatarUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg",
        myCommentFlag: true,
        is_img: true,
        content: "https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg",
        insertTime: 1597852900000.0,
    },
    {
        id:3, // 当前回复的id
        userName: "Alice",
        userAvatarUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg",
        replyUserName: "Bob",
        replyUserAvatarUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg",
        myCommentFlag: false,
        is_img: false,
        content: "喵喵喵",
        insertTime: 1597852800000.0,
    },
    {
        id:4, // 当前回复的id
        userName: "Bob",
        userAvatarUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg",
        replyUserName: "Alice",
        replyUserAvatarUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg",
        myCommentFlag: true,
        is_img: false,
        content: "汪汪汪",
        insertTime: 1597852900000.0,
    },
    {
        id:5, // 当前回复的id
        userName: "Alice",
        userAvatarUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg",
        replyUserName: "Bob",
        replyUserAvatarUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg",
        myCommentFlag: false,
        is_img: false,
        content: "喵喵喵",
        insertTime: 1597852800000.0,
    },
    {
        id:6, // 当前回复的id
        userName: "Bob",
        userAvatarUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg",
        replyUserName: "Alice",
        replyUserAvatarUrl: "https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg",
        myCommentFlag: true,
        is_img: false,
        content: "汪汪汪",
        insertTime: 1597852900000.0,
    },
    ],
  },

  /**
   * InputFocus: 输入框聚焦时触发
   */
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  /**
   * InputBlur: 输入框失去焦点时触发
   */
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var self = this;
    
    let response = JSON.parse(e.query);
    console.log(' msg response: ', response)
    this.setData({
        activityID: response.activityID
    })
    
    self.getPageInfo();
  },
  // 更新页面信息
  // 此处的回调函数在 传入新值之前执行 主要用来清除页面信息
  getPageInfo(page, callback) {

    //if (this.data.debug) return ;
    
    var self = this;
        
    console.log("getPageInfo");
    let aid = self.data.activityID;
    wx.request({
      url: app.globalData.rootUrl + 'user/activityDisplayer/discussion', 
      method: "POST",
      data: {
        third_session: wx.getStorageSync('third_session'),
        activity_id: JSON.stringify(aid),
      },
      header: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      success: res => {
        console.log('getPageInfo returns: ')
        console.log(res);
        
        let list = res.data;
        let i = 0, len = list.length;
        for (; i < len; i++) {
            list[i].formattedTime = util.formatTime(new Date(list[i].insertTime))
        }
        self.setData({
          list: list
        })
      }
    })
  },
  
  getInput: function(e) {
      this.setData({
          currentComment: e.detail.value
      })
  },
  
  onSubmit: function(e) {
    let self = this;
    let content = self.data.currentComment;
    if (content == "") {
      wx.showToast({
        title: '请输入评论', 
        icon: 'none',
        duration:2000});
      return ;
    }
    let aid = self.data.activityID;
    let send = {
      third_session: wx.getStorageSync('third_session'),
      content: JSON.stringify(content),
      activity_id: JSON.stringify(aid),
      is_img: JSON.stringify(false)
    }
    wx.request({
      url: app.globalData.rootUrl + 'user/activityDisplayer/discussion/create', 
      method: "POST",
      data: send,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: res => {
        console.log(res);
        let list = res.data;
        let i = 0, len = list.length;
        for (; i < len; i++) {
            list[i].formattedTime = util.formatTime(new Date(list[i].insertTime))
        }
        self.setData({
          list: list,
          inputValue: ''
        })
      }
    })
      
  },
  
})
