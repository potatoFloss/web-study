import Vue from 'vue'
import VueRouter from "vue-router";
import Layout from '@/views/Layout.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Layout },
    { path: '/detail', component: ArticleDetail }
  ]
})

export default router