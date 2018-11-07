<template>
    <div class="loading">
      <img width="30" height="30" src="./loading.gif"/>
      <p class="desc">{{title}}</p>
    </div>
</template>

<script>
export default {
  name: "loading",
  props: {
    title: {
      type: String,
      default: "loading..."
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/variable.less";
.loading {
  width: 100%;
  text-align: center;
  margin-top: 40%;
  .desc {
    line-height: 20px;
    font-size: @font-size-small;
    color: @color-text-l;
  }
}
</style>

