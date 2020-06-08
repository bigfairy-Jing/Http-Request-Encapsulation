const express = require("express");
const app = express();
const path = require("path");
const getIPAdress = require("./util")
const fs = require("fs");
const IP = getIPAdress();
const host = 3699;
const bodyParser = require("body-parser");
//设置跨域访问  
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "content-type,x-requested-with,Authorization, x-ui-request,lang");
  next();
});

const urlencodedParser = bodyParser.urlencoded({
  extended: false
})
const jsonParser = bodyParser.json();
app.use(urlencodedParser)
app.use(express.json())




app.get('/', (req, res) => {
  console.log(req.hostname)
  res.send(JSON.stringify('Hello world'));
})

app.get('/image/*', async (req, res) => {
  const imgs = {
    '/image/fetch':'fetchImg.png',
    '/image/xhr':'xhrImg.png',
  }
  const imagePrev = imgs[req.url]
  if(!imagePrev){
    res.send(null);
    return;
  }
  console.log(`${IP}:${host}/${imagePrev}`)
  res.send(JSON.stringify(`http://${IP}:${host}/${imagePrev}`))
})

app.get("/data/json",(req,res)=>{
  res.send(require("./data.json"));
})
// 对/news 页面进行get请求
app.get('/news', (req, res) => {
  res.send('Hello news');
});
// 对/about 页面进行post请求
app.post("/about", urlencodedParser, (req, res) => {
  console.log(req.body)
  res.send(JSON.stringify(req.body));
});
// 对/list* 
app.get('/list*', (req, res) => {
  res.send('Hello list pages');
})
// 对/Jsonp* 
app.get('/jsonp', (req, res) => {
  console.log(req.query)
  const _CB = req.query.jsonpCB;
  const _data = {shuai:6666}
  if(_CB){
    res.send(`${_CB}(${JSON.stringify(_data)})`)
  }else{
    res.json(_data)
  }
})

//静态目录
app.use(express.static(__dirname + '/public'));



app.listen(host, () => {
  console.log(`${IP}:${host} 启动成功`)
})