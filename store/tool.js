export const state = () => ({
  title: '标题',
  back: false,
  weatherList: []
})

export const mutations = {
  setTitle(state, data) { //设置标题
    state.title = data
  },
  setBack(state, boolean) { //是否可以后退
    state.back = boolean
  },
  setWeatherList(state, data) {  //设置天气列表
    state.weatherList = data
  }
}
