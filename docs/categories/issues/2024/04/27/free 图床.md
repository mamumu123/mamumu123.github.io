---
title: 图床
author: 跑堂路过
date: 2024/01/26 09:07
categories:
 - 知识库
tags:
 - interesting
---


#  图床

## github 在线图床
[picx 网页版](https://github.com/XPoet/picx)


其实这个已经能够满足我的需求了，但是对于存量，其实还是又一些事情可以做的
- 直接一键转换，输入一个 url， 然后在前端 fetch 一下，就和现在流程一样了。
- download 一下原来的博客页面，直接把所有的资源都下载下来。
    - 有一个代理工具，直接抓包
    - download resource 类似的功能

### 其他有意思的思路

- npm 图床，白嫖国内免费的 cdn
https://akilar.top/posts/3e956346/

## 防盗链跳过
https://juejin.cn/post/7079705713781506079


### 关键
```html
<meta name="referrer" content="no-referrer" />
<img referrer="no-referrer|origin|unsafe-url" src="{item.src}"/>
```

### 防盗链的原理
要实现防盗链，就需要知道图片的请求是从哪里发出的。可以实现这一功能的有请求头中的origin和referer。origin只有在XHR请求中才会带上，所以图片资源只能借助referer。其实gitee也确实是这么做的。
通过判断请求的referer，如果请求来源不是本站就返回302，重定向到gitee的logo上，最后在第三方网站引用存在gitee的资源就全变成它的logo了。


