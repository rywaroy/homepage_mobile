<template>
  <div class="app-content">
    <div class="scroll">
      <div class="zhihu-item" v-for="(item, index) in zhihuList" :key="index" @click="link(item.id)">
        <img :src="item.images[0] | getImgUrl" alt="" width="100%">
        <p class="zhihu-item-title">{{item.title}}</p>
      </div>
    </div>
  </div>
</template>
<style>
.zhihu-item {
  background: #fff;
  margin-bottom: 10px;
  padding-top: 5px;
}

.zhihu-item-title {
  padding: 10px 15px;
  font-size: 14px;
  line-height: 24px;
  color: #333;
}
</style>
<script>
import axios from 'axios';

export default {
  async fetch({ store }) {
    if (store.state.magazine.zhihuList.length === 0) {
      const res = await axios.get('https://api.isoyu.com/index.php/api/Zhihu/zhihu_daily');
      store.commit('magazine/setZhihuList', res.data.data.stories);
    }
    store.commit('magazine/setTitle', '知乎日报');
    store.commit('magazine/setBack', false);
  },
  computed: {
    zhihuList() {
      return this.$store.state.magazine.zhihuList;
    },
  },
  methods: {
    link(id) {
      this.$router.push({ path: `/magazine/zhihu/info/${id}` });
    },
  },
};
</script>
