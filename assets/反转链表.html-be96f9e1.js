import{_ as e,V as t,W as c,X as n,$ as s,Y as o,a1 as p,F as r}from"./framework-37421b7a.js";const i={},l=n("h2",{id:"题目描述",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#题目描述","aria-hidden":"true"},"#"),s(" 题目描述")],-1),d=n("p",null,"输入一个链表，反转链表后，输出新链表的表头。",-1),u={href:"https://www.nowcoder.com/practice/75e878df47f24fdc9dc3e400ec6058ca?tpId=190&tqId=35203&rp=1&ru=%2Factivity%2Foj&qru=%2Fta%2Fjob-code-high-rd%2Fquestion-ranking&tab=answerKey",target:"_blank",rel:"noopener noreferrer"},k=p(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">ReverseList</span><span class="token punctuation">(</span><span class="token parameter">pHead</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// write code here</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>pHead<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">}</span>
    <span class="token keyword">let</span> cur <span class="token operator">=</span> <span class="token keyword">null</span>
    
    <span class="token keyword">while</span><span class="token punctuation">(</span>pHead<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">let</span> tem <span class="token operator">=</span> pHead<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        pHead<span class="token punctuation">.</span>next <span class="token operator">=</span> cur
        cur <span class="token operator">=</span> pHead
        pHead <span class="token operator">=</span> tem
        
        <span class="token comment">// [curr.next,prev,curr]=[prev,curr,curr.next]</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> cur
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function v(m,_){const a=r("ExternalLinkIcon");return t(),c("div",null,[l,d,n("p",null,[s("题目地址："),n("a",u,[s("牛客网"),o(a)])]),k])}const h=e(i,[["render",v],["__file","反转链表.html.vue"]]);export{h as default};
