<template>
    <div class="player" v-show="this.playList.length > 0">
        <!-- 播放器全屏 -->
      <transition name="normal">  
        <div class="normal-player" v-show="fullScreen">
            <!-- {{playList}} -->
            <!-- 背景模糊 -->
            <div class="background">
                <img src="" alt="" width="100%" height="100%">
            </div>
            <!-- 顶部 -->
            <div class="top">
                <div class="back">
                    <i class="icon-back" @click="toggleFullScreen"></i>
                </div>
                <h1 class="title">{{currentSong.name}}</h1>
                <h2 class="subtitle"><span v-for="a in currentSong.singer" :key="a.key">{{a.name}}</span></h2>
            </div>
            <!-- 中间cd部分 -->
            <div class="middle">
                <div class="middle-l">
                    <div class="cd-wrapper">
                        <div class="cd" :class="cdState">
                            <img alt="" class="image" :src="currentSong.img">
                        </div>
                    </div>
                    <div class="playing-lyric-wrapper">
                        <div class="playing-lyric"></div>
                    </div>
                </div>
                <div class="middle-r">
                    <div class="lyric-wrapper">
                        <div></div>
                        <div class="pure-music" >
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 下方bottom部分 -->
            <div class="bottom">
                <div class="dot-wrapper">
                    <span class="dot active"></span>
                    <span class="dot"></span>
                </div>
                <div class="progress-wrapper">
                    <span class="time time-l">{{playTime}}</span>
                    <div class="progress-bar-wrapper">
                        <progressbar :percent="percent" @percentChange="changeCurrentTime"></progressbar>
                    </div>
                    <span class="time time-r">{{songTime}}</span>
                </div>
                <div class="operators">
                    <div class="icon i-left">
                        <i class="icon-sequence"></i>
                    </div>
                    <div class="icon i-left">
                        <i class="icon-prev" @click="prev"></i>
                    </div>
                    <div class="icon i-center">
                        <i :class="btnSate" @click="togglePlay"></i>
                    </div>
                    <div class="icon i-right">
                        <i class="icon-next" @click="next"></i>
                    </div>
                    <div class="icon i-right">
                        <i class="icon icon-not-favorite"></i>
                    </div>
                </div>
            </div>
        </div>
      </transition>
      <transition name="mini">
        <!-- 小屏播放器 -->
        <div class="mini-player" v-show="!fullScreen" @click="toggleFullScreen">
            <div class="icon">
                <div class="imgWrapper">
                    <img :src="currentSong.img" alt="" :class="cdState">
                </div>
            </div>
            <div class="text">
                <h2 class="name">{{currentSong.name}}</h2>
                <p class="desc"><span v-for="a in currentSong.singer" :key="a.key">{{a.name}}</span></p>
            </div>
            <div class="control">
                <div class="progress-circle">
                    <i :class="btnSate" @click.stop="togglePlay"></i>
                </div>
            </div>
            <div class="control">
              <i class="icon-playlist"></i> 
            </div>
        </div>
      </transition>
        <!-- 引入h5播放器 -->
        <audio ref="audio" :src="currentSong.url" @canplay="changeIsReady" @error="changeIsReady" @timeupdate="updateTime"></audio>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import progressbar from "@/components/progressbar/index.vue";
