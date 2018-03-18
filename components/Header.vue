<template>
  <div class="header">
      <div class="header-back">
          <div class="header-back-icon" v-if="back" @click="goBack()"></div>
      </div>
      <div class="header-title text-ovh">{{title}}</div>
      <div class="header-menu" @click="openMenu()"></div>
  </div>
</template>
<script>
export default {
    props:{
        title:{
            type:String,
            default:''
        },
        back:{
            type:Boolean,
            default:false
        }
    },
  methods:{
      openMenu(){
          this.$emit('open')
      },
      goBack(){
          this.$router.go(-1)
      }
  }
}
</script>

<style>
.header{
    height: 44px;
    background: #fff;
    position: absolute;
    z-index: 2;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom: 1px solid #ccc;
}
.header-back{
    width: 28px;
    height: 28px;
}
.header-back-icon{
    width: 28px;
    height: 28px;
    background: url(../assets/img/back.png) no-repeat;
    background-size: contain;
}
.header-title{
    font-size: 17px;
    color: #333;
    width: 70%;
    text-align: center;
}
.header-menu{
    width: 30px;
    height: 30px;
    background: url('../assets/img/menu.png') no-repeat;
    background-size: contain;
}
</style>

