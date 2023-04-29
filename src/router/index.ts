import { createRouter, createWebHistory } from 'vue-router'
import notFoundView from "@/views/not-found-view.vue";
import HomeComponent from "@/components/home.component.vue";
import PostsComponent from "@/components/posts.component.vue";
import UsersComponent from "@/components/users.component.vue";
import DocumentationComponent from "@/components/documentation.component.vue";
import SettingsComponent from "@/components/settings.component.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: HomeComponent
    },
    {
      path: '/users',
      name: 'users',
      component: UsersComponent
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostsComponent
    },
    {
      path: '/documentation',
      name: 'documentation',
      component: DocumentationComponent
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsComponent
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFount',
      component: notFoundView
    }
  ]
})

export default router
