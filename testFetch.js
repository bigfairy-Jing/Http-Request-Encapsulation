const testApi1 = 'http://127.0.0.1:3699';
const testApi2 = 'http://127.0.0.1:3699/data/json';
const testImgApi = 'http://127.0.0.1:3699/image';

const testApi1Fn = ()=>{
  fetchHttp.get(testApi1).then(res => {
    console.log(res);
    document.documentElement.innerHTML += `<br/>${res}`;
  })
}
const testApi2Fn = ()=>{
  fetchHttp.get(testApi2).then(res => {
    console.log(res);
    document.documentElement.innerHTML += `<br/>${JSON.stringify(res)}`;
  })
}
const testImgFn = (url)=>{
  fetchHttp.get(testImgApi+url).then(res => {
    document.documentElement.innerHTML += `<br/><img src="${res}" alt=""/>`;
  })
}

testApi1Fn();
testApi2Fn();
testImgFn('/fetch');

setTimeout(()=>{
   document.getElementById("test").addEventListener("click", function () {
     console.log(666666)
   });
},500)
 







