---
title: 如何用 service worker 增加响应体的 header 字段
author: 跑堂路过
date: 2023/05/21 09:07
categories:
 - 技术笔记
tags:
 - JavaScript、canvas
---

# 如何用 service worker 增加响应体的 header 字段

本文介绍了在前端用 service worker 增加 header 字段。不用配置 nginx, 就可以实现CORP（跨源隔离）。

## 关键词

service worker、proxy、 拦截、fetch、 CORP


## 问题背景
之前实现了 web 端视频编辑的功能(详见（[如何用 ffmpeg + canvas 写一个在线可视化音视频编辑工具](https://juejin.cn/post/7248932545474068540))，用了`@ffmpeg/ffmpeg`库。
然后遇到一个问题，ffmpeg 使用到了 SharedArrayBuffer， 但是 SharedArrayBuffer 由于安全问题，会有一些限制。如果要在页面中使用 SharedArrayBuffer，需要设置页面为跨域隔离。开启方式为在页面中设置两个请求头，可以设置 CORP


```http
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```


本来项目的静态页面是部署在 `Github` 的，但是 Github 无法设置 `header`,所以只能将网页部署在 [vercel](https://img-generate-six.vercel.app/) 上。
在进行文章的分享后，有大佬在评论区提供了一个新的解决方案，来让 github 就可以访问。方案就是通过 `service worker` 进行 `fetch`的拦截， 来实现改写 `header` 的目的，这确实是一个非常好的方案。

## service worker 
首先来简单的介绍一下 service worker
### 概念
>Service Worker是一个强大的技术，它为我们提供了在浏览器中运行后台脚本的能力。通过使用Service Worker，我们可以实现离线缓存、推送通知和拦截网络请求等功能，为用户提供更好的体验。
其中，拦截网络请求并修改请求头是Service Worker的一个重要应用场景，它使我们能够动态地控制和定制请求的行为。

### 修改请求头
我们来看如何实现 header 的拦截，分为两个步骤：
- 注册 service worker
- 劫持 fetch， 修改 header 

首先我们需要注册 service worker
```js
// 注册Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(function(registration) {
      console.log('Service Worker 注册成功:', registration);
    })
    .catch(function(error) {
      console.log('Service Worker 注册失败:', error);
    });
}
```

然后我们在` fetch `事件中拦截了请求。在拦截的处理函数中，我们使用fetch函数来获取原始的响应对象。然后，我们克隆了响应对象，并使用Headers对象来修改请求头，添加了一个自定义的请求头字段。最后，我们使用修改后的请求头创建了一个新的响应对象，并将其返回。

```javascript

// service-worker.js

// 拦截请求并修改header
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request)
      .then(function(response) {
        // 克隆响应对象
        const clonedResponse = response.clone();
        
        // 修改请求头
        const modifiedHeaders = new Headers(clonedResponse.headers);
        modifiedHeaders.set('Custom-Header', 'Custom Value');
        
        // 创建新的响应对象，将修改后的请求头应用于其中
        const modifiedResponse = new Response(clonedResponse.body, {
          status: clonedResponse.status,
          statusText: clonedResponse.statusText,
          headers: modifiedHeaders
        });
        
        return modifiedResponse;
      })
      .catch(function(error) {
        console.log('请求失败:', error);
      })
  );
});
```

打开浏览器的控制台，可以看到响应请求已经增加了预期的 header 字段。

![a](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f7c169937d84b5cb80f313c2743353a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1866&h=330&s=87604&e=png&b=ffffff)


按照这个思路，我们只需要在 `header` 中增加CORP 需要的三个字段就可以了。

```js
 // 修改请求头
const modifiedHeaders = new Headers(clonedResponse.headers);
modifiedHeaders.set('Cross-Origin-Opener-Policy', 'same-origin');
modifiedHeaders.set('Cross-Origin-Embedder-Policy', 'require-corp');
modifiedHeaders.set('Cross-Origin-Resource-Policy', 'cross-origin');
```

这样子，我们的页面功能就正常了。

![截屏2023-10-29 21.51.32.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3f08b9cb82146df8aa6d253d8dbad6b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1488&h=806&s=319643&e=png&b=ffffff)

### 现成的轮子
在分析完原理以后，我们继续在 `github` 中搜索，发现别人也有同样的问题，找到了一些现成的轮子。所以觉得不再自己实现了。

[mini-coi](https://www.npmjs.com/package/mini-coi)
这个包的使用很简单，先下载一个 `service worker` 文件，然后在 html 文件中引入就好了, 基本不需要配置。
看一下它的源码，实现方式也基本一致，是对 fetch 做了劫持，只是做了一些细节的处理，比如不对错误请求做处理。
```js
addEventListener('fetch', e => {
      const { request: r } = e;
      if (r.cache === 'only-if-cached' && r.mode !== 'same-origin') return;
      e.respondWith(fetch(r).then(r => {
        const { body, status, statusText } = r;
        if (!status || status > 399) return r;
        const h = new Headers(r.headers);
        h.set('Cross-Origin-Opener-Policy', 'same-origin');
        h.set('Cross-Origin-Embedder-Policy', 'require-corp');
        h.set('Cross-Origin-Resource-Policy', 'cross-origin');
        return new Response(body, { status, statusText, headers: h });
      }));
    });

```

## sw 的其他应用场景

继续搜索 Github ，还找到了很多其他有意思的场景。

### 设置请求超时
[Service-Workers-Fetch-Timeout](https://github.com/deanhume/Service-Workers-Fetch-Timeout/blob/master/service-worker.js)
监听 fetch 请求，如果请求时间超过 2s, 则会返回页面的请求是一个超时请求。
```js
function timeout(delay) {
    return new Promise(function(resolve, reject) {
        setTimeout(function(){
          resolve(new Response('', {
              status: 408,
              statusText: 'Request timed out.'
          }));
        }, delay);
    });
}

self.addEventListener('fetch', function(event) {
    // Only fetch JavaScript files for now
    if (/\.js$/.test(event.request.url)) {
      event.respondWith(Promise.race([timeout(2000), fetch(event.request.url)]));
    } else {
      event.respondWith(fetch(event.request));
    }
});
```

### 代码压缩
[service-worker-brotli](https://github.com/jprendes/service-worker-brotli/)
通过 Service Worker，在尚不支持BCD的CDN上启用 Brotli(一种高级压缩算法，类似 gzip)。
```js
self.addEventListener("fetch", (event) => {
    const { request } = event;
    const url = new URL(request.url);

    if (!url.protocol.startsWith("http")) return;
    if (request.method !== "GET") return;
    if (request.mode === "websocket") return;

    event.respondWith(handle_fetch(request));
});
```


## 参考


[mini-coi](https://www.npmjs.com/package/mini-coi)

[Service-Workers-Fetch-Timeout](https://github.com/deanhume/Service-Workers-Fetch-Timeout/blob/master/service-worker.js)


[service-worker-brotli](https://github.com/jprendes/service-worker-brotli/)

[前端性能优化（二）：资源优化](http://www.noobyard.com/article/p-drfdxydf-og.html)