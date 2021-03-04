import { createRouter, createWebHistory } from "vue-router";
import firebase from "firebase";

import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";
import RegisterConfirmation from "@/views/RegisterConfirmation";
import PasswordReset from "@/views/PasswordReset";
import Dashboard from "@/views/Dashboard";
import AddData from "@/views/AddData.vue";
import AdvancedSearch from '@/views/AdvancedSearch'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      loggedOut: true,
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      loggedOut: true,
    }
  },
  {
    path: "/register-confirmation",
    name: "RegisterConfirmation",
    component: RegisterConfirmation,
    props: true,
  },
  {
    path: "/reset-password",
    name: "PasswordReset",
    component: PasswordReset,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/add-data",
    name: "AddData",
    component: AddData,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/search",
    name: "Search",
    component: AdvancedSearch,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

router.beforeEach((to, from, next) => {
  const isAuthenticated = firebase.auth().currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const loggedOut = to.matched.some((record) => record.meta.loggedOut);

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (loggedOut && isAuthenticated) {
    next("/dashboard");
  } else {
    next();
  }
});

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
