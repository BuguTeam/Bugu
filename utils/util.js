const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
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
                  url: 'http://127.0.0.1:5000/login', // TODO
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
        url: 'http://127.0.0.1:5000/register',
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
module.exports.onLogin = onLogin; //暴露接口