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
    activityStatus: "招募人员中",
    latitude:40,
    longitude:120,
    rate: "33%",
    locationName:"北京大学理科一号楼",
    hasParticipate:false,
    buttonMessage:"点击参与活动"
  },
  onLoad() {
    let fake_response =
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
    }
    let that = this;
    that.setData({
      activityName:fake_response.name,
      activityStartTime:fake_response.startTime,
      activityRegisterDDL:fake_response.registrationDDL,
      activityMaxParticipants: fake_response.maxParticipantNumber,
      activityCurrentParticipants: fake_response.currentParticipantNumber,
      activityDescription: (fake_response.description == "") ? "暂无描述" :fake_response.description,
      activityStatus:fake_response.status,
      latitude: parseFloat(fake_response.location.latitude),
      longitude: parseFloat(fake_response.location.longitude),
      rate: fake_response.maxParticipantNumber,
      locationName: fake_response.location.name,
      rate: (100 * parseInt(fake_response.currentParticipantNumber) / parseInt(fake_response.maxParticipantNumber))+"%",
    })
    let flag=false;
    for (let i = 0; i < fake_response.participants.length;++i){
      if(fake_response.participants[i]==fake_response.initiator){
        flag=true;
        break;
      }
    }
    that.setData({
      hasParticipate:flag,
      buttonMessage:(flag)?"进入讨论版":"点击参与活动"
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