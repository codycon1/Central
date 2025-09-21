import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Projects from '../views/Projects.vue'
import Contact from '../views/Contact.vue'
import Settings from '../views/Settings.vue'
import DatabaseInteraction from '../views/DatabaseInteraction.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/database-interaction',
      name: 'DatabaseInteraction',
      component: DatabaseInteraction
    }
  ],
})

export default router
