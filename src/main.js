// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import firebase from "firebase";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;

let app = "";

const firebaseConfig = {
  apiKey: "AIzaSyAJNp8NG1nZfK1dq18WzwEIF0sfgvGL4mw",
  authDomain: "cardiomyapothy-blog.firebaseapp.com",
  projectId: "cardiomyapothy-blog",
  storageBucket: "cardiomyapothy-blog.appspot.com",
  messagingSenderId: "292478695937",
  appId: "1:292478695937:web:0e7a302e9e326b8cbb9e00",
  measurementId: "G-2KX5W83KF1"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: "#app",
      router,
      components: { App },
      template: "<App/>"
    });
  }
});
