const testApi1 = 'http://127.0.0.1:3699';
const testApi2 = 'http://127.0.0.1:3699/data/json';
const testImgApi = 'http://127.0.0.1:3699/image';
const testImgApiPost = 'http://127.0.0.1:3699/about';

const testApi1Fn = () => {
  ajaxHttp.get(testApi1).then(res => {
    console.log(res);
    document.documentElement.innerHTML += `<br/>${res}`;
  })
}
const testApi2Fn = () => {
  ajaxHttp.get(testApi2,{data:{name:6666}}).then(res => {
    console.log(res);
    document.documentElement.innerHTML += `<br/>${JSON.stringify(res)}`;
  })
}
const testImgFn = (url) => {
  ajaxHttp.get(testImgApi + url).then(res => {
    document.documentElement.innerHTML += `<br/><img src="${res}" alt=""/>`;
  })
}

testApi1Fn();
testApi2Fn();
testImgFn('/fetch');
setTimeout(()=>{
  document.getElementById("test").addEventListener("click", function () {
      ajaxHttp.post(testImgApiPost,{data:{name:6666,age:898989,size:78}}).then(res=>{
        alert("返回的数据" + res.name)
      })
  });
},1000)


