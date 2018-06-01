<template>
  <div class="comment">
    <div class="comment-top">
      <div class="comment-user">
        <div class="comment-avatar bg-cover" v-if="avatar" :style="{backgroundImage:'url('+avatar+')'}"></div>
        <div class="comment-name">{{name}}</div>
      </div>
      <div class="comment-time">{{time | time}}</div>
    </div>
    <div class="comment-content">{{content}}</div>
  </div>
</template>
<style>
  .comment {
    padding: 15px 0;
    margin-bottom: 5px;
    border-bottom: 1px solid #ccc;
  }

  .comment-top {
    display: flex;
    justify-content: space-between;
  }

  .comment-user {
    display: flex;

  }

  .comment-avatar {
    margin-right: 5px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .comment-name {
    font-size: 14px;
    line-height: 30px;
    color: #666;
  }

  .comment-time {
    font-size: 14px;
    line-height: 30px;
    color: #999;
  }

  .comment-content {
    font-size: 12px;
    line-height: 24px;
    color: #666;
    margin-top: 5px;
  }
</style>
<script>
export default {
  props: {
    avatar: {
      type: String,
    },
    name: {
      type: String,
    },
    time: {
      type: [String, Number],
    },
    content: {
      type: String,
    },
  },
};
</script>
