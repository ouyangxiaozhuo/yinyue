<template>
    <div class="music-header">
        <span class="logo"></span>
        <h2 class="music-header_title">网易云音乐</h2>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import url("~@/assets/less/variable.less");
.music-header {
  height: 44px; 
  justify-content:center;
  line-height:44px;
  display:flex;
  .logo{
      width:32px;
      height:32px;
      background:url('logo.png');
      background-size:100% 100%;
  };
  .music-header_title{
    color:@color-theme;
  }
}
</style>

