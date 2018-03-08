<template>
  <div >
    <div class="app">
      <nuxt/>
    </div>
    <div class="nav">
      <nuxt-link to="/magazine" tag="div" class="nav-item">
        <div class="nav-item-icon magazine"></div>
        <div class="nav-item-title">杂志</div>
      </nuxt-link>
      <nuxt-link to="/movie" tag="div" class="nav-item">
        <div class="nav-item-icon movie"></div>
        <div class="nav-item-title">电影</div>
      </nuxt-link>
      <nuxt-link to="/tool" tag="div" class="nav-item">
        <div class="nav-item-icon tool"></div>
        <div class="nav-item-title">工具</div>
      </nuxt-link>
      <nuxt-link to="/blog" tag="div" class="nav-item">
        <div class="nav-item-icon blog"></div>
        <div class="nav-item-title">博客</div>
      </nuxt-link>
    </div>
  </div>
</template>
<style>
.app{
    height: 100vh;
    padding-bottom: 55px;
    width: 100vw;
    background: #f5f5f5;
}
.nav{
    height: 55px;
    display: flex;
    position: absolute;
    z-index: 2;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #ccc;
    background: #fff;
}
.nav-item{
    display:flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.nav-item-title{
  font-size: 12px;
  line-height: 12px;
  margin-top: 7px;
  color: #000;
}
.nav-item.nav-item.active-link .nav-item-title{
  color: #1296db
}
.nav-item-icon{
  width: 20px;
  height: 20px;
}
.nav-item-icon.magazine{
  background: url('../assets/img/icon1.png') no-repeat;
  background-size: contain;
}
.nav-item.active-link .nav-item-icon.magazine{
  background: url('../assets/img/icon2.png') no-repeat;
  background-size: contain;
}
.nav-item-icon.movie{
  background: url('../assets/img/icon3.png') no-repeat;
  background-size: contain;
}
.nav-item.active-link .nav-item-icon.movie{
  background: url('../assets/img/icon4.png') no-repeat;
  background-size: contain;
}
.nav-item-icon.tool{
  background: url('../assets/img/icon5.png') no-repeat;
  background-size: contain;
}
.nav-item.active-link .nav-item-icon.tool{
  background: url('../assets/img/icon6.png') no-repeat;
  background-size: contain;
}
.nav-item-icon.blog{
  background: url('../assets/img/icon7.png') no-repeat;
  background-size: contain;
}
.nav-item.active-link .nav-item-icon.blog{
  background: url('../assets/img/icon8.png') no-repeat;
  background-size: contain;
}
</style>
