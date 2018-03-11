import axiosPlugin from '../plugins/axios'
export const state = () => ({
  title: '标题',
  articleList: [],
  articlePage: 1,
  articleTotal: 0,
  articleLimit: 10
})

export const mutations = {
  setTitle(state, data) { //设置标题
    state.title = data
  },
  setArticleList(state, data) { //设置文章列表
    if(state.articlePage == 1){
      state.articleList = data
    }else{
      state.articleList = state.articleList.concat(data)
    }
  },
  setArticleTotal(state, number){
    state.articleTotal = number
  },
  setArticlePage(state, number) { //设置文章页码
    if (number === 1) {
      state.articlePage = 1
    } else {
      state.articlePage++
    }
  }
}

export const getters = {
  articleCanScroll(state){  //文章是否可以继续加载
    return (state.articlePage >= Math.ceil(state.articleTotal / state.articleLimit)) ? false : true
  }
}