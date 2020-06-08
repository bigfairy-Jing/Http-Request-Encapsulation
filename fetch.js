const errStatusReg = /[4,5]\d{2}/;

const fetchHttp = (url,options={})=>{
  let {
    method="GET",
    headers={},
    data={},
    mode="cors",
    credentials = "omit",
    redirect = "manual",
    cache = "default"
  } = options;
  method = method.toUpperCase();
  const isGet = method === 'GET';
  if(isGet){
    // format str 拼接
    const str = Object.entries(data).join('&').split(',').join('=');
    url = url.includes("?")?`${url}&${str}`:`${url}${str?'?'+ str:''}`;
  };
  return fetch(url,{
    method,
    // 请求的 body 信息：可能是一个 Blob、BufferSource、FormData、URLSearchParams 
    // 或者 USVString 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息。
    body:isGet?null:JSON.stringify(data),
    // http 请求头
    headers,
    // 请求模式 @注释1
    mode,
    // 表达的含义请求是否携带cookie  @注释2
    credentials,
    // 重定向 模式 @注释3
    redirect,
    // 请求的缓存模式 @注释4
    cache
  }).then(data=>{
    if (errStatusReg.test(data.status))throw Error(`${data.status}:${data.statusText}`);
    return data.json();
  })
};

const creaetFetch = (type)=>{
  fetchHttp[type] = (url,options)=>fetchHttp(url,{...options,method:type})
};

const methods = ["get","GET",'POST',"post","put","PUT","DELETE","delete"];

methods.forEach(type => creaetFetch(type));









/* @1 请求模式 
常用的 mode 属性值:
  same-origin: 表示只请求同域.如果你在该 mode 下进行的是跨域的请求的话, 那么就会报错.
  no-cors: 正常的网络请求, 主要应对于没有后台没有设置 Access-Control-Allow-Origin.话句话说, 就是用来处理 script, image 等的请求的.他是 mode 的默认值.
  cors: 用来发送跨域的请求.在发送请求时, 需要带上.
  cors-with-forced-preflight: 这是专门针对 xhr2 支持出来的 preflight（多发一个options请求）， 会事先多发一次请求给 server， 检查该次请求的合法性。 */

/* @2 credentials
  omit: 默认值， 忽略cookie的发送
  same-origin: 表示cookie只能同域发送， 不能跨域发送
  include: cookie既可以同域发送， 也可以跨域发送 */

/* @3 redirect
  可用的 redirect 模式: follow(自动重定向), error(如果产生重定向将自动终止并且抛出一个错误), 或者 manual(手动处理重定向).在Chrome中， Chrome 47 之前的默认值是 follow， 从 Chrome 47 开始是 manual。 */


/* @4 cache
  default (表示fetch请求之前将检查下http的缓存)
  no-store（ 表示fetch请求将完全忽略http缓存的存在， 这意味着请求之前将不再检查下http的缓存, 拿到响应后, 它也不会更新http缓存）
  no-cache（ 如果存在缓存, 那么fetch将发送一个条件查询request和一个正常的request, 拿到响应后, 它会更新http缓存）
  reload（ 表示fetch请求之前将忽略http缓存的存在, 但是请求拿到响应后, 它将主动更新http缓存）
  force-cache（ 表示fetch请求不顾一切的依赖缓存, 即使缓存过期了, 它依然从缓存中读取.除非没有任何缓存, 那么它将发送一个正常的request）
  only-if-cached（ 表示fetch请求不顾一切的依赖缓存, 即使缓存过期了, 它依然从缓存中读取.如果没有缓存, 它将抛出网络错误(该设置只在mode为” 
  same-origin” 时有效). */