export const state = () => ({
  title: '',
  back: false,
  oneList: [],
  zhihuList: [],
});

export const mutations = {
  setTitle(state, data) { // 设置标题
    state.title = data;
  },
  setBack(state, boolean) { // 是否可以后退
    state.back = boolean;
  },
  setOneList(state, data) {
    state.oneList = data;
  },
  setZhihuList(state, data) {
    state.zhihuList = data;
  },
};
