import { createRouter, createWebHistory } from "vue-router";
import Main from '../pages/Main.vue'
import PostsPage from '../pages/PostsPage.vue'
import PostPage from "@/pages/PostPage.vue";
import PostsPageWithStore from "@/pages/PostsPageWithStore.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Main
    },
    {
      path: '/posts',
      component: PostsPage
    },
    {
      path: '/posts/:id',
      component: PostPage
    },
    {
      path: '/postsStore',
      component: PostsPageWithStore
    }
  ]
})