/*
* 目标1：体样 webpack 打包过程
*/
// 1.1 准备项目和源代码
import { checkPhone, checkCode } from '../utils/check.js'
console.log(checkPhone('13800000000'))
console.log(checkCode('12345678910'))

// 1.2 准备 webpack 打包的环境
// 控制台执行 npm i webpack webpack-cli --save-dev
/*
* 在 package.json 中设置只在当前项目中使用的自定义命令
* script {
*   "build": "webpack"
* }
*/

// 1.3 执行自定义命令打包观察效果
// 控制台执行 npm run 自定义命令

/**
 * 目标2：修改webpack 打包入口和出口
 * 2.1 项目根目录，创建 webpack.config.js 配置文件
 * 2.2 导出配置对象，配置入口，出口文件路径
 * 2.3 重新打包观察
*/

/**
 * 目标3：案例-黑马头条登录-长度判断
 * 3.1 准备用户登录页面
 * 3.2 编写核心JS逻辑代码
 * 3.3 打包并手动复制网页到dist目录下，引入打包后的js运行
*/
// 3.2 编写核心JS逻辑代码
// document.querySelector('.btn').addEventListener('click', e => {
//   const mobile = document.querySelector('.login-form [name="mobile"]').value
//   const code = document.querySelector('.login-form [name="code"]').value
//   if (!checkPhone(mobile)) {
//     console.log('手机号的长度必须是11位')
//     return
//   }
//   if (!checkCode(code)) {
//     console.log('验证码的长度必须是6位')
//     return
//   }
//   console.log('提交到服务器登录')
// })

/**
 * 目标4：使用 html-webpack-plugin 插件，生成 html 网页文件，并引入打包后的其它资源
 * 4.1 下载 html-webpack-plugin 插件，安装在项目根目录下
 *  - 控制台执行 npm i html-webpack-plugin --save-dev
 * 4.2 配置 html.config.js ，让webpack拥有插件功能
 *  - 引入插件 const HtmlWebpackPlugin = require('html-webpack-plugin')
 *  - 配置插件
 *      plugins: [
 *        new HtmlWebpackPlugin({
 *          // 配置模板文件
 *          template: path.resolve(__dirname, 'public/login.html'),
 *          // 配置生成文件
 *          filename: path.resolve(__dirname, 'dist/login/index.html'),
 *        }),
 *      ]
 * 4.3 重新打包观察效果
*/

/**
 * 目标5：打包 css 代码
 * 5.1 准备css代码，并引入到js中
 * 5.2 下载 css-loader 和 style-loader 插件，安装在项目根目录下
 *  - 控制台执行 npm i css-loader style-loader --save-dev
 * 5.3 配置 webpack.config.js ，让webpack拥有打包css代码的功能
 * 5.4 打包后观察效果
*/
// 5.1 准备css代码，并引入到js中
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

/**
 * 目标6：优化 提取css代码到单独的css文件中
 * 6.1 下载 mini-css-extract-plugin 插件，安装在项目根目录下
 *  - 控制台执行 npm i mini-css-extract-plugin --save-dev
 * 6.2 配置 webpack.config.js
 * 6.3 打包后观察效果
*/

/**
 * 目标7：优化 压缩css代码
 * 7.1 下载 css-minimizer-webpack-plugin 插件，安装在项目根目录下
 *  - 控制台执行 npm i css-minimizer-webpack-plugin --save-dev
 * 7.2 配置 webpack.config.js
 * 7.3 打包后观察效果
*/

/**
 * 目标8：打包less代码
 * 8.1 新建less代码（设置背景图）并引入到 src/login/index.js 中
 * 8.2 下载less和less-loader插件，安装在项目根目录下
 *  - 控制台执行 npm i less less-loader --save-dev
 * 8.3 配置 webpack.config.js 
 * 8.4 打包后观察效果
*/
// 8.1 新建less代码（设置背景图）并引入到 src/login/index.js 中
import './index.less'

/**
 * 目标9：打包资源模块（图片处理）
 * 9.1 创建img标签，并动态添加到页面，配置webpack.config.js
 * 9.2 打包后观察效果
*/
// 注意：js中引入本地图片资源要用import方式（如果是网络图片http地址，字符串可以直接写）
import imgObj from './assets/logo.png'
// 9.1 创建img标签，并动态添加到页面
const theImg = document.createElement('img')
theImg.src = imgObj
document.querySelector('.login-wrap').appendChild(theImg)

