import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LibraryView from '../views/LibraryView.vue'
import GoalsView from '../views/GoalsView.vue'
import BrowseView from '../views/BrowseView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    { path: '/', component: HomeView },
    { path: '/LibraryView', component: LibraryView },
    { path: '/GoalsView', component: GoalsView },
    { path: '/BrowseView', component: BrowseView }
  ]
})

export default router
