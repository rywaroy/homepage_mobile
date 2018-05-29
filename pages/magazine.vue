<template>
  <div class="full-content">
    <Myheader @open="open" :title="title" :back="back"/>
    <mt-popup
      v-model="popupVisible"
      position="right"
      :modal="modal"
      class="popup">
      <div class="popup-link" @click="link('one')">ONE · 一个</div>
      <div class="popup-link" @click="link('huaban')">花瓣相册</div>
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
      return this.$store.state.magazine.title;
    },
    back() {
      return this.$store.state.magazine.back;
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
      this.$router.push({ path: `/magazine/${name}` });
      this.close();
    },
  },
  components: {
    Myheader,
  },
};
</script>
