# Bugu

Bugu front end.

## 注意！！！

现在默认使用'http://39.104.25.65:80/'作为后端服务器。如果需要使用本地调试，那么需要在`app.js`的globalData中把rootUrl改成'http://127.0.0.1:5000/'.

#### third_session实现

openid是用户的唯一标识！

- 比如判断用户是否加入活动，只能用用户的Openid来建立关联，不能用3rdsession！

因为，3rdsession只是一个**临时** **会话**的标识！

- 观察一下后端的输出，可以发现同一个用户每一次会话的3rdsession都是不一样的！这是因为同一个 gen_3rd_session(u.openid) 的多次执行结果是不一样的！

- 3rdsession是**临时**的！ 3rdsession在一定时间内（可以自己设置）可以解码出原来的openid，但是一段时间过后就不行了！这就是为什么前端开发工具运行很长一段时间之后有时会报错，这是因为一开始申请的临时会话过期了，3rdsession不能正确的解码出openid；重新编译之后就正常了。过期的问题是每一次申请新的3rdsession，还是请求失败之后重新申请，之后有待解决，不过目前短时间内的访问是没有问题的。

### 运行

1.下载微信开发者工具[[link](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)]

2.下载这个repo

```
git clone https://github.com/BuguTeam/Bugu.git
```

3.用微信开发者工具打开就可以了。



### 本地运行后端(for demo)

为了与后端交互，在`\backend-for-demo\`里面放了一个实例后端（无数据库）



1. 需要安装flask

```
pip install flask
```

进入`\backend-for-demo\`

2. 如果是Windows系统，打开cmd，执行：

```
set FLASK_APP=run.py
flask run
```

如果是Linux/Mac系统，打开bash按如下操作

```
$export FLASK_APP=run.py
$flask run
```

此时可以在浏览器访问`http://127.0.0.1:5000/ `和`http://127.0.0.1:5000/getActivityList`，但是`getActivityList`页面接收到的是get请求。



3. 此时打开微信开发者工具，注意需要按照[link]( https://blog.csdn.net/qq506930427/article/details/99972670 )，设置：详情->不检验合法域名

   重新编译，就可以接收到`http://127.0.0.1:5000/getActivityList`发来的数据，也可以在上面运行着flask run的终端中看到对应的输出。

### 运行前端测试

1、需要微信开发者工具版本号>v1.02.1906042

2、打开开发者工具菜单中的**设置->安全设置->服务端口**

3、进入微信开发者工具下载目录，运行

```
微信web开发者工具目录> ./cli.bat --auto $小程序项目路径$ --auto-port 9420
```

如果看到`Open project with automation enabled success $小程序项目路径$`这行提示才说明成功打开了自动化端口(9420)。

4、打开命令行，运行

```
npm i miniprogram-automator
```

安装用到的小程序测试 JS 版 SDK

5、继续运行

```
npm install jest --global
```

安装jest

6、进入想要测试的小程序页面目录，如\pages\activityInfo，运行

```
npm run test
```

看到下方输出表示测试通过：

![image-20200518151353608](C:\Users\SRB\AppData\Roaming\Typora\typora-user-images\image-20200518151353608.png)