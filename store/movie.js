export const state = () => ({
    title: '标题',
    back:false,
    sellList:[],
    hotList:[],
    soonList:[]
  })
  
  export const mutations = {
      setTitle(state, data) { //设置标题
        state.title = data
      },
      setBack(state,boolean){ //是否可以后退
        state.back = boolean
      },
      setSellList(state, data){
        state.sellList = data  
      },
      setHotList(state, data){
        state.hotList = data  
      },
      setSoonList(state, data){
        state.soonList = data  
      }
  }