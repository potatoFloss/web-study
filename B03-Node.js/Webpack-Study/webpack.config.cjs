const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');


const config = {
  // 打包模式（development 开发模式，production 生产模式）
  // mode: 'development',
  // 入口文件
  entry: path.resolve(__dirname, 'src/login/index.js'),
  // 出口文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './login/index.js',
    clean: true,  // 生成打包内容之前，清空输出目录
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      // 配置模板文件
      template: path.resolve(__dirname, 'public/login.html'),
      // 配置生成文件
      filename: path.resolve(__dirname, 'dist/login/index.html'),
    }),
    // 生成css文件
    new MiniCssExtractPlugin({
      // 只能传相对路径
      filename: './login/index.css',
    }),
    new CssMinimizerPlugin(),
    // 注入环境变量
    new webpack.DefinePlugin({
      // 把'process.env.NODE_ENV'在webpack编译时转换为JSON.stringify(process.env.NODE_ENV)
      // 注意：process.env.NODE_ENV 是 node.js 环境变量，不是浏览器环境变量
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  // 加载器 让webpack识别更多模块文件内容
  module: {
    rules: [
      {
        test: /\.css$/i,
        // use: ['style-loader', 'css-loader'],
        use: [process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/[hash][ext][query]',
        },
      }
    ],
  },
  // 优化
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  // 路径解析
  resolve: {
    // 别名设置
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};

// 开发模式下，使用 source-map 资源地图功能
if (process.env.NODE_ENV === 'development') {
  config.devtool = 'inline-source-map';
}

module.exports = config;
