<template>
  <div class="app-content">
    <div class="scroll article-info">
      <div class="article-title">{{info.title}}</div>
      <div class="article-content text-break" v-html="info.content"></div>
      <div class="comment-box">
        <div class="comment-box-title">评论</div>
        <commentItem v-for="(item,index) in comment" :key="index" :name="item.name" :time="item.time" :content="item.content"></commentItem>
      </div>
    </div>
  </div>
</template>
<style scoped>
.article-info{
  padding-top: 15px;
  background: #fff;
}
.article-title{
  font-size: 18px;
  line-height: 24px;
  color: #333;
  padding: 0 15px;
  text-align: center;
}
.article-content{
  padding: 0 15px;
  margin-top: 20px;
  min-height:400px;
}
.article-content img{
  max-width: 100%;
}
</style>
<script>
import axiosPlus from '../../../../plugins/axios'
import commentItem from '../../../../components/CommentItem'
export default {
  async asyncData({ params , store }){
    store.commit('blog/setBack',true)
    store.commit('blog/setTitle','文章')
    let info = await axiosPlus.axios.get('article/info',{params:{id:params.id}})
    let comment = await axiosPlus.axios.get('article/comment',{params:{id:params.id}})
    return {
      info:info.data.data,
      comment:comment.data.data
    }
  },
  mounted(){
    axiosPlus.axios.post('article/comment',{
      id:1,
      name:'大家脚手架福克斯就的看法上课f',
      comment:'试试字数'
    })
  },
  components:{
    commentItem
  }
}
</script>
