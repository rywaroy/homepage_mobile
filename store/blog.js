export const state = () => ({
  title: '标题'
})

export const mutations = {
  setTitle(state, data) {
    state.title = data
  }
}
