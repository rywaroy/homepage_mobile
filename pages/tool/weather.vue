<template>
  <div class="app-content">
    <div class="scroll">
      <div :class="'weather-item lv' + item.code1" v-for="(item,index) in weatherList" :key="index">
        <div class="weather-left">
          <p>{{item.date}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.day}}</p>
          <p>{{item.text}} {{item.wind}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.low}}℃ / {{item.high}}℃</p>
          <p></p>
        </div>
        <div class="weather-right">
          <div :class="'weather-icon icon' + item.code1"></div>
          <div :class="'weather-icon icon' + item.code2"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .weather-item {
    width: 100%;
    padding: 15px;
    display: flex;
  }

  .weather-icon {
    width: 30px;
    height: 30px;
    margin-right: 5px;
    background: url(../../assets/img/white30.png) no-repeat;
  }

  /* 晴 */
  .weather-icon.icon1 {
    background-position: 0 0;
  }

  .weather-item.lv1 {
    background: -webkit-gradient(linear, 0% 0, 0% 100%, from(#0e7fdf), to(#69b8f0));
  }

  /* 多云 */
  .weather-icon.icon2 {
    background-position: -80px 0;
  }

  .weather-item.lv2 {
    background: -webkit-gradient(linear, 0% 0, 0% 100%, from(#50b2fb), to(#a6d4f6));
  }

  /* 阴 */
  .weather-icon.icon3 {
    background-position: -160px 0;
  }

  .weather-item.lv3 {
    background: -webkit-gradient(linear, 0% 0, 0% 100%, from(#50b2fb), to(#a6d4f6));
  }

  /* 雨 */
  .weather-icon.icon4 {
    background-position: 0 -80px;
  }

  .weather-item.lv4 {
    background: -webkit-gradient(linear, 0% 0, 0% 100%, from(#88a9ca), to(#bcd3e3));
  }

  /* 雪 */
  .weather-icon.icon5 {
    background-position: -560px -80px;
  }

  .weather-item.lv5 {
    background: -webkit-gradient(linear, 0% 0, 0% 100%, from(#88a9ca), to(#bcd3e3));
  }

  /* 其他 */
  .weather-icon.icon6 {
    background-position: -9999px -9999px;
  }

  .weather-item.lv6 {
    background: -webkit-gradient(linear, 0% 0, 0% 100%, from(#88a9ca), to(#bcd3e3));
  }

  .weather-left {
    margin-right: 30px;
  }

  .weather-left p {
    color: #fff;
    font-size: 14px;
    line-height: 24px;
  }

  .weather-right {
    display: flex;
  }
</style>

<script>
  import axiosPlugin from '../../plugins/axios'

  const getWeatherCode = (code) => {
    if (code < 4) {
      return 1  //晴
    } else if (code < 9) {
      return 2 //多云
    } else if (code < 10) {
      return 3 //阴
    } else if (code < 19) {
      return 4 //雨
    } else if (code < 26) {
      return 5 //雪
    } else {
      return 6 //其他
    }
  }

  export default {
    async fetch({store}) {
      store.commit('tool/setTitle', '中央天气预报')
      store.commit('tool/setBack', false)
      if (store.state.tool.weatherList.length === 0) {
        let res = await axiosPlugin.axios.get('weather/all?city=CHZJ000000')
        for (let item of res.data.data.weather[0].future) {
          item.code1 = getWeatherCode(item.code1)
          item.code2 = getWeatherCode(item.code2)
        }
        store.commit('tool/setWeatherList', res.data.data.weather[0].future)
      }
    },
    computed: {
      weatherList() {
        return this.$store.state.tool.weatherList
      }
    },
  }
</script>
