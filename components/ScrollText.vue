<template>
  <div class="scroll-text">{{text}}</div>
</template>
<style>
  .scroll-text {
    text-align: center;
    font-size: 15px;
    line-height: 30px;
    height: 30px;
    color: #999;
  }
</style>

<script>
export default {
  props: {
    canScroll: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    text() {
      if (this.canScroll) {
        return '上拉加载更多...';
      } else {
        return '暂无更多数据';
      }
    },
  },
};
</script>
