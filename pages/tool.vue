<template>
  <div class="full-content">
    <Myheader @open="open" :title="title" :back="back"/>
    <mt-popup
      v-model="popupVisible"
      position="right"
      :modal="modal"
      class="popup">
      <div class="popup-link" @click="link('weather')">中央天气预报</div>
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
      return this.$store.state.tool.title;
    },
    back() {
      return this.$store.state.tool.back;
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
      this.$router.push({ path: `/tool/${name}` });
      this.close();
    },
  },
  components: {
    Myheader,
  },
};
</script>
