
import { createRouter, createWebHistory } from 'vue-router'
import { checkUserConnexion } from './helpers/getters'
import calendar from './components/calendar.vue'
import conge from './components/conge.vue'
import hr from './components/hr.vue'
import profil from './components/profil.vue'
import login from './components/login.vue'

const routes = [
    { path: '/', component: login },
    { path: '/profil', component: profil },
    { path: '/calendar', component: calendar },
    { path: '/conge', component: conge },
    { path: '/hr', component: hr }, 
]

// création de l'historique de naviguation
const router = createRouter({
  history: createWebHistory(),
  routes  
})
router.beforeEach((to, from, next) => {
    const authenticated = checkUserConnexion()
    if(to.path !== '/' && !authenticated) next('/')
    else if(to.path === '/' && authenticated) next('/profil')
    else next()
})
export default router