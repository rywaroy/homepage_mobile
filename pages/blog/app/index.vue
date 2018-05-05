<template>
  <div class="app-content">
    <div class="scroll download">
      疯狂赶工中。。。
    </div>
  </div>
</template>
<style>
  .download {
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<script>
export default {
  async fetch({ store }) {
    store.commit('blog/setTitle', 'APP下载');
    store.commit('blog/setBack', false);
  },
};
</script>
