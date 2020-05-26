// Development:
//var rootUrl = 'http://127.0.0.1:5000/'
// Deployment:
var rootUrl = 'http://39.104.25.65:80/'
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const ColorList = [{
        title: '嫣红',
        name: 'red',
        color: '#e54d42'
      },
      {
        title: '桔橙',
        name: 'orange',
        color: '#f37b1d'
      },
      {
        title: '明黄',
        name: 'yellow',
        color: '#fbbd08'
      },
      {
        title: '橄榄',
        name: 'olive',
        color: '#8dc63f'
      },
      {
        title: '森绿',
        name: 'green',
        color: '#39b54a'
      },
      {
        title: '天青',
        name: 'cyan',
        color: '#1cbbb4'
      },
      {
        title: '海蓝',
        name: 'blue',
        color: '#0081ff'
      },
      {
        title: '姹紫',
        name: 'purple',
        color: '#6739b6'
      },
      {
        title: '木槿',
        name: 'mauve',
        color: '#9c26b0'
      },
      {
        title: '桃粉',
        name: 'pink',
        color: '#e03997'
      },
      {
        title: '棕褐',
        name: 'brown',
        color: '#a5673f'
      },
      {
        title: '玄灰',
        name: 'grey',
        color: '#8799a3'
      },
      /*
      {
        title: '草灰',
        name: 'gray',
        color: '#aaaaaa'
      },
      {
        title: '墨黑',
        name: 'black',
        color: '#333333'
      },
      {
        title: '雅白',
        name: 'white',
        color: '#ffffff'
      },*/
    ]

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const readableDay = date => {
  const month = months[date.getMonth()]
  const day = date.getDate()
  const weekday = weekdays[date.getDay()]
  
  return month + ' ' + day + ' ' + weekday
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function userLogin () {
  wx.checkSession({
      success: function() {
          // 存在登录态
      },
      fail: function() {
          // 不存在登录态
          onLogin()
      }
  })
}

function onLogin() {
  console.log('Executing util.onLogin')
  wx.login({
      success: function (res) {
          if (res.code) {
              // 发起网络请求
              
              console.log('returns code=: ', res.code)
              wx.request({
                  url: rootUrl + 'login',
                  method: 'post',
                  data: {
                      code: res.code
                  },
                  success: function (res) {
                      const self = this
                      //var json = JSON.parse(res.data.Data)
                      console.log('returns: ', res.data)
                      console.log('returns: ', res.data.third_session)
                      //console.log('returns json: ', json)
                      wx.setStorage({
                          key: 'third_session',
                          data: res.data.third_session
                      })
                      getUserInfo()
                  },
                  fail: function (res) {
                      console.log('登陆失败！' + res.errMsg)
                  }
              })
          }
      },
      fail: function (res) {
      }
  })
}
function getUserInfo () {
    console.log('Executing util.getUserInfo')
    wx.getUserInfo({
      success: function (res) {
          var userInfo = res.userInfo
          userInfoSetInSQL(userInfo)
      },
      fail: function() {
          //userAccess()
      }
    })
}
function userInfoSetInSQL(userInfo) {
    console.log('Executing util.userInfoSetInSQL')
    var third_session = wx.getStorageSync('third_session');
    console.log('3rd_session: ', third_session)
    wx.request({
        url: rootUrl + '/register',
        method: 'post',
        data: {
            third_session: third_session,
            nickname: userInfo.nickName,
            avatar_url: userInfo.avatarUrl,
            gender: userInfo.gender,
            province: userInfo.province,
            city: userInfo.city,
            country: userInfo.country
        },
        success: function (res) {
            console.log('SQL更新用户数据成功！')
        },
        fail: function (res) {
            console.log('SQL更新用户数据失败！' + res.errMsg)
        }
    })
}

function getWeekday (alist) {
  let i = 0, len = alist.length;
  for (; i < len; i++)
  {
      let item = alist[i], 
          date = new Date(item.startTime);
      alist[i].day = readableDay(date)
  }
}

function statusToColor(status) {
    // status is one of: "招募人员中", "招募完毕，等待活动开始", "活动进行中", "活动已结束", "已取消", "全部"
    let color = "white";
    switch (status) {
        case "招募人员中": 
            color = "blue"; break;
        case "招募完毕，等待活动开始":
            color = "green"; break;
        case "活动进行中": 
            color = "yellow"; break;
        case "活动已结束": 
            color = "grey"; break;
        case "已取消": 
            color = "white";break;
    }
    return color
}

function generateBgColor (alist) {
  let i = 0, len = alist.length;
  for (; i < len; i++)
  {
      alist[i].color = statusToColor(alist[i].status)
  }
}

function generateRandomBgColor (length) {
  let colorArr = ColorList,
      colorNum = colorArr.length,
      randomColorArr = [],
      randomColorLen = 0,
      targetLength = length;
    do {
        let random = colorArr[Math.floor(Math.random() * colorNum)];
        randomColorArr.push(random.name);
        randomColorLen ++;
    } while (randomColorLen < targetLength)
        
    return randomColorArr
}


module.exports = {
  formatTime: formatTime,
  onLogin: onLogin,
  getWeekday: getWeekday,
  generateRandomBgColor: generateRandomBgColor,
  generateBgColor: generateBgColor,
}
