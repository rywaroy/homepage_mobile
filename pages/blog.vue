<template>
  <div class="full-content">
    <Myheader @open="open" :title="title" :back="back"/>
    <mt-popup
      v-model="popupVisible"
      position="right"
      :modal="modal"
      class="popup">
      <div class="popup-link" @click="link('learn')">学习</div>
      <div class="popup-link" @click="link('article')">日志</div>
      <div class="popup-link" @click="link('album')">相册</div>
      <!-- <div class="popup-link" @click="link('app')">APP下载</div> -->
      <div class="popup-close" @click="close()">关闭</div>
    </mt-popup>
    <nuxt-child/>
  </div>
</template>
<script>
import Myheader from '../components/Header';

export default {
  data() {
    return {
      popupVisible: false,
      modal: false,
    };
  },
  computed: {
    title() {
      return this.$store.state.blog.title;
    },
    back() {
      return this.$store.state.blog.back;
    },
  },
  methods: {
    open() {
      this.popupVisible = true;
    },
    close() {
      this.popupVisible = false;
    },
    link(name) {
      this.$router.push({ path: `/blog/${name}` });
      this.close();
    },
  },
  components: {
    Myheader,
  },
};
</script>
