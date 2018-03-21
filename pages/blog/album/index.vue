<template>
  <div class="app-content">
    <div class="scroll">
      <div class="album-content">
        <nuxt-link tag="div" :to="{path:`/blog/album/group/${item.id}`}" class="album-item" v-for="(item,index) in albumList" :key="index">
          <div class="album-item-img bg-cover" :style="{backgroundImage:'url('+item.img+')'}"></div>
          <div class="album-item-title">{{item.title}}</div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<style>
.album-content{
  display: flex;
  flex-wrap: wrap;
}
.album-item{
  width: 50%;
  padding: 15px;
  display: block;
}
.album-item-img{
  width: 100%;
  padding-bottom: 100%;
  height: 0;
  box-sizing: content-box;
}
.album-item img{
  display: block;
}
.album-item-title{
  font-size: 14px;
  line-height: 40px;
  color: #333;
  text-align: center;
}
</style>

<script>
import axiosPlugin from '../../../plugins/axios'
export default {
  async fetch({store}){
      if(store.state.movie.doubanList.length === 0){
            let res = await axiosPlugin.axios.get('album/album')
            store.commit('blog/setAlbumList',res.data.data) 
      }    
      store.commit('blog/setTitle','相册')
  },
  computed:{
    albumList(){
      return this.$store.state.blog.albumList
    }
  }
}
</script>