export default {
  data() {
    return {
      //播放器播放的链接加载状态
      isReady: false,
      //当前播放时间
      currentTime: 0
    };
  },
  computed: {
    ...mapGetters([
      "playing",
      "fullScreen",
      "playList",
      "currentSong",
      "currentIndex"
    ]),
    //根据播放状态来判断cd是否旋转
    cdState() {
      return this.playing ? "play" : "pause";
    },
    //根据播放状态来判断播放按钮显示
    btnSate() {
      return this.playing ? "icon-pause" : "icon-play";
    },
    //根据播放状态来判断小屏播放按钮显示
    btnSate() {
      return this.playing ? "icon-pause-mini" : "icon-play-mini";
    },
    //播放时间转换
    playTime() {
      let m = (this.currentTime / 60) | 0;
      let s = this.currentTime % 60 | 0;
      if (s.toString().length < 2) {
        s = "0" + s;
      }
      return `${m}:${s}`;
    },
    //转换歌曲时长
    songTime() {
      let m = (this.currentSong.interval / 60) | 0;
      let s = this.currentSong.interval % 60 | 0;
      if (s.toString().length < 2) {
        s = "0" + s;
      }
      return `${m}:${s}`;
    },
    //计算已播放时间和总时间的百分比
    percent() {
      return this.currentTime / this.currentSong.interval;
    }
  },
  methods: {
    //更改播放状态
    togglePlay() {
      this.changePlaying(!this.playing);
    },
    //更改全屏状态
    toggleFullScreen() {
      this.changeFullScreen(!this.fullScreen);
    },
    //播放上一首
    prev() {
      //当播放准备状态为false，
      if (!this.isReady) {
        return;
      }
      let index = this.currentIndex - 1;
      if (index == -1) {
        index = this.playList.length - 1;
      }
      this.changeCurrentIndex(index);
      this.isReady = false;
      if (!this.playing) {
        this.togglePlay();
      }
    },
    //更改播放器是否加载完成
    changeIsReady() {
      this.isReady = true;
    },
    //播放下一首歌曲
    next() {
      if (!this.isReady) {
        return;
      }
      let index = this.currentIndex + 1;
      if (index == this.playList.length) {
        index = 0;
      }
      this.changeCurrentIndex(index);
      this.isReady = false;
      if (!this.playing) {
        this.togglePlay();
      }
    },
    //当播放器播放时候获取当前播放时间
    updateTime(ev) {
      this.currentTime = ev.target.currentTime;
    },
    //根据子组件传回来的百分比来计算当前需要播放的歌曲时间
    changeCurrentTime(v) {
      let t = this.currentSong.interval * v;
      this.$refs.audio.currentTime = t;
    },
    ...mapMutations(["changePlaying", "changeFullScreen", "changeCurrentIndex"])
  },
  watch: {
    //监听播放歌曲的改变
    currentSong(val) {
      this.$nextTick(() => {  
        this.$refs.audio.play();
      });
    },
    //监听playing的状态，控制播放器的播放
    playing(val) {
      this.$nextTick(() => {
        val ? this.$refs.audio.play() : this.$refs.audio.pause();
      });
    }
  },
  components: {
    progressbar
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/variable.less";
.normal-player {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 150;
  background: @color-background;
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    filter: blur(20px);
  }
  .top {
    position: relation;
    margin-bottom: 25px;
    .back {
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 50;
      .icon-back {
        display: block;
        padding: 9px;
        font-size: 22px;
        color: #ffcd32;
        transform: rotate(-90deg);
      }
      .icon-back::before {
        content: "\E911";
      }
    }
    .title {
      width: 70%;
      margin: 0 auto;
      line-height: 40px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 18px;
      color: #fff;
    }
    .subtitle {
      line-height: 20px;
      text-align: center;
      font-size: 14px;
      color: #fff;
    }
  }
  .middle {
    position: fixed;
    width: 100%;
    top: 80px;
    bottom: 170px;
    white-space: nowrap;
    font-size: 0;
    .middle-l {
      display: inline-block;
      vertical-align: top;
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 80%;
      .cd-wrapper {
        position: absolute;
        left: 10%;
        top: 0;
        width: 80%;
        box-sizing: border-box;
        height: 100%;
        .cd {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          &.play {
            animation: rotate 20s linear infinite;
          }
          &.pause {
            animation-play-state: paused;
          }
          .image {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border-radius: 50%;
            border: 10px solid hsla(0, 0%, 100, 0.1);
          }
        }
      }
      .playing-lyric-wrapper {
        width: 80%;
        margin: 30px auto 0;
        overflow: hidden;
        text-align: center;
        .playing-lyric {
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          color: hsla(1, 0%, 100%, 5);
        }
      }
    }
    .middle-r {
      display: inline-block;
      vertical-align: top;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
  .bottom {
    position: absolute;
    bottom: 50px;
    width: 100%;
    .dot-wrapper {
      text-align: center;
      font-size: 0;
      .active.active {
        width: 20px;
        border-radius: 5px;
        background: hsla(0, 0%, 100%, 0.8);
      }
      .dot {
        display: inline-block;
        vertical-align: middle;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: hsla(0, 0%, 100%, 0.5);
      }
    }
    .progress-wrapper {
      display: flex;
      align-items: center;
      width: 80%;
      margin: 0 auto;
      padding: 10px 0;
      .time.time-l {
        text-align: left;
      }
      .time {
        color: #fff;
        font-size: 12px;
        flex: 0 0 30px;
        line-height: 30px;
        width: 30px;
      }
      .time.time-r {
        text-align: right;
      }
      .progress-bar-wrapper {
        flex: 1;
      }
    }
    .operators {
      display: flex;
      align-items: center;
      .icon.i-left {
        flex: 1;
        text-align: right;
        .icon-sequence {
          font-size: 30px;
        }
        .icon-prev {
          font-size: 30px;
        }
      }
      .icon.i-center {
        padding: 0 20px;
        text-align: center;
        font-size: 40px;
        // &.icon-play {

        // }
        // &.icon-pause {

        // }
      }
      .icon.i-right {
        text-align: left;
        .icon-next {
          font-size: 30px;
        }
        .icon-not-favorite {
          font-size: 30px;
        }
      }
      .icon {
        flex: 1;
        color: #ffcd32;
      }
    }
  }
  &.normal-enter-active,&.normal-leave-active{
    transition:all 0.4s;
    .top,.bottom{
      transition:all 0.4s cubic-bezier(0.86,0.18,0.82,1.32)
    }
  }
  &.normal-enter,&.normal-leave-to{
    opacity:0;
    .top{
      transform:translate3d(0,-100px,0);
    }
    .bottom{
      transform:translate3d(0,100px,0);
    }
  }
}
.mini-player {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 180;
  width: 100%;
  height: 60px;
  background: @color-highlight-background;
  &.mini-enter-active,&.mini-leave-active{
    transition:all 0.4s;
  }
  &.mini-enter,&.mini-leave-to{
    opacity:0;
  }
  .icon {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;
    .imgWrapper {
      width: 100%;
      height: 100%;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        &.play {
          animation: rotate 10s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
  }
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .name {
      margin-bottom: 2px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 14px;
      color: #fff;
    }
    .desc {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 14px;
      color: hsla(0, 0%, 100%, 0.3);
    }
  }
  .control {
    flex: 0 0 30px;
    width: 30px;
    padding: 0 10px;
    .progress-circle {
      position: relative;
      width: 30px;
      height: 35px;
      .icon-mini,
      .icon-pause-mini,
      .icon-play-mini {
        width: 32px;
        height: 32px;
        font-size: 32px;
        position: absolute;
        color: @color-theme-d;
        left: 0;
        top: 0;
      }
    }
    .icon-playlist {
      font-size: 30px;
      color: rgba(255, 205, 49, 0.5);
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
