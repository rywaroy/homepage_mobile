<template>
  <div class="app-content">
      <div class="scroll single-box">
          <div class="single-title">{{info.name}} {{info.nameEn}}</div>
          <div class="single-subtitle">剧情简介：</div>
          <div class="single-content">{{info.story}}</div>
           <div class="single-subtitle">导演：</div> 
           <div class="movie-people">
               <img :src="info.director.img" width="100%" alt="">
               <div class="movie-people-name">{{info.director.name}}</div>
               <div class="movie-people-name">{{info.director.nameEn}}</div>
           </div>
           <div class="single-subtitle">演员：</div> 
           <div class="movie-actors">
               <div class="movie-people" v-for="(item,index) in info.actors.slice(0,8)" :key="index">
                    <img :src="item.img" width="100%" alt="">
                    <div class="movie-people-name">{{item.name}}</div>
                    <div class="movie-people-name">{{item.nameEn}}</div>
                </div>
           </div>
      </div>
  </div>
</template>
<style>
.movie-people{
    width: 50%;
    margin-top: 5px;
    padding: 5px;
}
.movie-people-name{
    font-size: 12px;
    line-height: 24px;
    color: #333;
}
.movie-actors{
    display: flex;
    flex-wrap: wrap;
}
</style>

<script>
import axiosPlus from '../../../../plugins/axios'
export default {
  async asyncData({route, store}){
      store.commit('movie/setTitle','Time时光') 
      store.commit('movie/setBack',true)
      let info = await axiosPlus.axios.get('time/info',{params:{id:route.params.id}})
      return {
          info:info.data.data.info.basic
      }
  }
}
</script>
