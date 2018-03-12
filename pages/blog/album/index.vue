<template>
  <div class="app-content">相册</div>
</template>
<script>
export default {
  fetch({store}){  
      store.commit('blog/setTitle','相册')
  },
}
</script>