<template>
  <div class="app-content">
      <mt-navbar v-model="selected">
        <mt-tab-item id="sell">正在售票</mt-tab-item>
        <mt-tab-item id="hot">正在热映</mt-tab-item>
        <mt-tab-item id="soon">即将上映</mt-tab-item>
    </mt-navbar>

<!-- tab-container -->
    <mt-tab-container v-model="selected">
    <mt-tab-container-item id="sell">
        <div class="scroll">
            <nuxt-link tag="div" :to="{path:`/movie/time/info/${item.movieId}`}" class="movie-item" v-for="(item,index) in sellList" :key="index">
                <img v-lazy="item.img" width="100%">
                <div class="movie-item-title">{{item.titleCn}}</div>
                <div class="movie-item-intro">{{item.commonSpecial}}</div>
                <p class="movie-item-p">主演：{{item.actorName1}} {{item.actorName2}}</p>
                <p class="movie-item-p">导演：{{item.directorName}}</p>
                <p class="movie-item-p">上映时间：{{item.rYear}}-{{item.rMonth}}-{{item.rDay}}</p>
                <p class="movie-item-p">类型：{{item.type}}</p>
            </nuxt-link>
        </div>
    </mt-tab-container-item>
    <mt-tab-container-item id="hot">
        <div class="scroll">
            <nuxt-link tag="div" :to="{path:`/movie/time/info/${item.id}`}" class="movie-item" v-for="(item,index) in hotList" :key="index">
                <img v-lazy="item.img" width="100%">
                <div class="movie-item-title">{{item.tCn}}</div>
                <div class="movie-item-intro">{{item.commonSpecial}}</div>
                <p class="movie-item-p">主演：{{item.aN1}} {{item.aN2}}</p>
                <p class="movie-item-p">导演：{{item.dN}}</p>
                <p class="movie-item-p">上映时间：{{item.rd}}</p>
                <p class="movie-item-p">类型：{{item.movieType}}</p>
            </nuxt-link>
        </div>
    </mt-tab-container-item>
    <mt-tab-container-item id="soon">
        <div class="scroll">
            <nuxt-link tag="div" :to="{path:`/movie/time/info/${item.id}`}" class="movie-item" v-for="(item,index) in soonList" :key="index">
                <img v-lazy="item.image" width="100%">
                <div class="movie-item-title">{{item.title}}</div>
                <div class="movie-item-intro">{{item.releaseDate}}</div>
                <p class="movie-item-p">主演：{{item.actor1}} {{item.actor2}}</p>
                <p class="movie-item-p">导演：{{item.director}}</p>
                <p class="movie-item-p">上映时间：{{item.rYear}}-{{item.rMonth}}-{{item.rDay}}</p>
                <p class="movie-item-p">类型：{{item.type}}</p>
            </nuxt-link>
        </div>
    </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<style>
.mint-tab-container,.mint-tab-container-wrap{
    height: 100%;
}
.mint-navbar .mint-tab-item.is-selected{
    margin-bottom: 0;
}
.movie-item{
    padding: 15px;
    background: #fff;
    margin-bottom: 8px;
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
export default {
  async fetch({store}){
    if(store.state.movie.sellList.length === 0){
        let sell = await axiosPlugin.axios.get('time/sell')
        let hot = await axiosPlugin.axios.get('time/hot')
        let soon = await axiosPlugin.axios.get('time/soon')
        store.commit('movie/setSellList',sell.data.data.movies)
        store.commit('movie/setHotList',hot.data.data.ms)
        store.commit('movie/setSoonList',soon.data.data.attention)
    }  
    store.commit('movie/setTitle','Time时光') 
    store.commit('movie/setBack',false)
  },
  data(){
      return{
          selected:"sell"
      }
  },
  computed:{
      sellList(){
          return this.$store.state.movie.sellList
      },
      hotList(){
          return this.$store.state.movie.hotList
      },
      soonList(){
          return this.$store.state.movie.soonList
      }
  }
}
</script>
