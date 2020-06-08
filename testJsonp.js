const testApi = 'http://127.0.0.1:3699/jsonp';

setTimeout(()=>{
  jsonpHttp(testApi, {
    data: {
      name: 123,
      age: 26,
    },
    jsonpCB: 'testApiCB'
  }).then(res=>{
    console.log('返回的数据是',res);
  })
},1000)