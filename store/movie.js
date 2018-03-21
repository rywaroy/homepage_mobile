export const state = () => ({
  title: '',
  back: false,
  sellList: [],
  hotList: [],
  soonList: [],
  doubanList: [],
  doubanLimit: 10,
  doubanPage: 1,
  doubanTotal: 0
})

export const mutations = {
  setTitle(state, data) { //设置标题
    state.title = data
  },
  setBack(state, boolean) { //是否可以后退
    state.back = boolean
  },
  setSellList(state, data) {
    state.sellList = data
  },
  setHotList(state, data) {
    state.hotList = data
  },
  setSoonList(state, data) {
    state.soonList = data
  },
  setDoubanList(state, data) {
    if (state.doubanPage === 1) {
      state.doubanList = data
    } else {
      state.doubanList = state.doubanList.concat(data)
    }
  },
  setDoubanPage(state, page) {
    if(page){
      state.doubanPage = page
    }else{
      state.doubanPage++
    }
    
  },
  setDoubanTotal(state, data) {
    state.doubanTotal = data
  }
}

export const getters = {
  doubanCanScroll(state){  //文章是否可以继续加载
    return (state.doubanPage >= Math.ceil(state.doubanTotal / state.doubanLimit)) ? false : true
  }
}