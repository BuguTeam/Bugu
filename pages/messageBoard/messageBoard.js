//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    inputVal: '',
    msgData: [
      // { msg: 'x00000xxx' },
      // { msg: '1111' },
      // { msg: 'xx22222222222xx' }
    ]
  },
  changeInputVal(ev) {
    this.setData({
      inputVal: ev.detail.value
    });
  },
  delMsg(ev) {
    // console.log(ev.target.dataset.index);
    var n = ev.target.dataset.index;
    var list = this.data.msgData;
    list.splice(n, 1);
    this.setData({
      msgData: list
    });
    wx.setStorage({
      key: "msgData",
      data: list,
      success: function (res) {
        console.log('存储缓存成功')
      }
    });
  },
  addMsg() {
    // console.log(this.data.inputVal);
    // this.data.msgData.push({
    //   msg:this.data.inputVal
    // });
    var list = this.data.msgData;
    list.push({
      msg: this.data.inputVal
    });
    //更新
    this.setData({
      inputVal: '',
      msgData: list
    });
    wx.setStorage({
      key: "msgData",
      data: list,
      success: function (res) {
        console.log('存储缓存成功')
      }
    });
  },

  //事件处理函数
  onLoad: function (options) {
    console.log('onLoad')
    console.log('读取缓存成功')
    var that = this;
    wx.getStorage({
      //获取数据的key
      key: 'msgData',
      success: function (res) {
        that.setData({
          msgData: res.data
        })
      }
    });
  }
})