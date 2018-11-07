import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        //记录播放列表
        playList:[],
        //记录播放器是否全屏
        fullScreen:false,
        //播放状态
        playing:false,
        //当前播放歌曲的列表索引
        currentIndex:-1,
    },
    getters:{
        playList:state =>state.playList,
        fullScreen:state => state.fullScreen,
        playing:state => state.playing,
        currentIndex:state => state.currentIndex, 
        //当前播放的歌曲的信息
        currentSong:(state) => {
            return  state.playList[state.currentIndex] || {}
        }
    },
    mutations:{
        changePlayList(state,playList){
            state.playList = playList
        },
        changeFullScreen(state,fullScreen){
            state.fullScreen = fullScreen
        },
        changePlaying(state,playing){
            state.playing = playing
        },
        changeCurrentIndex(state,currentIndex){
            state.currentIndex = currentIndex
        },
    },
    actions:{ 
        addPlayer({commit},{list,index}){
            commit('changePlayList',list) 
            commit('changeFullScreen',true)
            commit('changePlaying',true)
            commit('changeCurrentIndex',index)
        }
    }
})