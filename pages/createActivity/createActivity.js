// pages/createActivity/createActivity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTime:'请选择时间',
    startDate: '活动开始日期',
    endTime: '请选择时间',
    endDate: '报名截止日期',
    maxParticipantNumber: undefined,
    name: "",
    description:"",
    longitude: undefined,
    latitude: undefined,
    location: "",
    phoneLoc:undefined,
    locationList:[],
    locationLatLng:[],
    tagBackgroundColor:"#39C5BB",
    participants_value:"",
    name_value: "",
    description_value:""
  },

  maxParticipantNumberInput: function (e) {
    this.setData({
      maxParticipantNumber: e.detail.value
    })
  },

  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  descriptionInput: function (e) {
    this.setData({
      description: e.detail.value
    })
  },

  startDateChange: function (e) {
    this.setData({
      startDate: e.detail.value
    })
  },

  startTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },

  endDateChange: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },

  endTimeChange: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },

  locationInput:function(e){
    if(e.detail.value=="")
      return
    let self=this
    wx.request({
      url: "https://apis.map.qq.com/ws/place/v1/search?boundary=nearby("+self.data.latitude+","+self.data.longitude+",1000,1)&keyword="+e.detail.value+"&page_size=20&page_index=1&orderby=_distance&key=FQNBZ-2UYCJ-3QVF3-F7JAP-INVST-4JBYR",
      success:function(res){
        let tmp=res.data.data
        let data=[]
        let loc=[]
        for(let i=0;i<tmp.length;++i){
          data.push(tmp[i].title+","+tmp[i].address)
          loc.push(tmp[i].location)
        }
        self.setData({
          locationList: data,
          locationLatLng:loc
        })
      }
    })
  },

  locationPicker:function(e){
    let name=this.data.locationList[e.detail.value]
    let loc = this.data.locationLatLng[e.detail.value]
    this.setData({
      location:name,
      longitude: loc.lng,
      latitude: loc.lat
    })
  },

  tapOnLocationTag:function(e){
    this.setData({
      tagBackgroundColor: this.data.tagBackgroundColor == "#39C5BB"? "grey" : "#39C5BB",
      location: this.data.tagBackgroundColor == "#39C5BB" ? "不限定位置" : this.data.phoneLoc
    })
  },

  clickButton:function(e){
    if(this.data.name==""){
      wx.showToast({
        title: '请提供活动名称!',
        icon: 'none',
        duration: 2000
      }) 
      return;
    }
    else if(this.data.startDate=='活动开始日期'){
      wx.showToast({
        title: '请设置活动开始日期!',
        icon: 'none',
        duration: 2000
      }) 
      return;
    }
    else if(this.data.startTime=='请选择时间'){
      wx.showToast({
        title: '请设置活动开始时间!',
        icon: 'none',
        duration: 2000
      }) 
      return;
    }
    else if (new Date(this.data.startDate + " " + this.data.startTime) < Date.now()){
      wx.showToast({
        title: '活动开始时间不能设置为过去!',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    else if(this.data.maxParticipantNumber!=undefined&&this.data.maxParticipantNumber<=0){
      console.log(this.data.maxParticipantNumber)
      wx.showToast({
        title: '最大参与人数应大于0!',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if(this.data.maxParticipantNumber==undefined)
      this.data.maxParticipantNumber=-1
    let endDate,endTime;
    if (this.data.endDate == '报名截止日期'
      || this.data.endTime == '请选择时间'){
      endDate=this.data.startDate
      endTime = this.data.startTime
      wx.showToast({
        title: '未完整设置报名截止时间,默认与活动开始时间相同!',
        icon: 'none',
        duration: 2000
      }) 
    }
    else if (new Date(this.data.endDate + " " + this.data.endTime) < Date.now()) {
      wx.showToast({
        title: '活动报名截止时间不能设置为过去!',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    else{
      endDate = this.data.endDate
      endTime = this.data.endTime
    }

    var third_session = wx.getStorageSync('third_session');

    let res={
      third_session: third_session,
      name:this.data.name,
      startTime:this.data.startDate+" "+this.data.startTime,
      registrationDDL:endDate+" "+endTime,
      description:this.data.description,
      maxParticipantNumber: this.data.maxParticipantNumber,
      location:{
        name:this.data.location,
        longitude:this.data.longitude,
        latitude:this.data.latitude,
        type:"wgs84"
      }
    }

    console.log(res)
    
    wx.request({
      url: "http://127.0.0.1:5000/user/addActivity",
      data: {
        third_session: third_session,
            
        name:JSON.stringify(this.data.name),
        startTime:JSON.stringify(this.data.startDate+" "+this.data.startTime),
        registrationDDL:JSON.stringify(endDate+" "+endTime),
        description:JSON.stringify(this.data.description),
        maxParticipantNumber: JSON.stringify(this.data.maxParticipantNumber),
        location:JSON.stringify({
          name:JSON.stringify(this.data.location),
          longitude:JSON.stringify(this.data.longitude),
          latitude:JSON.stringify(this.data.latitude),
          type:JSON.stringify("wgs84")
        })
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success:function(res){
        console.log(res);
        wx.showToast({
          title: res.data,
          icon: 'none',
          duration: 4000
        })
        setTimeout(
          wx.switchTab({
            url: '../exploreActivity/exploreActivity'
          }), 5000)
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    let self = this
    self.setData({
      startTime: '请选择时间',
      startDate: '活动开始日期',
      endTime: '请选择时间',
      endDate: '报名截止日期',
      maxParticipantNumber: undefined,
      name: "",
      description: "",
      longitude: undefined,
      latitude: undefined,
      location: "",
      phoneLoc: undefined,
      locationList: [],
      locationLatLng: [],
      tagBackgroundColor: "#39C5BB",
      participants_value: "",
      name_value:"",
      description_value:""
    })
    wx.getLocation({
      success: res => {
        self.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
        wx.request({
          url: "https://apis.map.qq.com/ws/geocoder/v1/?location=" + this.data.latitude + "," + this.data.longitude + "&key=FQNBZ-2UYCJ-3QVF3-F7JAP-INVST-4JBYR&get_poi=1",
          success: function (res) {
            self.setData({
              location: res.data.result.formatted_addresses.recommend,
              phoneLoc: res.data.result.formatted_addresses.recommend
            })
          }
        })
      }
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})