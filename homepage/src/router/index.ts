import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DatabaseInteraction from '../views/DatabaseInteraction.vue'
import NetworkTopology from '../views/NetworkTopology.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/database-interaction',
      name: 'DatabaseInteraction',
      component: DatabaseInteraction
    },
    {
      path: '/network-topology',
      name: 'NetworkTopology',
      component: NetworkTopology
    }
  ],
})

export default router
