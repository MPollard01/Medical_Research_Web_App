<template>
  <div>
    <MainNav />
    <router-view />
  </div>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase";

import MainNav from "@/components/MainNav";

export default {
  name: "App",
  components: {
    MainNav,
  },
  setup() {
    const currentUser = ref(null);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        currentUser.value = user;
      } else {
        currentUser.value = null;
      }
    });

    return { currentUser };
  },
};
</script>

<style>
body {
  font-family: "Helvetica Neue";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #707070;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.head {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  margin-top: 60px;
}

.wrap {
  margin: 0 0 30px 10%;
  padding-right: 30px;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100vh;
}
.wrap::-webkit-scrollbar {
  width: 8px;
}

.wrap::-webkit-scrollbar-track-piece:start {
  background: transparent;
  margin-top: 65px;
}

.wrap::-webkit-scrollbar-track-piece:end {
  background: transparent;
  margin-bottom: 5px;
}

.wrap::-webkit-scrollbar-track {
  display: none;
}

.wrap::-webkit-scrollbar-thumb {
  background-color: rgba(182, 180, 180, 0.568);
  border-radius: 5px;
}

.page {
  display: flex;
  justify-content: center;
  text-align: center;
}

.wrapper {
  width: 600px;
  margin-top: 3rem;
}

.container {
  padding: 20px;
}

.mg-none {
  margin: 0;
}

.mg-top-4rem {
  margin-top: 4rem;
}

p {
  font-size: 18px;
}

.input-group {
  display: inline-grid;
}

.input {
  width: 300px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border-radius: 15px;
  background-color: #e8e8e8;
  border: none;
  font-size: 18px;
  text-align: center;
}

a.button {
  margin: 20px;
  padding: 10px;
  text-decoration: none;
}

.button {
  width: 150px;
  height: 35px;
  margin-bottom: 1rem;
  border-radius: 15px;
  background-color: #c28adb;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  outline: none;
}

.invert {
  background-color: white;
  color: #c28adb;
  border: 2px solid #c28adb;
}

.button:hover {
  cursor: pointer;
  background-color: #e2a8fd;
}

.link {
  text-decoration: none;
  color: #c28adb;
}

.link:hover {
  text-decoration: underline;
}

.error {
  color: red;
  padding: 0;
  margin: 0;
  opacity: 0.6;
  font-size: 12px;
  line-height: 15px;
}

.title {
  color: #c28adb;
}

.dont-have-account {
  margin-top: 4rem;
}

.bar {
  margin-top: 4rem;
  border-bottom: 2px solid #e8e8e8;
}

#loading {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  display: block;
  opacity: 0.7;
  background-color: #fff;
  z-index: 99;
  text-align: center;
}

#loading-image {
  position: absolute;
  top: 50%;
  z-index: 100;
}

.el-submenu i {
  color: white !important;
}
</style>
