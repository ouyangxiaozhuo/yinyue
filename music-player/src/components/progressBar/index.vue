<template>
   <div class="progress-bar" ref="progressBar" @click = 'progressClick'>
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper" ref="progressBtn" @touchstart="touchStart" @touchmove="touchMove"  @touchend="touchEnd">
                <div class="progress-btn"></div>
            </div>
        </div>
    </div> 
</template>

<script>
export default {
    data(){
        return{
            touch:{}
        }
    },
    props:{
        percent:{
            type:Number,
            default:0,
        }
    },
    watch:{
        percent(val){  
            if(this.touch.s){
                return
            }       
            let w =  this.$refs.progressBar.clientWidth - 16
            let offset = w * val
            this._offset(offset)
        }
    },
    methods:{
        //获取当前点击的位置
        progressClick(ev){
          let w = ev.pageX - this.$refs.progressBar.offsetLeft    
          this._offset(w)
          this._sendPercent()
        },
        _offset(w){
          this.$refs.progress.style.width = `${w}px`    
          this.$refs.progressBtn.style.transform = `translate3d(${w}px,0,0)`  
        },
        //重新计算百分比然后传给父组件
        _sendPercent(){
            let barW = this.$refs.progressBar.clientWidth - 16
            let p = this.$refs.progress.clientWidth / barW
            this.$emit("percentChange",p)
        },
        touchStart(ev){
            this.touch.s = true
            //记录手指初始的位置
            this.touch.x1 = ev.touches[0].pageX
            //记录已播放进度条的宽度
            this.touch.w  = this.$refs.progress.clientWidth
        },
        touchMove(ev){
            this.touch.x2 = ev.touches[0].pageX
            let offset = this.touch.x2 - this.touch.x1 + this.touch.w
            this._offset(offset)
        },
        touchEnd(){
            this.touch.s = false
            this._sendPercent()
        }
    }
};
</script>

<style lang="less" scoped>
.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: #ffcd32;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid #fff;
        border-radius: 50%;
        background: #ffcd32;
      }
    }
  }
}
</style>

