import { createRouter, createWebHistory } from 'vue-router'
import notFoundView from "@/views/not-found-view.vue";
import PostsTableComponent from "@/components/posts-table.component.vue";
import PostsCommentsTableComponent from "@/components/posts-comments-table.component.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/posts',
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostsTableComponent
    },
    {
      path: '/posts/comments',
      name: 'posts-comments',
      component: PostsCommentsTableComponent
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFount',
      component: notFoundView
    }
  ]
})

export default router
