/**
 * 目标1：默认显示-北京市天气
 *  1.1 获取北京市天气数据
 *  1.2 数据展示到页面
 */
// 封装 渲染城市天气函数
function getWeather(cityCode) {
  // 获取城市天气数据
  myAxios({
    url: 'https://hmajax.itheima.net/api/weather',
    params: {
      city: cityCode
    }
  }).then(result => {
    console.dir(result.data)
    const weatherObj = result.data
    // 渲染页面
    // title部分
    const titleStr = `
      <span class="dateShort">${weatherObj.dateShort}</span>
      <span class="calendar">农历&nbsp;
        <span class="dateLunar">${weatherObj.dateLunar}</span>
      </span>
    `
    document.querySelector('.title').innerHTML = titleStr
    // 城市名
    const cityNameStr = `
      <img src="./imgs/定位.png" alt="">
      <span class="area">${weatherObj.area}</span>
    `
    document.querySelector('.location').innerHTML = cityNameStr

    // 当前天气
    const wStr = `
    <div class="tem-box">
        <span class="temp">
          <span class="temperature">${weatherObj.temperature}</span>
          <span>°</span>
        </span>
      </div>
      <div class="climate-box">
        <div class="air">
          <span class="psPm25">${weatherObj.psPm25}</span>
          <span class="psPm25Level">${weatherObj.psPm25Level}</span>
        </div>
        <ul class="weather-list">
          <li>
            <img src=${weatherObj.weatherImg} class="weatherImg" alt="">
            <span class="weather">${weatherObj.weather}</span>
          </li>
          <li class="windDirection">${weatherObj.windDirection}</li>
          <li class="windPower">${weatherObj.windPower}</li>
        </ul>
      </div>
    `
    document.querySelector('.weather-box').innerHTML = wStr

    // 当前天气底部
    const todayWeather = weatherObj.todayWeather
    const wBottomStr = `
    <div class="range-box">
        <span>今天：</span>
        <span class="range">
          <span class="weather">${todayWeather.weather}</span>
          <span class="temNight">${todayWeather.temNight}</span>
          <span>-</span>
          <span class="temDay">${todayWeather.temDay}</span>
          <span>℃</span>
        </span>
      </div>
      <ul class="sun-list">
        <li>
          <span>紫外线</span>
          <span class="ultraviolet">${todayWeather.ultraviolet}</span>
        </li>
        <li>
          <span>湿度</span>
          <span class="humidity">${todayWeather.humidity}</span>%
        </li>
        <li>
          <span>日出</span>
          <span class="sunriseTime">${todayWeather.sunriseTime}</span>
        </li>
        <li>
          <span>日落</span>
          <span class="sunsetTime">${todayWeather.sunsetTime}</span>
        </li>
      </ul>
    `
    document.querySelector('.today-weather').innerHTML = wBottomStr

    // 周天气预报
    const dayForecast = weatherObj.dayForecast
    const dayForecastStr = dayForecast.map(item => {
      return `
      <li class="item">
          <div class="date-box">
            <span class="dateFormat">${item.dateFormat}</span>
            <span class="date">${item.date}</span>
          </div>
          <img src=${item.weatherImg} alt="" class="weatherImg">
          <span class="weather">${item.weather}</span>
          <div class="temp">
            <span class="temNight">${item.temNight}</span>-
            <span class="temDay">${item.temDay}</span>
            <span>℃</span>
          </div>
          <div class="wind">
            <span class="windDirection">${item.windDirection}</span>
            <span class="windPower">&lt;${item.windPower}</span>
          </div>
        </li>
      `
    }).join('')
    document.querySelector('.week-wrap').innerHTML = dayForecastStr

  }).catch(error => {
    console.dir(error)
  })
}

// 默认进入网页，获取北京市天气 (城市code，北京市：110100)
getWeather('110100')


// 搜索城市列表
document.querySelector('.search-city').addEventListener('input', function (e) {
  console.log(e.target.value)
  // 获取城市列表数据
  myAxios({
    url: 'https://hmajax.itheima.net/api/weather/city',
    params: {
      city: e.target.value
    }
  }).then(result => {
    console.dir(result.data)
    const cityStr = result.data.map(item => {
      return `<li class="city-item" data-code="${item.code}">${item.name}</li>`
    }).join('')
    document.querySelector('.search-list').innerHTML = cityStr
  })
})

// 切换城市天气
document.querySelector('.search-list').addEventListener('click', function (e) {
  if (e.target.classList.contains('city-item')) {
    const cityCode = e.target.dataset.code
    getWeather(cityCode)
  }
})