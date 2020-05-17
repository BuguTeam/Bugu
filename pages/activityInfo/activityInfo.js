const app = getApp();
Page({
  data: {
    ColorList: app.globalData.ColorList,
    color: 'red',
    activityName:"买奶茶",
    activityStartTime:"2020-5-8 12:00:00",
    activityRegisterDDL: "2020-5-9 12:00:00",
    activityMaxParticipants:5,
    activityCurrentParticipants:2,
    activityDescription:"啦啦啦啦啦",
    activityStatus: "",
    latitude:40,
    longitude:116,
    rate: "33%",
    locationName:"北京大学理科一号楼",
    hasParticipate:false,
    buttonMessage:"点击参与活动",
    discussionTag:"讨论版"
  },
  onLoad(e) {
    let response = JSON.parse(e.query);
    console.log(response)
    /*let fake_response =
    {
      "id": "2", // 活动id
      "name": "约奶茶",
      "startTime": "2020-05-03 19:45:00",
      "registrationDDL": "2020-05-03 19:45:00",
      "description": "呜哇呜哇喵喵嘤呜哇呜哇喵喵嘤呜哇呜哇喵喵嘤呜哇呜哇喵喵嘤呜哇呜哇喵喵嘤呜哇呜哇喵喵嘤呜哇",
      "maxParticipantNumber": "10",
      "currentParticipantNumber": "3",
      "status": "招募人员中",
      "location": {
        "name": "理教",
        "longitude": "115",
        "latitude": "30",
        "type": "坐标类型",
      },
      "initiator": "id", 
      "participants": ["id1", "id2", "id3"],
      "discussionBoard": "id",
    }*/
    let that = this;
    that.setData({
      activityName:response.name,
      activityStartTime:response.startTime,
      activityRegisterDDL:response.registrationDDL,
      activityMaxParticipants:
      response.maxParticipantNumber,
      activityCurrentParticipants:
      response.currentParticipantNumber,
      activityDescription: (response.description == "") ? "暂无描述" :response.description,
      //activityStatus:response.status,
      latitude: parseFloat(response.location.latitude),
      longitude: parseFloat(response.location.longitude),
      //latitude: 39.991212,
      //longitude: 116.312891,
      locationName: response.location.name,
      rate: (100 * parseInt(response.currentParticipantNumber) / parseInt(response.maxParticipantNumber))+"%",
    })
    let flag=false;
    if(response.participants!=undefined){
      for (let i = 0; i < response.participants.length;++i)      {
        if(response.participants[i]==response.initiator){
          flag=true;
          break;
        }
      }
    }
    that.setData({
      hasParticipate:flag,
      buttonMessage:(flag)?"进入讨论版":"点击参与活动",
      discussionTag:(flag)?"讨论版":"报名参与"
    })
    setTimeout(function () {
      that.setData({
        loading: true
      })
    }, 500)
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  SetColor(e) {
    this.setData({
      color: e.currentTarget.dataset.color,
      modalName: null
    })
  },
  SetActive(e) {
    this.setData({
      active: e.detail.value
    })
  }
})