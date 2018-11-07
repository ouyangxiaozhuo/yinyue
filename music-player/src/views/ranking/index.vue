<template>
    <div class="ranking">   
        <scroll class="ranking-content">
            <div>
              <div class="ranking_list" v-for="(item,index) in rank" :key="index" @click="detail(item.id)">
                  <img :src="item.picUrl">
                  <div class="ranking_songlist" >
                     <p v-for="(intem,Findex) in item.songList" :key="Findex">
                         <span>{{Findex+1}}{{intem.songname}}-{{intem.singername}}</span>
                     </p>
                  </div>
              </div>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script>
import { getRankList } from "@/api";
import Scroll from "@/components/scroll";
import Loading from "@/components/loading";
export default {
  data: function() {
    return {
      rank: []
    };
  },
  created() {
    this.getRankList();
  },
  methods: {
    getRankList() {
      getRankList().then(res => {
        // console.log(res);
        this.rank = res.data.topList;
      });
    },
    detail(id) {
      this.$router.push({ path: `/ranking/${id}` });
    }
  },
  components: {
    Scroll
  },
  
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/variable.less";
.ranking-content {
  position: fixed;
  overflow: hidden;
  width: 100%;
  top: 100px;
  bottom: 0;
  background: @color-background;
  .ranking_list {
    margin-top: 20px;
    margin-left: 12px;
    width: 90%;
    display: flex;
    background: @color-highlight-background;
    img {
      width: 130px;
      height: 130px;
    }
    .ranking_songlist {
      padding: 18px 20px 18px 20px;  
      p {
        width:190px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top:14px;
        span{
            color:@color-text-d;
        }
      }
    }
  }
}
</style>
