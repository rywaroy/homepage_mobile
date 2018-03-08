<template>
  <div 
  >文章</div>
</template>
<script>
export default {
  fetch({store}){  
      store.commit('blog/setTitle','唠嗑')
  },
}
</script>
