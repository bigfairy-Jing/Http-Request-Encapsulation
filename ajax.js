// 暂时不考虑IE5和IE6
// const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
// 参考文档：你真的会使用XMLHttpRequest吗？ https://segmentfault.com/a/1190000004322487

const isFunction = fn => typeof fn === 'function';

const ajaxHttp = (url, option = {}) => {
  if (!XMLHttpRequest) {
    throw Error('您的浏览器版本过低,请选择新版本的浏览器');
  }
  let {
    data = {},
    method = 'GET',
    // 是否异步 @async
    async = true,
    timeout = 0,
    header = {},
    ontimeout = () => {},
    onerror = () => {},
    onprogressFn
  } = option;

  method = method.toUpperCase();
  const isGet = method === 'GET';

  if (isGet) {
    // format str 拼接
    const str = Object.entries(data)
      .join('&')
      .split(',')
      .join('=');
    url = url.includes('?') ? `${url}&${str}` : `${url}${str ? '?' + str : ''}`;
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, async);
    xhr.timeout = timeout;
    // 设置请求头 open方法之后  send方法之前调用
    xhr.setRequestHeader('Content-Type', 'application/json');
    Object.entries(header).forEach(item => {
      xhr.setRequestHeader(item[0], item[1]);
    });

    // 错误回调
    isFunction(onerror) ? (xhr.onerror = onerror) : '';
    // 超时回调
    isFunction(ontimeout) ? (xhr.ontimeout = ontimeout) : '';
    // 判断onprogress是否支持 如果支持写入回调 这里一般用来获取上传进度的
    if ('onprogress' in xhr.upload && isFunction(onprogressFn)) {
      xhr.upload.onprogress = onprogressFn;
    }

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            resolve(JSON.parse(this.responseText));
          } catch (error) {
            resolve(this.responseText);
          }
        } else {
          const resJson = {
            code: this.status,
            response: this.response
          };
          reject(resJson);
        }
      }
    };

    xhr.send(method === 'GET' ? null : JSON.stringify(data));
  });
};

const creaetAjax = type => {
  ajaxHttp[type] = (url, options) =>
    ajaxHttp(url, {
      ...options,
      method: type
    });
};

const methods = ['get', 'GET', 'POST', 'post', 'put', 'PUT', 'DELETE', 'delete'];
// 写入各个方法,可以使用ajaxHttp.get调用
methods.forEach(type => creaetAjax(type));


// @async
// 默认值为true，即为异步请求，若async=false，则为同步请求
/* 当xhr为同步请求时,有如下限制
* xhr必须为 0
* xhr.withCredentials必须为false
* xhr.responseType 必须为"" （注意置为"text"也不允许）

如果上面任何一个条件不满足,都会报错,所以我们一般要避免sync请求. */

// function onprogressFn(event){
//    if (event.lengthComputable) {
//      var completedPercent = event.loaded / event.total;
//    }
// }
