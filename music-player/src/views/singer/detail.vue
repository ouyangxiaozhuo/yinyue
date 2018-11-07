<template>
  <transition name="slide">
    <music-list :title="title" :bgUrl="bgUrl" :songsList="songsList"></music-list>
  </transition>
</template>

<script>
import MusicList from "@/components/musicList"
import {getSingerInfo} from '@/api'
export default {
   data(){
    return{
      title:"",
      bgUrl:'',
      songsList:[]
    }
  },
  created(){
    this.getSingerInfoList()
  },
  methods:{
    getSingerInfoList(){
        let id = this.$route.params.id
      getSingerInfo(id).then(res => {
        console.log(res)
        this.title = res.data.singer_name;
        this.bgUrl = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${res.data.singer_mid}.jpg?max_age=2592000`;
        for(var i =0;i<res.data.list.length;i++){
            this.songsList.push({
                songname:res.data.list[i].musicData.songname,
                name:res.data.singer_name,
                albumname:res.data.list[i].musicData.albumname
            })
        }
      })
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="less" scoped>
.slide-enter-active,.slide-leave-active{
  transition:all 0.3s;
}
.slide-enter,.slide-leave-to{
  transform:translate(100%,0,0);
}
</style>
