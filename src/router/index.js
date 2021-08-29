import Vue           from 'vue'
import VueRouter     from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Login     from '@/views/Login.vue'
import Register  from '@/views/Register.vue'
import PageNotFound    from '@/views/PageNotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    meta: {
      title : 'dashboard'
    },
    component: Dashboard,
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title : 'login'
    },
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      title : 'sign up'
    },
    component: Register
  },
  {
    path: '*',
    name: 'PageNotFound',
    meta: {
      title : 'page not found'
    },
    component: PageNotFound
  },
  // {
    /* route level code-splitting
    this generates a separate chunk (about.[hash].js) for this route
    which is lazy-loaded when the route is visited.*/
    // path: '/about',
    // name: 'About',
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${process.env.VUE_APP_TITLE} | ${to.meta.title}`
  next();
})

export default router
