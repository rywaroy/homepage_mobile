<template>
  <div class="app-content">
    <div class="scroll">
      <div class="bubble-box" :style="{'top':top + 'px'}">
        <Bubble :y="bubbleY"></Bubble>
      </div>
      <Scroll class="better-scroll"
        :data="articleList"
        :listenScroll="listenScroll"
        @scroll="scroll"
        :pulldown="pulldown"
        @pulldown="loadTop"
        :canScroll="canScroll"
        :pullup="pullup"
        @scrollToEnd="loadBottom">
        <div class="scroll-wrapper">
          <nuxt-link tag="div" :to="{path:`/blog/article/info/${item.id}`}" v-for="(item,index) in articleList" :key="index" class="article-item">
            <div class="article-item-top">
              <div class="article-item-left">
                <div class="article-item-title">{{item.title}}</div>
                <div class="article-item-time">{{item.time | time}}</div>
              </div>
              <div class="article-item-right">
                <div class="article-item-tag" v-if="item.tag" :style="{backgroundColor:item.tag.color}">{{item.tag.title}}</div>
                <div class="article-item-tag" style="background-color:#ffd700;" v-if="item.top > 0">置顶</div>
              </div>
            </div>
            <div class="article-item-intro">{{item.intro}}</div>
            <div class="article-item-bot">
              <div class="article-item-watch">{{item.watch}}</div>
              <div class="article-item-like">{{item.likes}}</div>
            </div>
          </nuxt-link>
        </div>
      </Scroll>
    </div>

  </div>
</template>
<style scoped>
  .article-item {
    background: #fff;
    padding: 15px;
    display: flex;
    margin-top: 5px;
    flex-direction: column;
  }

  .article-item-top {
    display: flex;
  }

  .article-item-left {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  .article-item-right {
    display: flex;
    margin-left: 8px;
  }

  .article-item-tag {
    font-size: 12px;
    padding: 0 5px;
    margin-right: 4px;
    line-height: 16px;
    height: 16px;
    text-align: center;
    color: #fff;
    border-radius: 4px;
    margin-top: 4px;
  }

  .article-item-title {
    font-size: 16px;
    line-height: 24px;
    color: #333;
  }

  .article-item-time {
    font-size: 12px;
    color: #999;
    line-height: 18px;
    margin-top: 5px;
  }

  .article-item-intro {
    font-size: 12px;
    color: #666;
    line-height: 18px;
    margin-top: 8px;
  }

  .article-item-bot {
    display: flex;
    justify-content: flex-end;
  }

  .article-item-watch {
    font-size: 12px;
    color: #666;
    padding-left: 20px;
    line-height: 20px;
    margin-top: 4px;
    background: url('../../../assets/img/watch.png') no-repeat left center;
  }

  .article-item-like {
    font-size: 12px;
    color: #666;
    padding-left: 20px;
    line-height: 20px;
    margin-top: 4px;
    margin-left: 10px;
    background: url('../../../assets/img/like.png') no-repeat left center;
  }
</style>

<script>
import axiosPlugin from '@/plugins/axios';
import Scroll from '@/components/Scroll';
import Bubble from '@/components/Bubble';

export default {
  async fetch({ store }) {
    const blog = store.state.blog;
    if (blog.articleList.length === 0) {
      const data = await axiosPlugin.axios.get('article', {
        params: {
          page: blog.articlePage,
          limit: blog.articleLimit,
        },
      });
      store.commit('blog/setArticleList', data.data.data.list);
      store.commit('blog/setArticleTotal', data.data.data.total);
    }
    store.commit('blog/setTitle', '日志');
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
      title: `${this.$store.state.blogTitle} - 文章`,
      meta: [
        { hid: 'description', name: 'description', content: '文章' },
      ],
    };
  },
  computed: {
    articleList() {
      return this.$store.state.blog.articleList;
    },
    top() {
      return this.posY - 30;
    },
    canScroll() {
      return this.$store.getters['blog/articleCanScroll'];
    },
  },
  methods: {
    scroll(pos) {
      this.posY = pos.y;
      this.bubbleY = pos.y - 30;
    },
    getArticleList() { // 获取文章列表
      this.$loading.open();
      const blog = this.$store.state.blog;
      axiosPlugin.axios.get('article/list', {
        params: {
          page: blog.articlePage,
          limit: blog.articleLimit,
        },
      }).then(res => {
        this.$store.commit('blog/setArticleList', res.data.data.list);
        this.$store.commit('blog/setArticleTotal', res.data.data.total);
        this.$loading.close();
      }).catch(() => {
        this.$loading.close();
      });
    },
    loadTop() { // 下拉刷新
      this.$store.commit('blog/setArticlePage', 1);
      this.getArticleList();
    },
    loadBottom() { // 上拉加载
      this.$store.commit('blog/setArticlePage');
      this.getArticleList();
    },
  },
  components: {
    Scroll,
    Bubble,
  },
};
</script>
