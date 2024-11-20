# 言叶刷步助手

刷步助手，后端nodejs基于Zeep Life运动接口协议刷步，步数可同步至微信、支付宝等平台

## 说明
支持伪造IP地址，防止频繁请求被拦截<br>
支持Zeep Life邮箱账号，优化代码判断逻辑

## 如何使用
1.克隆本项目到本地
```sh
git clone https://github.com/Clear-Dream-Field/brush-step.git
```
2.进入项目目录安装依赖文件
```sh
npm install
```
3.项目打包
```sh
npm run build
```

项目打包完毕部署到服务器即可（支持云服务器，虚拟主机）