/**
 * 目标10：完成登录功能
 * 10.1 使用npm下载axios（体验npm作用在前端项目中）
 * 10.2 准备并修改utils工具包源代码导出实现函数
 * 10.3 导入并编写逻辑代码，打包后观察效果
*/
// 10.3 导入并编写逻辑代码，打包后观察效果
import myAxios from '../utils/request.js'
import { myAlert } from '../utils/alert.js'
document.querySelector('.btn').addEventListener('click', e => {
  const mobile = document.querySelector('.login-form [name="mobile"]').value
  const code = document.querySelector('.login-form [name="code"]').value
  if (!checkPhone(mobile)) {
    myAlert(false, '手机号的长度必须是11位')
    return
  }
  if (!checkCode(code)) {
    myAlert(false, '验证码的长度必须是6位')
    return
  }
  myAxios({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code,
    }
  }).then(result => {
    myAlert(true, '登录成功')
  }).catch(error => {
    myAlert(false, error.response.data.message)
  })
})

/**
 * 目标11：配置开发服务器环境 webpack-dev-server
 * 11.1 下载 webpack-dev-server 软件包，安装在项目根目录下
 *  - 控制台执行 npm i webpack-dev-server --save-dev
 * 11.2 配置 webpack.config.js，设置打包的模式为开发模式，配置自定义命令
 * 11.3 使用 npm run dev 启动开发服务器，试试热更新效果
*/
// 注意1：web-pack-dev-server 借助 http 模块创建 8080 默认 web 服务
// 注意2：默认以 public 文件夹作为服务器根目录
// 注意3：webpack-dev-server 根据配置，打包相关代码在内存当中，以 output.path 作为服务器根目录（所以，可以直接自己拼接访问 dist 目录下的文件）

/**
 * 目标12：打包模式设置 （development 开发模式，production 生产模式）
 * 两种设置方式：
 * 1. 在 webpack.config.js 中配置 mode: 'development'
 * 2. 在 package.json 中配置 scripts 中（优先级更高）
 *    - build 命令，添加 --mode=production
 *    - dev 命令，添加 --mode=development
*/

/**
 * 目标13：webpack环境下区分两种模式
 * 需求：
 *  - 开发模式：style-loader 内嵌 css 代码到 js 中，让热替换更快
 *  - 生产模式：提取css代码，让浏览器缓存和并行下载js和css文件
 * 
 * 13.1 下载cross-env插件，安装在当前项目根目录下
 *  - 控制台执行 npm i cross-env --save-dev
 * 13.2 配置自定义命令，传入参数名和值 到 process.env 对象上（它是node.js环境变量）
 * 13.3 在 webpack.config.js，调用使用做判断区分
 * 13.4 打包后观察效果
*/

/**
 * 目标14：前端-注入环境变量
 * 需求：前端项目代码中，开发模式下打印语句生效，生产模式下失效
 * 
 * 14.1 配置 webpack.config.js，注入环境变量
 *  - new webpack.DefinePlugin({
 *     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
 *    }),
 * 14.2 打包后观察效果
*/
if (process.env.NODE_ENV === 'production') {
  console.log = function () { }
}
console.log('开发模式能看见，生产模式不能看见')

/**
 * 目标15：source-map 调试代码
 * 问题：error 和 warning 代码的位置和源码对不上，不方便我们调试
 * 解决：启动 webpack 的 source-map 资源地图功能
 * 15.1 配置 webpack.config.js，配置 devtool 为 inline-source-map （注意：只能在开发模式下使用）
 *  - devtool: 'inline-source-map',
 * 15.2 在代码中制造错误，打包后观察效果
*/
// consolee undefined
// consolee.warning('警告信息')
console.warn('警告信息')


/**
 * 目标16：路径解析别名设置
 * 作用：让我们前端代码引入路径更简单（而且使用绝对路径）
 * 16.1 在 webpack.config.js 中配置 resolve.alias，设置别名
 *  - resolve: {
 *      alias: {
 *        '@': path.resolve(__dirname, 'src'),
 *      },
 *    },
 * 16.2 打包后观察效果
*/
import youAxios from '@/utils/request.js'
console.log(youAxios)