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
          <nuxt-link tag="div" :to="{path:`/movie/douban/info/${item.id}`}" v-for="(item,index) in doubanList" :key="index" class="movie-item">
            <img v-lazy="item.images.medium" width="100%">
            <div class="movie-item-title">{{item.title}}</div>
            <p class="movie-item-p">主演：<span v-for="(a,i) in item.casts" :key="i" class="movie-item-span">{{a.name}}</span></p>
            <p class="movie-item-p">导演：<span v-for="(d,i) in item.directors" :key="i" class="movie-item-span">{{d.name}}</span></p>
            <p class="movie-item-p">豆瓣评分：{{item.rating.average}}</p>
            <p class="movie-item-p">上映时间：{{item.mainland_pubdate}}</p>
            <p class="movie-item-p">类型：<span v-for="(g,i) in item.genres" :key="i" class="movie-item-span">{{g}}</span></p>
          </nuxt-link>
        </div>
      </Scroll>
    </div>
  </div>
</template>
<style>
.movie-item{
    padding: 15px;
    background: #fff;
    margin-bottom: 8px;
}
.movie-item-span{
    margin-right: 5px;
}
.movie-item-title{
    margin-top: 5px;
    font-size: 16px;
    line-height: 24px;
    color: #333;
    margin-bottom: 8px;
}
.movie-item-intro{
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 8px;
    color: #444;
}
.movie-item-p{
    font-size: 14px;
    line-height: 24px;
    color: #999;
}
</style>

<script>
import axiosPlugin from '../../../plugins/axios'
import Scroll from '../../../components/Scroll'
import Bubble from '../../../components/Bubble' 
export default {
    async fetch({store}){
        if(store.state.movie.doubanList.length === 0){
            let res = await axiosPlugin.axios.get('douban/list',{
                params:{
                    city:'杭州',
                    page:store.state.movie.doubanPage,
                    limit:store.state.movie.doubanLimit
                }
            })
            let data = res.data.data
            store.commit('movie/setDoubanList',data.subjects) 
            store.commit('movie/setDoubanTotal',data.total) 
        }  

        store.commit('movie/setTitle','豆瓣电影') 
        store.commit('movie/setBack',false)
    },
    data(){
        return{
        listenScroll: true,
        posY: 0,
        bubbleY: 0,
        pullup: true,
        pulldown: true,
        showScrollText: false,
        }
    },
    computed:{
        doubanList(){
            return this.$store.state.movie.doubanList
        },
        top() {
            return this.posY - 30
        },
        canScroll(){
            return this.$store.getters['movie/doubanCanScroll']
        }
    },
    methods:{
        scroll(pos) {
            this.posY = pos.y
            this.bubbleY = pos.y - 30
        },
        getDoubanList(){  //获取电影列表
            this.$loading.open();
            let movie = this.$store.state.movie
            axiosPlugin.axios.get('douban/list',{
                params:{
                    city:'杭州',
                    page:movie.doubanPage,
                    limit:movie.doubanTotal
                }
            }).then(res => {
                this.$store.commit('movie/setArticleList',res.data.data.subjects)
                this.$store.commit('movie/setArticleTotal',res.data.data.total)
                this.$loading.close()
            }).catch(err => {
                this.$loading.close()
            })
        },
        loadTop(){  //下拉刷新
            this.$store.commit('movie/setDoubanPage',1)
            this.getDoubanList()
        },
        loadBottom(){  //上拉加载
            this.$store.commit('movie/setDoubanPage')
            this.getDoubanList()
        }
    },
    components:{
        Scroll,
        Bubble
    }
}
</script>
