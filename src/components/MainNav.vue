<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#727eaf"
    text-color="#fff"
    active-text-color="#c28adb"
    router
  >
    <el-menu-item id="title">
      <span>Cardiomyopathy Platform</span>
      <img
        id="heart-icon"
        src="../assets/Realistic-Red-Heart.svg"
        alt="Heart Icon"
      />
    </el-menu-item>
    <el-menu-item v-if="!loggedIn" index="home">Home</el-menu-item>
    <el-menu-item v-if="!loggedIn" index="login">Login</el-menu-item>
    <el-menu-item v-if="!loggedIn" index="register">Register</el-menu-item>
    <el-menu-item v-if="loggedIn" index="dashboard">Dashboard</el-menu-item>
    <el-submenu v-if="loggedIn" index="3">
      <template #title>Data</template>
      <el-menu-item index="add">Add</el-menu-item>
      <el-menu-item index="query">Query</el-menu-item>
    </el-submenu>
    <el-submenu v-if="loggedIn" index="4">
      <template #title>Charts</template>
      <el-menu-item index="4-1">Line</el-menu-item>
      <el-menu-item index="4-2">Bar</el-menu-item>
      <el-menu-item index="4-3">Pie</el-menu-item>
    </el-submenu>
    <el-menu-item v-if="loggedIn" id="search-bg">
      <el-input placeholder="Search" v-model="search" id="search">
        <template #prefix>
          <i class="el-input__icon el-icon-search"></i>
        </template>
      </el-input>
    </el-menu-item>
    <el-menu-item v-if="loggedIn" @click="logout">Logout</el-menu-item>
  </el-menu>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import firebase from "firebase";

export default {
  name: "MainNav",
  setup() {
    const activeIndex = ref("home");
    const loggedIn = ref(false);
    const user = ref(null);

    const router = useRouter();

    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      loggedIn.value = user;
    });

    function handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }

    function logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          firebase.auth().onAuthStateChanged(() => {
            user.value = null;
            loggedIn.value = false;
            router.push("/login");
          });
        });
    }

    return { activeIndex, loggedIn, user, handleSelect, logout };
  },
};
</script>

<style scoped>
.el-submenu__title i {
  color: #fff !important;
}
#title {
  font-size: medium;
  margin-right: 3em;
}
#title:hover {
  background: none !important;
}
#heart-icon {
  width: 25px;
  height: 25px;
  padding: 0 20px;
}
#search-bg {
  background: none !important;
}
#search {
  border-radius: 15px;
  height: 30px;
}
</style>
