<template>
  <div class="app-content">
    <div class="scroll learn-info">
      <div class="learn-title">{{info.title}}</div>
      <div class="learn-content text-break markdown-body" v-html="info.html"></div>
    </div>
  </div>
</template>
<style>
@import '../../../../assets/css/markdown.css';

.learn-info {
  padding-top: 15px;
  background: #fff;
}

.learn-title {
  font-size: 18px;
  line-height: 24px;
  color: #333;
  padding: 0 15px;
  text-align: center;
}

.learn-content {
  padding: 0 15px;
  margin-top: 20px;
  min-height: 400px;
}

.learn-content img {
  max-width: 100%;
}

.learn-write {
  display: flex;
  justify-content: flex-end;
  padding-right: 15px;
  margin-bottom: 10px;
}

.learn-write-text {
  font-size: 14px;
  line-height: 30px;
  color: #bfbfbf;
  padding-right: 30px;
  background: url('../../../../assets/img/comment.png') no-repeat right center;
  background-size: 20px 20px;
}

.learn-write-text.active {
  color: #1296db;
  background: url('../../../../assets/img/comment_active.png') no-repeat right center;
  background-size: 20px 20px;
}

.learn-write-content {
  padding: 0 15px;
  margin-bottom: 20px;
}

.learn-input {
  height: 30px;
  width: 100%;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding-left: 10px;
  font-size: 14px;
  line-height: 30px;
  margin-bottom: 8px;
}

.learn-textarea {
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
import axiosPlus from '../../../../plugins/axios';

export default {
  async asyncData({ params, store }) {
    store.commit('blog/setBack', true);
    store.commit('blog/setTitle', '学习');
    const info = await axiosPlus.axios.get('learn/info', { params: { id: params.id } });
    return {
      info: info.data.data,
    };
  },
  head() {
    return {
      title: `${this.$store.state.blogTitle} - ${this.info.title}`,
      meta: [
        { hid: 'description', name: 'description', content: this.info.title },
      ],
    };
  },
};
</script>
