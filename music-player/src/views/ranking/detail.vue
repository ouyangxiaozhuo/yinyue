<template>
  <transition name="slide">
    <music-list :title="title" :bgUrl="bgUrl" :songsList="songsList"></music-list>
  </transition>
</template>

<script>
import MusicList from "@/components/musicList"
import {getRankInfo} from '@/api'
export default {
   data(){
    return{
      title:"",
      bgUrl:'',
      songsList:[]
    }
  },
  created(){
    this.getRankInfoList()
  },
  methods:{
    getRankInfoList(){
        let id = this.$route.params.id
      getRankInfo(id).then(res => {
        console.log(res)
        this.title = res.topinfo.ListName;
        this.bgUrl = res.topinfo.pic;
        for(var i =0;i<res.songlist.length;i++){
            if(res.songlist[i].data.albumname=='未·LIVE'){
                  res.songlist[i].data.albumname = ''
            }else{
                res.songlist[i].data.albumname = res.songlist[i].data.albumname
            }
            this.songsList.push({
                songname:res.songlist[i].data.songname,
                name:res.songlist[i].data.singer[0].name,
                albumname:res.songlist[i].data.albumname,
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
