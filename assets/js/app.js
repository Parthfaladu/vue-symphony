/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
import Vue from 'vue';
import "jquery";
import "bootstrap";
import store from "@store/store";
import router from '@router/routes';
import App from "./App.vue"; 
  

// bootstrap the app
new Vue({
  	router,
  	store,
  	components: { App },
}).$mount('#vueapp');