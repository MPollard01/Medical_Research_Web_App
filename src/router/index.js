import { createRouter, createWebHistory } from "vue-router";

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
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
