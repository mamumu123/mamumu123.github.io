import{_ as o}from"./chunks/ArticleMetadata.BKq3OiiU.js";import{_ as h,m as p,a as d,e as s,x as k,u,B as c,ag as g,o as r,p as m,q as f}from"./chunks/framework.C-D9-E7N.js";import"./chunks/theme.BqZv6v_A.js";const x=JSON.parse('{"title":"图床","description":"","frontmatter":{"title":"图床","author":"跑堂路过","date":"2024/01/26 09:07","categories":["知识库"],"tags":["interesting"]},"headers":[],"relativePath":"categories/issues/2024/04/27/free 图床.md","filePath":"categories/issues/2024/04/27/free 图床.md","lastUpdated":1714199835000}'),C={name:"categories/issues/2024/04/27/free 图床.md"};function b(a,e,F,y,A,_){const l=o,n=p("ClientOnly");return r(),d("div",null,[e[0]||(e[0]=s("h1",{id:"图床",tabindex:"-1"},[k("图床 "),s("a",{class:"header-anchor",href:"#图床","aria-label":'Permalink to "图床"'},"​")],-1)),u(n,null,{default:c(()=>{var t,i;return[(((t=a.$frontmatter)==null?void 0:t.aside)??!0)&&(((i=a.$frontmatter)==null?void 0:i.showArticleMetadata)??!0)?(r(),m(l,{key:0,article:a.$frontmatter},null,8,["article"])):f("",!0)]}),_:1}),e[1]||(e[1]=g(`<h2 id="github-在线图床" tabindex="-1">github 在线图床 <a class="header-anchor" href="#github-在线图床" aria-label="Permalink to &quot;github 在线图床&quot;">​</a></h2><p><a href="https://github.com/XPoet/picx" target="_blank" rel="noreferrer">picx 网页版</a></p><p>其实这个已经能够满足我的需求了，但是对于存量，其实还是又一些事情可以做的</p><ul><li>直接一键转换，输入一个 url， 然后在前端 fetch 一下，就和现在流程一样了。</li><li>download 一下原来的博客页面，直接把所有的资源都下载下来。 <ul><li>有一个代理工具，直接抓包</li><li>download resource 类似的功能</li></ul></li></ul><h3 id="其他有意思的思路" tabindex="-1">其他有意思的思路 <a class="header-anchor" href="#其他有意思的思路" aria-label="Permalink to &quot;其他有意思的思路&quot;">​</a></h3><ul><li>npm 图床，白嫖国内免费的 cdn <a href="https://akilar.top/posts/3e956346/" target="_blank" rel="noreferrer">https://akilar.top/posts/3e956346/</a></li></ul><h2 id="防盗链跳过" tabindex="-1">防盗链跳过 <a class="header-anchor" href="#防盗链跳过" aria-label="Permalink to &quot;防盗链跳过&quot;">​</a></h2><p><a href="https://juejin.cn/post/7079705713781506079" target="_blank" rel="noreferrer">https://juejin.cn/post/7079705713781506079</a></p><h3 id="关键" tabindex="-1">关键 <a class="header-anchor" href="#关键" aria-label="Permalink to &quot;关键&quot;">​</a></h3><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">meta</span><span style="--shiki-light:#6F42C1;--shiki-dark:#6CB6FF;"> name</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;referrer&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#6CB6FF;"> content</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;no-referrer&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">img</span><span style="--shiki-light:#6F42C1;--shiki-dark:#6CB6FF;"> referrer</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;no-referrer|origin|unsafe-url&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#6CB6FF;"> src</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;{item.src}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">/&gt;</span></span></code></pre></div><h3 id="防盗链的原理" tabindex="-1">防盗链的原理 <a class="header-anchor" href="#防盗链的原理" aria-label="Permalink to &quot;防盗链的原理&quot;">​</a></h3><p>要实现防盗链，就需要知道图片的请求是从哪里发出的。可以实现这一功能的有请求头中的origin和referer。origin只有在XHR请求中才会带上，所以图片资源只能借助referer。其实gitee也确实是这么做的。 通过判断请求的referer，如果请求来源不是本站就返回302，重定向到gitee的logo上，最后在第三方网站引用存在gitee的资源就全变成它的logo了。</p>`,12))])}const E=h(C,[["render",b]]);export{x as __pageData,E as default};
