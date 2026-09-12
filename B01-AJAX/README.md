# AJAX

## Day01 AJAX入门

ajax是浏览器和服务器之间进行通信的一种技术。

[axios库地址](https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js)

使用axios库的方法：

- step1：引入axios库
- step2：使用axios()方法向服务器发送请求
- step3：处理返回的数据
  - then()方法：处理成功的情况
  - catch()方法：处理失败的情况

url是什么？

- 统一资源定位符，网址，用于访问服务器上的资源

url的组成：

- 协议://域名/资源路径
- 例如：
  - 新闻数据地址: <http://hmajax.itheima.net/api/news>
  - 其中：
    - 协议：http
    - 域名：hmajax.itheima.net
    - 资源路径：/api/news

url查询参数

- 语法：url?参数名=参数值&参数名=参数值...
- 例如：<http://hmajax.itheima.net/api/city?pname=辽宁省>

使用axios的语法：

```JavaScript
axios({
  url: '目标资源地址',
  method: '请求方法（默认get）',
  params: {
    // 查询参数，get请求时使用
  },
  data: {
    // 请求体，post请求时使用
  }
}).then(result => {
    console.log(result)
}).catch(error => {
    console.log(error)
})
```

请求报文：浏览器根据规定格式发送给服务器的内容集合

1. 请求行（第一行）
2. 请求头
3. 空行
4. 请求体（我们提交的数据）

响应报文：浏览器根据规定格式接收服务器返回的内容集合

1. 响应行（第一行，包含协议、HTTP响应状态码、状态信息）
2. 响应头
3. 空行
4. 响应体（服务器返回的数据）

响应码：
- 1xx：信息响应
- 2xx：请求成功
- 3xx：重定向消息
- 4xx：客户端错误
- 5xx：服务端错误

form-serialize插件：

- 作用：一次性获得表单的所有提交数据
- 注意：
  - 表单元素必须有name属性，推荐和接口文档的参数名保持一致
- 使用：
  - 引入插件 ./lib/serialize.js
  - 调用插件方法 serialize(form,{hash:true, empty:true})

