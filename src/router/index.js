import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import RegisterConfirmation from '@/pages/RegisterConfirmation'
import PasswordReset from '@/pages/PasswordReset'
import PasswordResetComplete from '@/pages/PasswordResetComplete'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/register-confirmation',
      name: 'RegisterConfrimation',
      component: RegisterConfirmation
    },
    {
      path: '/reset-password',
      name: 'PasswordReset',
      component: PasswordReset
    },
    {
      path: '/reset-password-complete',
      name: 'PasswordResetComplete',
      component: PasswordResetComplete
    }
  ]
})

const router = new Router({
  mode: "history",
  routes
});