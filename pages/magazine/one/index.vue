<template>
  <div class="app-content">
    <div class="scroll">
      <div class="one-item" v-for="(item,index) in oneList" :key="index" @click="link(item.category, item.item_id)">
        <div v-if="item.category !== '0'" style="padding:0 15px;">
          <div class="one-tag">- {{item.category | filterTag}} -</div>
          <div class="one-title">{{item.title}}</div>
          <div class="one-author">文/{{item.author.user_name}}</div>
          <img :src="item.img_url" alt="" width="100%" className="one-img"/>
          <div class="one-forward">{{item.forward}}</div>
        </div>
        <div v-else>
          <img :src="item.img_url" alt="" width="100%" className="one-img"/>
          <div class="one-author tac">{{item.title}} | {{item.pic_info}}</div>
          <div class="one-forward" style="padding:0 15px;">{{item.forward}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .one-item {
    background: #fff;
    margin-bottom: 5px;
    padding-top: 5px;
    padding-bottom: 20px;
  }

  .one-tag {
    text-align: center;
    color: #999;
    font-size: 14px;
    line-height: 20px;
  }

  .one-title {
    font-size: 16px;
    line-height: 24px;
    color: #333;
    margin-top: 10px;
  }

  .one-author {
    font-size: 12px;
    color: #999;
    line-height: 18px;
    margin-top: 15px;
    margin-bottom: 6px;
  }

  .one-author.tac {
    text-align: center;
  }

  .one-img {
    display: block;
  }

  .one-forward {
    font-size: 13px;
    line-height: 22px;
    color: #666;
    margin-top: 8px;
  }
</style>

<script>
import time from 'js-time.js';
import axiosPlugin from '../../../plugins/axios';

export default {
  async fetch({ store }) {
    if (store.state.magazine.oneList.length === 0) {
      const list = await axiosPlugin.axios.get(`/one/list?date=${time().format('YYYY-MM-DD')}`);
      store.commit('magazine/setOneList', list.data.data.content_list);
    }
    store.commit('magazine/setTitle', 'ONE · 一个');
    store.commit('magazine/setBack', false);
  },
  computed: {
    oneList() {
      return this.$store.state.magazine.oneList;
    },
  },
  methods: {
    link(type, id) {
      if (type !== '0') {
        this.$router.push({ path: `/magazine/one/detail/${type}/${id}` });
      }
    },
  },
  filters: {
    filterTag(val) {
      switch (val) {
        case '1':
          return '阅读';
          break;
        case '2':
          return '连载';
          break;
        case '3':
          return '问答';
          break;
        case '4':
          return '音乐';
          break;
        case '5':
          return '影视';
          break;
        default:
          return null;
      }
    },
  },
};
</script>
