import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import firebase from 'firebase'
import Login from './pages/Login'
import Register from './pages/Register'
import Tchat from './pages/Tchat'
import store from './store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/',
    component: Tchat,
    beforeEnter: (to, from, next) => {
      if(!firebase.auth().currentUser){
        next('/login')
      }else{
        next()
      }
    }
  }
]
const router = new VueRouter({routes})

let config = {
  apiKey: "AIzaSyC0TT0-v1ARoY8HIcKQhKEUyoZgQbPl094",
  authDomain: "chatapp-6fecc.firebaseapp.com",
  databaseURL: "https://chatapp-6fecc.firebaseio.com",
  projectId: "chatapp-6fecc",
  storageBucket: "chatapp-6fecc.appspot.com",
  messagingSenderId: "22084971041"
};

firebase.initializeApp(config);

window.firebase = firebase

const unsuscribe = firebase.auth().onAuthStateChanged(user => {

    store.dispatch('setUser', user)

    new Vue({
      el: '#app',
      components: { App },
      template: '<App/>',
      router,
      store
    })

    unsuscribe()
 })

Vue.config.productionTip = false

/* eslint-disable no-new */