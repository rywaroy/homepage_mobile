<template>
  <div class="app-content">
    <div class="scroll">
      <div class="group-item" v-for="(item,index) in list" :key="index">
        <img v-lazy="item.url + '?imageView2/2/w/400/q/75'" width="100%">
      </div>
    </div>
  </div>
</template>
<style>
  .group-item {
    padding: 0 15px;
    margin-bottom: 10px;
  }

  .group-item img {
    display: block;
  }
</style>
<script>
import axiosPlus from '@/plugins/axios';

export default {
  async asyncData({ route, store }) {
    store.commit('blog/setTitle', '相册');
    store.commit('blog/setBack', true);
    const res = await axiosPlus.axios.get(`album/group/${route.params.id}`);
    return {
      list: res.data.data,
    };
  },
};
</script>
