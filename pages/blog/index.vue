<template>
    <div></div>
</template>
<script>
export default {
  created(){
      //为了能跟pc的路由一致，手动重定向
      this.$router.push({path:'/blog/learn'})
  }
}
</script>
