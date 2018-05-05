<template>
  <div class="app-content">
    <div class="scroll">
      <div class="bubble-box" :style="{'top':top + 'px'}">
        <Bubble :y="bubbleY"></Bubble>
      </div>
      <Scroll class="better-scroll"
              :data="learnList"
              :listenScroll="listenScroll"
              @scroll="scroll"
              :pulldown="pulldown"
              @pulldown="loadTop"
              :canScroll="canScroll"
              :pullup="pullup"
              @scrollToEnd="loadBottom">
        <div class="scroll-wrapper">
          <nuxt-link tag="div" :to="{path:`/blog/learn/info/${item.id}`}" v-for="(item,index) in learnList" :key="index" class="learn-item">
            <div class="learn-item-top">
              <div class="learn-item-left">
                <div class="learn-item-title">{{item.title}}</div>
                <div class="learn-item-time">{{item.time | time}}</div>
              </div>
              <div class="learn-item-right">
                <div class="learn-item-tag">{{item.tag}}</div>
              </div>
            </div>
            <div class="learn-item-intro">{{item.intro}}</div>
          </nuxt-link>
        </div>
      </Scroll>
    </div>

  </div>
</template>
<style scoped>
  .learn-item {
    background: #fff;
    padding: 15px;
    display: flex;
    margin-top: 5px;
    flex-direction: column
  }

  .learn-item-top {
    display: flex;
  }

  .learn-item-left {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  .learn-item-right {
    display: flex;
    margin-left: 8px;
  }

  .learn-item-tag {
    font-size: 12px;
    padding: 0 5px;
    margin-right: 4px;
    line-height: 16px;
    height: 16px;
    text-align: center;
    color: #fff;
    border-radius: 4px;
    margin-top: 4px;
    background: #89cff0
  }

  .learn-item-title {
    font-size: 16px;
    line-height: 24px;
    color: #333;
  }

  .learn-item-time {
    font-size: 12px;
    color: #999;
    line-height: 18px;
    margin-top: 5px;
  }

  .learn-item-intro {
    font-size: 12px;
    color: #666;
    line-height: 18px;
    margin-top: 8px;
  }

  .learn-item-bot {
    display: flex;
    justify-content: flex-end;
  }

  .learn-item-watch {
    font-size: 12px;
    color: #666;
    padding-left: 20px;
    line-height: 20px;
    margin-top: 4px;
    background: url('../../../assets/img/watch.png') no-repeat left center;
  }
</style>

<script>
  import axiosPlugin from '../../../plugins/axios'
  import Scroll from '../../../components/Scroll'
  import Bubble from '../../../components/Bubble'

  export default {
    async fetch({store}) {
      let blog = store.state.blog
      if (blog.learnList.length === 0) {
        let data = await axiosPlugin.axios.get('learn/list', {
          params: {
            page: blog.learnPage,
            limit: blog.learnLimit
          }
        })
        store.commit('blog/setLearnList', data.data.data.list)
        store.commit('blog/setLearnTotal', data.data.data.total)
      }
      store.commit('blog/setTitle', '学习')
      store.commit('blog/setBack', false)
    },
    data() {
      return {
        listenScroll: true,
        posY: 0,
        bubbleY: 0,
        pullup: true,
        pulldown: true,
        showScrollText: false,
      }
    },
    head() {
      return {
        title: `${this.$store.state.blogTitle} - 文章`,
        meta: [
          {hid: 'description', name: 'description', content: '文章'}
        ]
      }
    },
    computed: {
      learnList() {
        return this.$store.state.blog.learnList
      },
      top() {
        return this.posY - 30
      },
      canScroll() {
        return this.$store.getters['blog/learnCanScroll']
      }
    },
    methods: {
      scroll(pos) {
        this.posY = pos.y
        this.bubbleY = pos.y - 30
      },
      getlearnList() {  //获取文章列表
        this.$loading.open();
        let blog = this.$store.state.blog
        axiosPlugin.axios.get('learn/list', {
          params: {
            page: blog.learnPage,
            limit: blog.learnLimit
          }
        }).then(res => {
          this.$store.commit('blog/setLearnList', res.data.data.list)
          this.$store.commit('blog/setLearnTotal', res.data.data.total)
          this.$loading.close()
        }).catch(err => {
          this.$loading.close()
        })
      },
      loadTop() {  //下拉刷新
        this.$store.commit('blog/setLearnPage', 1)
        this.getlearnList()
      },
      loadBottom() {  //上拉加载
        this.$store.commit('blog/setLearnPage')
        this.getlearnList()
      }
    },
    components: {
      Scroll,
      Bubble
    }
  }
</script>
