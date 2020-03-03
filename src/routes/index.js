import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '../views/Home.vue';
import Projects from '../components/Projects.vue';
//import Project from './components/Project.vue';

export const routes = [{
    path: '',
    components: {
      default: Home,
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
})
export default router
