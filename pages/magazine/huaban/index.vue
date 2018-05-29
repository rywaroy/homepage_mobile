<template>
  <div class="app-content">
    <div class="huaban-refresh" @click="refresh()"></div>
    <div class="scroll" id="scroll">
      <div>
        <div class="huaban-item" v-for="(item,index) in list" :key="index">
          <img :src="item.img | getImgUrl" width="100%">
        </div>
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

  .huaban-refresh {
    position: fixed;
    bottom: 80px;
    right: 10px;
    width: 48px;
    height: 48px;
    background: url('../../../assets/img/refresh.png') no-repeat;
    z-index: 5;
  }
</style>
<script>
import axios from 'axios';

export default {
  async asyncData({ store }) {
    store.commit('magazine/setTitle', '花瓣相册');
    store.commit('magazine/setBack', false);
    const res = await axios.get('https://api.isoyu.com/index.php/api/Picture/hua_ban');
    return {
      list: res.data.data,
    };
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    refresh() {
      this.$loading.open();
      axios.get('https://api.isoyu.com/index.php/api/Picture/hua_ban')
        .then(res => {
          if (res.data.code === 1) {
            this.list = res.data.data;
            this.$loading.close();
            const scroll = document.getElementById('scroll');
            scroll.scrollTop = 0;
          }
        });
    },
  },
  filters: {
    getImgUrl(url) { // 处理图片资源403
      return url.replace(/http\w{0,1}:\/\//g, 'https://images.weserv.nl/?url=');
    },
  },
};
</script>
