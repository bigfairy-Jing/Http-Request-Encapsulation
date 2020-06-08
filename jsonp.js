const formatData = data => {
  // 这里要先处理特殊情况的字符  & = 等等
  return Object.entries(data)
    .map(item => [encodeURIComponent(item[0]), item[1]])
    .join('&')
    .split(',')
    .join('=');
};
/**
 *
 *
 * @param {*} url 传入的请求url
 * @param {*} options 包含两个参数 1. get请求的参数对象data,以及和后台协商好的回调函数名称
 * @returns
 */
const jsonpHttp = (url, options) => {
  options = options || {};
  options.data = options.data || {};

  const headDOM = document.querySelector('head');
  const scriptDOM = document.createElement('script');
  // 这里传入的是url所以存在一些特殊的操作
  const str = formatData(options.data);

  return new Promise((resolve, reject) => {
    const CB = jsonoResData => {
      window[options[`jsonpCB`]] = null;
      headDOM.removeChild(scriptDOM);
      clearTimeout(scriptDOM.timer);
      resolve(jsonoResData);
    };
    window[options[`jsonpCB`]] = CB;

    // 超时处理
    if (options.timeout) {
      scriptDOM.timer = setTimeout(() => {
        headDOM.removeChild(scriptDOM);
        window[options[`jsonpCB`]] = null;
        reject({
          timeout: true,
          message: '请求超时'
        });
      }, options.timeout * 1000);
    }
    const urlFormat = url.includes('?') ? `${url}&${str}` : `${url}${str ? '?' + str : ''}`;
    // 多加一个jsonp的回调函数名称
    scriptDOM.src = `${urlFormat}&jsonpCB=${options[`jsonpCB`]}`;
    headDOM.appendChild(scriptDOM);
  });
};
