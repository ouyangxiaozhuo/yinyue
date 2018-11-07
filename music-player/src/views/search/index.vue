<template>
    <div class="search">
        <div class="search_box">
            <i class="icon-search"></i> 
            <input type="text" placeholder="搜索歌曲、歌手" class="search_input" v-model="add">
            <i class="icon-delete"></i>
        </div>
        <scroll class="search-content">
            <div>
                <div class="shortcut-wrapper">
                    <div class="hot_key">
                        <h2>热门搜索</h2>
                        <ul>
                            <li class="item" v-for="(item,index) in search" :key="index">{{item.k}}</li>
                        </ul>
                    </div>
                </div>
                <div class="suggest">
                  <ul class="suggest-list">
                    <li class="suggest-item" v-for="(istem,Findex) in resultList" :key="Findex">
                      <div class="icon">
                        <i class="icon-music"></i>
                      </div>
                      <div class="name" >
                        <p class="text">{{istem.singgername}}-{{istem.songname}}</p>
                      </div>
                    </li>
                  </ul>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import Scroll from "@/components/scroll";
import { getHotKey } from "@/api";
import { search } from "@/api";
export default {
  data: function() {
    return {
      search: [],
      resultList: [],
      add: ""
    };
  },
  components: {
    Scroll
  },
  created() {
    this.getHotKeyList();
  },
  methods: {
    getHotKeyList() {
      getHotKey().then(res => {
        this.search = res.data.hotkey;
      });
    }
  },
  watch: {
    add(val) {
      this.add = val;
      
      search(this.add).then(res => {
        if(this.add = ''){
        doucment.getElementsByClassName('suggest')[0].style = 'display:none'
      }else{
        document.getElementsByClassName('shortcut-wrapper')[0].style = 'display:none'
      }
        // console.log(res);
        console.log(this.resultList)
        for (var i = 0; i < res.data.song.list.length; i++) {
          this.resultList = [{
            singgername: res.data.song.list[i].singer[0].name,
            songname: res.data.song.list[i].name
          }]
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/variable.less";
@import "~@/assets/less/icon.less";
.search {
  position: fixed;
  overflow: hidden;
  width: 100%;
  top: 86px;
  bottom: 0;
  background: @color-background;
  .search_box {
    width: 90%;
    height: 38px;
    margin: 20px;
    border-radius: 8px;
    background-color: @color-highlight-background;
    display: flex;
    align-items: center;
    .icon-search {
      font-size: 24px;
      color: #222;
    }
    .icon-search::before {
      content: "\E906";
    }
    .search_input {
      font-size: 16px;
      line-height: 20px;
      background: @color-highlight-background;
      outline: 0;
      width: 320px;
    }
    .icon-delete {
      font-size: 18px;
      color: #222;
      display: none;
    }
    .icon-delete::before {
      content: "\E914";
    }
  }
  .search-content {
    position: fixed;
    top: 178px;
    width: 100%;
    .shortcut-wrapper {
      height: 100%;
      overflow: hidden;
      .hot_key {
        margin: 0 20px 20px;
        h2 {
          margin-bottom: 20px;
          font-size: 18px;
          color: hsla(0, 0%, 100%, 0.3);
        }
        ul {
          .item {
            display: inline-block;
            padding: 5px 10px;
            margin: 0 20px 10px 0;
            border-radius: 6px;
            background: #333;
            font-size: 14px;
            color: hsla(0, 0%, 100%, 0.3);
          }
        }
      }
    }
    .suggest {
      height: 100%;
      overflow: hidden;
      .suggest-list {
        padding: 0 30px;
        .suggest-item {
          display: flex;
          align-items: center;
          padding-bottom: 20px;
          .icon {
            flex: 0 0 30px;
            width: 30px;
            .icon-music {
              font-size: 14px;
              color: hsla(0, 0%, 100%, 0.3);
            }
            .icon-music::before {
              content: "\E905";
            }
          }
          .name {
            flex: 1;
            font-size: 14px;
            color: hsla(0, 0%, 100%, 0.3);
            overflow: hidden;
            .text {
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
          }
        }
        li {
          list-style: none;
        }
      }
    }
  }
}
</style>
