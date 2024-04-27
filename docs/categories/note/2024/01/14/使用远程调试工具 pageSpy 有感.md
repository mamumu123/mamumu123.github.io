---
title: 使用远程调试工具 pageSpy 有感
author: 跑堂路过
date: 2023/05/21 09:07
categories:
 - 技术笔记
tags:
 - JavaScript、canvas
---

# 使用远程调试工具 pageSpy 有感

## 导论
最近在V2EX和掘金网站上看到了PageSpy的推广和介绍。由于在自己工作的项目中也遇到了与远程调试相关的问题，因此对这个项目产生了兴趣。经过一番研究和实践，我大致理解了PageSpy的实现思路和原理，并在使用PageSpy小程序版本后遇到了一些问题。本文类似于一篇"读后感"，记录了我对PageSpy的理解和体验。

## 关键词
pageSpy、远程调试、defineProperty、小程序

## pageSpy 的介绍

### pageSpy 是什么
>**PageSpy** 是一款用来调试远程 Web 项目的工具。基于对原生 API 的封装，它将调用原生方法时的参数进行过滤、转化，整理成格式规范的消息供调试端消费；调试端收到消息数据，提供类控制台可交互式的功能界面将数据呈现出来。

### 原理介绍
官方有一篇介绍`PageSpy`原理的文章，名为[前端远程调试工具 PageSpy 原理揭秘](https://juejin.cn/post/7319512843174428684?searchId=20240114211547B4FB5BF4C2F9E66E638B)。该项目分为用户端和服务端两部分。在用户端，我们需要接入SDK来完成对原生API的拦截。拦截到的信息会通过`WebSocket`发送给服务端。通过这种方式，业务开发人员可以在管理后台看到被拦截到的用户信息。

#### 如何拦截原生 API
以小程序为例，SDK主要拦截了三组原生API：
- request（请求）；
- console（控制台输入日志）
- storage(本地存储）。

在之前的版本中，官方是通过重写这些API来实现拦截功能。

##### console

```js
const type: SpyConsole.ProxyType[] = ['log', 'info', 'error', 'warn']; 
type.forEach((item) => { 
    this.console[item] = window.console[item]; // 对原生方法进行包装（重写） 
    window.console[item] = (...args: any[]) => { 
        // ... 
    };
});
```
然而，这种方式可能会导致问题，特别是当开发者在项目中使用Object.defineProperty对原生API进行了get拦截，但没有设置set时，可能会导致错误。因此，官方最新版本中也采用了Object.defineProperty来完成拦截操作。这种方式可以更好地处理拦截过程中可能出现的异常情况。

```javascript
const type: SpyConsole.ProxyType[] = ['log', 'info', 'error', 'warn'];
type.forEach((item) => {
  this.console[item] = globalThis.console[item];
  Object.defineProperty(globalThis.console, item, {
    value(...args: any[]) {
      // ...
    },
    configurable: true,
    enumerable: true,
    writable: true,
  });
});
```

##### request
对于网络请求，拦截方式也是类似的。小程序中，通过使用`wx.request`方法来发起HTTPS网络请求。以下是一个示例：

```js
wx.request({
  url: 'example.php', //仅为示例，并非真实的接口地址
  data: {
    x: '',
    y: ''
  },
  header: {
    'content-type': 'application/json' // 默认值
  },
  success (res) {
    console.log(res.data)
  }
})
```

PageSpy对`wx.request`进行拦截，并进行格式化处理。在`complete`回调函数中，PageSpy会发起WebSocket请求，将请求信息同步到服务端。

```js
Object.defineProperty(wx, 'request', {
  value(params: Parameters<typeof wx.request>[0]) {


    const originOnSuccess = params.success;
    const originOnFailed = params.fail;
    const originOnComplete = params.complete;

    params.success = function (res) {
      // ...
      originOnSuccess?.(res);
    };

    params.fail = function (err) {
      // ...
      originOnFailed?.(err);
    };

    params.complete = function (res: any) {
      // ...
      // that.sendRequestItem(id, req);
      originOnComplete?.(res);
    };

    const requestInstance = originRequest(params);
    return requestInstance;
  }
});
```
##### storage
PageSpy还对storage进行了类似的处理。它监听了能够对storage进行修改的API，如`setStorage`、`removeStorage`、`clearStorage`、`batchSetStorage`等。在这些API的成功回调函数中，PageSpy将数据同步到服务端。这样，开发者可以实时查看和分析存储数据的变化情况。

```js
Object.defineProperties(wx, {
  setStorage: {
    value(params: Parameters<WXStorageAPI['setStorage']>[0]) {
      return StoragePlugin.originFunctions!.setStorage({
        ...params,
        success(res) {
          sendSetItem(params.key, params.data);
          params.success?.(res);
        },
      });
    },
  },
  removeStorage:{}
  clearStorage: {}
  // ...
```

## 读后感
以上代码展示了PageSpy的核心原理：拦截用户端的网络请求、控制台日志和存储操作，并将这些信息同步到管理后台进行展示。
当然代码中还存在许多细节的处理。例如，对于控制台打印的特殊格式内容（如无法直接字符化的对象，如window），需要进行保存并同步到服务端的处理方式；另外，虽然只监听了`set`操作，但对于存储的初始化也需要考虑，以确保数据的完整性和一致性。这些细致的处理使得项目更加完善和可靠。

### 项目的优点
- 项目维护活跃，迭代速度快，有专人负责解答问题，用户可以获得及时的支持和反馈；
- 提供了丰富的接入方式，如Docker、Node.js等，使得验证和使用非常方便；

### 存在问题
- 并非所有项目都适合直接引入PageSpy，因为可能存在与项目中已有的请求拦截或控制台拦截逻辑冲突的情况：如果自己的项目中或者引入的第三方库已经存在了一些 request、console 的拦截，那么就会存在冲突，无法直接引入;
- 小程序项目刚刚发布，并不稳定;

### 总结
这个项目确实非常出色。如果你也遇到了需要进行远程调试的场景，我建议你尝试接入该项目。官方提供了多种接入方式，使得尝试的成本相对较低。你可以根据自己的需求选择适合的接入方式，并享受到远程调试带来的便利。
  
## 参考 
[微信官方-Request](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/RequestTask.html)

[page-spy 官方](https://www.pagespy.org/docs#when-to-use)


[前端远程调试工具 PageSpy 原理揭秘](https://juejin.cn/post/7319512843174428684?searchId=20240114211547B4FB5BF4C2F9E66E638B)
