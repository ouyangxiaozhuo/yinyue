<template>
  <div class="tabs">
    <router-link to="/recommend">
      <span class="tabs_recommend">推荐</span>    
    </router-link>
    <router-link to="/singer">
      <span class="tabs_singer">歌手</span>    
    </router-link>
    <router-link to="/ranking">
      <span class="tabs_ranking">排行</span>    
    </router-link>
    <router-link to="/search">
      <span class="tabs_search">搜索</span>    
    </router-link>    
  </div>    
</template>

<script>
    
</script>

<style lang="less" scoped>
    @import '~@/assets/less/variable.less';
    .tabs{
        height:44px;
        display:flex;
        justify-content:space-around;
        a{
            line-height:44px;
            color:@color-text-ll;
            position:relative;
            &.router-link-active{
              color:@color-theme;
              span:after{
                position:absolute;
                content:'';
                top:33px;
                left:0px;
                width:32px;
                height:2px;
                background-color:@color-theme;
              } 
            }
        }
    }
</style>
