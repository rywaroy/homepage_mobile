import axiosPlugin from '../plugins/axios'
export const state = () => ({
  title: '标题',
  back:false,
  oneList:[]
})

export const mutations = {
    setTitle(state, data) { //设置标题
      state.title = data
    },
    setBack(state,boolean){ //是否可以后退
      state.back = boolean
    },
    setOneList(state, data){
      state.oneList = data  
    }
}