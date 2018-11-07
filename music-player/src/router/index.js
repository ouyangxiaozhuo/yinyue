import Vue from 'vue'
import Router from 'vue-router'
import Ranking from '@/views/ranking/index.vue'
import Recommend from '@/views/recommend/index.vue'
import Search from '@/views/search/index.vue'
import Singer from '@/views/singer/index.vue'
import RecommendDetail from '@/views/recommend/detail.vue'
import SingerDetail from '@/views/singer/detail.vue'
import RankingDetail from '@/views/ranking/detail.vue'
import SearchDetail from '@/views/search/detail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/ranking',
      component: Ranking,
      children:[
        {
          path:'/ranking/:id',
          component:RankingDetail
        }
      ]
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: '/recommend/:id',
          component: RecommendDetail
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children:[
        {
          path:'/search/:id',
          compponent:SearchDetail
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: '/singer/:id',
          component: SingerDetail
        }
      ]
    }
  ]
})
