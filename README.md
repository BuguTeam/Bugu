# Bugu

Bugu front end.



### 运行

1.下载微信开发者工具[[link](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)]

2.下载这个repo

```
git clone https://github.com/BuguTeam/Bugu.git
```

3.用微信开发者工具打开就可以了。



### *本地运行后端(for demo)

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