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
}

.invert {
  background-color: white;
  color: #c28adb;
  border: 2px solid #c28adb;
}

.button:hover {
  cursor: pointer;
}

.link {
  text-decoration: none;
  color: #c28adb;
}

.link:hover {
  text-decoration: underline;
}

.error {
  background-color: #d16565;
  color: white;
  padding: 10px;
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
</style>
