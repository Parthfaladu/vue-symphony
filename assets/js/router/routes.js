import Vue from 'vue';
import Router from 'vue-router'
import Login from '@views/Login.vue'
  
Vue.use(Router);
  
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
	      path: '*',
	      redirect: '/login'
	    }
    ]
})