import { createRouter, createWebHistory } from "vue-router";
import firebase from "firebase";
import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";
import RegisterConfirmation from "@/views/RegisterConfirmation";
import PasswordReset from "@/views/PasswordReset";
import Dashboard from "@/views/Dashboard";
import AddData from "@/views/AddData";
import DeleteData from "@/views/DeleteData";
import Newsfeed from "@/views/Newsfeed";

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
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      loggedOut: true,
    },
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
    path: "/delete-data",
    name: "DeleteData",
    component: DeleteData,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/Newsfeed",
    name: "Newsfeed",
    component: Newsfeed,
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


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const loggedOut = to.matched.some((record) => record.meta.loggedOut);
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user && requiresAuth) {
      next("/login");
    } else if (loggedOut && user)  {
      next("/dashboard");
    } else {
      next();
    }
  });
});

export default router;
