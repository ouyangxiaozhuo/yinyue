<template>
    <div class="recommend">
      <!-- 应用better-scroll实现列表滚动 -->
      <scroll class="recommend-content">
        <div>
          <swiper v-if="slide.length>1" :options="swiperOption">
            <swiper-slide v-for="(item,index) in slide" :key="index" class="recommend_header_logo">
              <img :src="item.picUrl">  
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div> 
          </swiper>
          <div class="recommend_songlist">
            <h2>热门歌单推荐</h2>
            <div class="recommend_song" v-for="(item,index) in songlists " :key="index" @click="detail(item.id)">
              <img :src="item.picUrl">
              <div class="recommend_song_msg">
                <h1>{{item.songListAuthor}}</h1>
                <span>{{item.songListDesc}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="loading-container" v-show="isLoading">
          <loading :title="loadingTitle"></loading>
        </div>
      </scroll> 
      <router-view></router-view>
    </div>
</template>

<script>
import axios from 'axios'
import { getRecommend } from "@/api";
import Scroll from "@/components/scroll";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Loading from '@/components/loading'
export default {
  data: function() {
    return {
      slide: {},
      songlists: {},
      isLoading:true,
      loadingTitle:"正在努力加载中...",
      swiperOption: {
        // notNextTick:true,
        // effect:'flip',//设置轮播
        loop: true, //循环模式选项
        initialSlide: 0, //设置初始化时slide的索引
        autoplay: true, //自动播放
        pagination: {
          el: ".swiper-pagination"
        },
        computed: {
          swiper() {
            return this.$refs.mySwiper.swiper;
          }
        }
        // on: {
        //       slideChangeTransitionEnd: function(){
        //         // console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
        //       },
        // },
      }
    };
  },

  created() {
    this.getSlide();
  },
  methods: {
    getSlide: function() {
      getRecommend().then((res) => {
        this.slide = res.data.slider;
        this.songlists = res.data.songList;
        this.isLoading = false
      })
    },
    detail(id){
      this.$router.push({path:`/recommend/${id}`});
    },
  },
  components: {
    Scroll,
    Loading,
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/variable.less";
  .recommend-content{
    height:642px;
    overflow: hidden;
  }
.recommend_header_logo {
  width: 100%;
  height: 164px;
  img {
    width: 100%;
    height: 100%;
  }
}
.recommend_songlist {
  h2 {
    line-height: 70px;
    text-align: center;
    font-size: 18px;
    color: @color-theme;
  }
  .recommend_song {
    display: flex;
    align-items: center;
    margin-left: 16px;
    margin-bottom: 18px;
    img {
      width: 68px;
      height: 68px;
    }
    .recommend_song_msg {
      display: flex;
      height: 54px;
      flex-direction: column;
      justify-content:center;
      margin-left: 12px;
      h1 {
        font-size: 20px;
        color: @color-text;
      }
      span {
        font-size: 17px;
        color: @color-text-d;
      }
    }
  }
}
.loading-container{
  position:fixed;
  width:100%;
  top:50%;
  transform:translateY(-50%);
  height:100%;
  background:#222;
}
</style>

