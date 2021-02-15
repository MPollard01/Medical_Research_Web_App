import Vue from "vue";
import Router from "vue-router";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import RegisterConfirmation from "@/pages/RegisterConfirmation";
import PasswordReset from "@/pages/PasswordReset";
import Dashboard from "@/pages/Dashboard";

import authenticationService from '@/services/AuthenticationService';

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/register-confirmation",
      name: "RegisterConfirmation",
      component: RegisterConfirmation,
      props: true
    },
    {
      path: "/reset-password",
      name: "PasswordReset",
      component: PasswordReset
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      props: true,
      meta: {
        requiresAuth: true
      } 
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/"
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const currentUser = await authenticationService.getCurrentUser();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser){
    next('Login');
  }else{
    next();
  }
});

export default router;
