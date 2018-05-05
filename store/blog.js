

export const state = () => ({
  title: '',
  back: false,
  articleList: [],
  articlePage: 1,
  articleTotal: 0,
  articleLimit: 10,
  albumList: [],
  learnList: [],
  learnPage: 1,
  learnTotal: 0,
  learnLimit: 10,
});

export const mutations = {
  setTitle(state, data) { // 设置标题
    state.title = data;
  },
  setBack(state, boolean) { // 是否可以后退
    state.back = boolean;
  },
  setArticleList(state, data) { // 设置文章列表
    if (state.articlePage === 1) {
      state.articleList = data;
    } else {
      state.articleList = state.articleList.concat(data);
    }
  },
  setArticleTotal(state, number) {
    state.articleTotal = number;
  },
  setArticlePage(state, number) { // 设置文章页码
    if (number === 1) {
      state.articlePage = 1;
    } else {
      state.articlePage++;
    }
  },
  setAlbumList(state, data) {
    state.albumList = data;
  },
  setLearnList(state, data) { // 设置文章列表
    if (state.learnPage === 1) {
      state.learnList = data;
    } else {
      state.learnList = state.learnList.concat(data);
    }
  },
  setLearnTotal(state, number) {
    state.learnTotal = number;
  },
  setLearnPage(state, number) { // 设置文章页码
    if (number === 1) {
      state.learnPage = 1;
    } else {
      state.learnPage++;
    }
  },
}

export const getters = {
  articleCanScroll(state) { // 文章是否可以继续加载
    return (state.articlePage >= Math.ceil(state.articleTotal / state.articleLimit)) ? false : true;
  },
  learnCanScroll(state) { // 文章是否可以继续加载
    return (state.learnPage >= Math.ceil(state.learnTotal / state.learnLimit)) ? false : true;
  },
}
