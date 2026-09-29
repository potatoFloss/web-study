module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // vw适配的标准屏宽度 iPhoneX
      /**
       * 设计图750 -> 通过蓝湖等设计图软件将2倍图调成1倍图 -> 适配375标准屏幕
       * 设计图640 -> 调成1倍 -> 适配320标准屏幕
      */
      viewportWidth: 375
    }
  }
}
