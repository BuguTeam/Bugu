// pages/createActivity/createActivity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTime: '12:01',
    startDate: '2020-05-01',
    endTime: '12:01',
    endDate: '2030-05-01',
    maxParticipantNumber: undefined,
    name: "",
    discription:"",
    longitude: undefined,
    latitude: undefined,
    location:undefined,
    phoneLoc:undefined,
    locationList:[],
    locationLatLng:[],
    tagBackgroundColor:"#39C5BB"
  },

  maxParticipantNumberInput: function (e) {
    this.setData({
      maxParticipantNumberInput: e.detail.value
    })
  },

  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  discriptionInput: function (e) {
    this.setData({
      discription: e.detail.value
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
    let name=this.data.location[e.detail.value]
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
    }

    let res={
      name:this.data.name,
      startTime:this.data.startDate+" "+this.data.startTime,
      registrationDDL:this.data.endDate+" "+this.data.endTime,
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self=this
    wx.getLocation({
      success:res=>{
        self.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
        wx.request({
          url: "https://apis.map.qq.com/ws/geocoder/v1/?location=" + this.data.latitude + "," + this.data.longitude + "&key=FQNBZ-2UYCJ-3QVF3-F7JAP-INVST-4JBYR&get_poi=1",
          success: function (res) {
            self.setData({
              location:res.data.result.formatted_addresses.recommend,
              phoneLoc: res.data.result.formatted_addresses.recommend
            })
          }
        })
      }
    })
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