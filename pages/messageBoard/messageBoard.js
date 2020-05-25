var util = require('../../utils/util.js');
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
    list: [
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
    
    //设置scroll的高度
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          scrollHeight: res.windowHeight,
        });
      }
    });
    self.getPageInfo();
  },
  /**
   * 页面下拉刷新事件的处理函数
   */
  refresh: function () {
    console.log('refresh');
    this.setData({
      list: []
    })
    this.getPageInfo();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  bindDownLoad: function () {
    console.log("onReachBottom");
  },
  /*
  bindReply: function (e) {
    console.log(e);
    mydata.commentId = e.target.dataset.commentid;
    mydata.replyUserName = e.target.dataset.commentusername;
    this.setData({
      replyUserName: mydata.replyUserName,
      reply: true
    })
  },
  deleteComment: function (e) {
    console.log(e);
    var self = this;
    var commentId = e.target.dataset.commentid;

    wx.showModal({
      title: '删除评论',
      content: '请确认是否删除该评论？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.rootUrl + 'user/activityDisplayer/discussion/delete/', 
            method: "POST",
            data: {
              commentId: commentId
            },
            header: {
              "content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            success: res => {
              self.refresh();
              wx.showToast({
                title: "删除成功"
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  */
  // 更新页面信息
  // 此处的回调函数在 传入新值之前执行 主要用来清除页面信息
  getPageInfo(page, callback) {

    //if (this.data.debug) return ;
    
    var self = this;
    // This function is not implemented.
    // util.showLoading();
        
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
        wx.hideLoading();  //隐藏loading提示框
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
        self.data.list = res.data;
        self.setData({
          list: self.data.list,
          inputValue: ''
        })
        wx.hideLoading();  //隐藏loading提示框
      }
    })
      
  },
  
})
