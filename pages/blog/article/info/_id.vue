<template>
  <div class="app-content">
    <div class="scroll article-info">
      <div class="article-title">{{info.title}}</div>
      <div class="article-content text-break" v-html="info.content"></div>
      <div class="article-write">
        <div :class="['article-write-text',showCommentWrite ? 'active' : '']" @click="showCommentWrite = !showCommentWrite">添加评论</div>
      </div>
      <div class="article-write-content" v-show="showCommentWrite">
        <input type="text" class="article-input" placeholder="昵称，非必填" v-model="name">
        <textarea class="article-textarea" placeholder="评论内容" v-model="content"></textarea>
        <mt-button type="primary" size="large" @click="send()">提交</mt-button>
      </div>
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
.article-write{
  display: flex;
  justify-content: flex-end;
  padding-right: 15px;
  margin-bottom: 10px;
}
.article-write-text{
  font-size: 14px;
  line-height: 30px;
  color: #bfbfbf;
  padding-right: 30px;
  background: url('../../../../assets/img/comment.png') no-repeat right center;
  background-size: 20px 20px;
}
.article-write-text.active{
  color: #1296db;
  background: url('../../../../assets/img/comment_active.png') no-repeat right center;
  background-size: 20px 20px;
}
.article-write-content{
  padding: 0 15px;
  margin-bottom: 20px;
}
.article-input{
  height:30px;
  width: 100%;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding-left: 10px;
  font-size: 14px;
  line-height: 30px;
  margin-bottom: 8px;
}
.article-textarea{
  width: 100%;
  height: 150px;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  font-size: 14px;
  line-height: 30px;
  margin-bottom: 8px;
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
  head () {
    return {
      title: `${this.$store.state.blogTitle} - ${this.info.title}`,
      meta: [
        { hid: 'description', name: 'description', content: this.info.title }
      ]
    }
  },
  data(){
    return{
      showCommentWrite:false,
      name:'',
      content:''
    }
  },
  methods:{
    send(){
      if(!this.content){
        this.$toast('请输入评论内容')
        return
      }
      axiosPlus.axios.post('article/comment',{
        name:this.name,
        content:this.content,
        id:this.$route.params.id
      }).then(res => {
        this.$toast('评论成功')
        this.name = ''
        this.content = ''
        this.showCommentWrite = false
        this.getComment()
      })
    },
    getComment(){
      axiosPlus.axios.get('article/comment',{
        params:{
          id:this.$route.params.id
        }
      }).then(res => {
        this.comment = res.data.data
      })
    }
  },
  components:{
    commentItem
  }
}
</script>
