<template>
  <div class="app-content">
    <div class="scroll">
      <Scroll class="better-scroll"
        :data="thinkList"
        :listenScroll="listenScroll"
        @scroll="scroll"
        :pulldown="pulldown"
        @pulldown="loadTop"
        :canScroll="canScroll"
        :pullup="pullup"
        @scrollToEnd="loadBottom">
        <div class="scroll-wrapper">
          <div class="think-item" v-for="(item, index) in thinkList" :key="index">
            <div class="think-item-top">
              <div class="think-item-avatar bg-cover" :style="{backgroundImage: `url(${item.avatar})`}"></div>
              <div class="think-item-name">{{item.name}}</div>
            </div>
            <div class="think-item-content">{{item.content}}</div>
            <div class="think-item-photos" v-if="item.photos.length > 0">
              <div class="think-item-photo bg-cover" v-for="(photo, p) in item.photos" :key="p" :style="{backgroundImage: `url(${photo})`}"></div>
            </div>
            <div class="think-item-time">{{item.time | time}}</div>
          </div>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
import axiosPlugin from '../../../plugins/axios';
import Scroll from '../../../components/Scroll';
import Bubble from '../../../components/Bubble';

export default {
  async fetch({ store }) {
    const blog = store.state.blog;
    if (blog.thinkList.length === 0) {
      const data = await axiosPlugin.axios.get('think/list', {
        params: {
          page: blog.thinkPage,
          limit: blog.thinkLimit,
        },
      });
      store.commit('blog/setThinkList', data.data.data.list);
      store.commit('blog/setThinkTotal', data.data.data.count);
    }
    store.commit('blog/setTitle', '说说');
    store.commit('blog/setBack', false);
  },
  data() {
    return {
      listenScroll: true,
      posY: 0,
      bubbleY: 0,
      pullup: true,
      pulldown: true,
      showScrollText: false,
    };
  },
  head() {
    return {
      title: '说说',
      meta: [
        { hid: 'description', name: 'description', content: '说说' },
      ],
    };
  },
  computed: {
    thinkList() {
      return this.$store.state.blog.thinkList;
    },
    top() {
      return this.posY - 30;
    },
    canScroll() {
      return this.$store.getters['blog/thinkCanScroll'];
    },
  },
  methods: {
    scroll(pos) {
      this.posY = pos.y;
      this.bubbleY = pos.y - 30;
    },
    getThinkList() { // 获取说说列表
      this.$loading.open();
      const blog = this.$store.state.blog;
      axiosPlugin.axios.get('think/list', {
        params: {
          page: blog.thinkPage,
          limit: blog.thinkLimit,
        },
      }).then(res => {
        this.$store.commit('blog/setThinkList', res.data.data.list);
        this.$store.commit('blog/setThinkTotal', res.data.data.total);
        this.$loading.close();
      }).catch(() => {
        this.$loading.close();
      });
    },
    loadTop() { // 下拉刷新
      this.$store.commit('blog/setThinkPage', 1);
      this.getThinkList();
    },
    loadBottom() { // 上拉加载
      this.$store.commit('blog/setThinkPage');
      this.getThinkList();
    },
  },
  components: {
    Scroll,
    Bubble,
  },
};
</script>

<style>
.think-item {
  background: #fff;
  padding: 15px;
  margin-top: 5px;
}

.think-item-top {
  display: flex;
}

.think-item-avatar {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 50%;
  overflow: hidden;
}

.think-item-name {
  font-size: 14px;
  line-height: 20px;
  color: #333;
}

.think-item-time {
  font-size: 12px;
  color: #999;
  line-height: 18px;
  margin-top: 5px;
}

.think-item-content {
  font-size: 12px;
  color: #666;
  line-height: 18px;
  margin-top: 12px;
}

.think-item-photos {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.think-item-photo {
  width: 32%;
  height: 0;
  padding-bottom: 32%;
  border-radius: 4px;
  margin-bottom: 5px;
}
</style>
