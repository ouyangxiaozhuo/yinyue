<template>
    <div class="singer">
      <singer-list :list="list"></singer-list>
    </div>
</template>

<script>
import axios from "axios";
import { getSingerList } from "@/api";
import SingerList from "@/components/singerList/index.vue";
export default {
  data: function() {
    return {
      list: []
    };
  },
  created() {
    this.getSingerList();
  },
  components: {
    SingerList
  },
  methods: {
    getSingerList() {
      getSingerList().then(res => {
        this.list = this.newSinger(res.data.list);
        //   console.log(this.newSinger(res.data.list));
        // console.log(res);
      });
    },
    newSinger(list) {  
      //创建一个对象
      let nList = {
        hot: {
          title: "热门",
          items: []
        }
      };
      list.forEach((item, index) => {
        //   取消十条数据作为热门数据
        if (index < 10) {
          nList.hot.items.push({
            id: item.Fsinger_mid,
            name: item.Fsinger_name,
            img:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
          });
        }
        if(!nList[item.Findex]){
            nList[item.Findex] = {
                title:item.Findex,
                items:[]
            }
        }
        nList[item.Findex].items.push({
            id:item.Fsinger_mid,
            name:item.Fsinger_name,
            img:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
        })
      })
      //把对象转成有序数组
      let hot = [];
      let other = [];
      for(var k in nList){
          if(nList[k].title == '热门'){
              hot.push(nList[k])
          }else if(nList[k].title.match(/[a-zA-Z]/)){
              other.push(nList[k])
          }
      }
      other.sort((a,b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(other)
    }
  }
}
</script>

<style lang="less" scoped>
// .singer {
//   position: fixed;
//   bottom: 0;
//   top: 88px;
//   width: 100%;
// }
</style>
