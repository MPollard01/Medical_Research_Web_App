<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#727eaf"
    text-color="#fff"
    active-text-color="#c28adb"
    router
    :default-active="activeIndex"
  >
    <el-menu-item id="title">
      <span>Cardiomyopathy Platform</span>
    </el-menu-item>
    <el-menu-item v-if="!loggedIn" index="Home">Home</el-menu-item>
    <el-menu-item v-if="!loggedIn" index="Login">Login</el-menu-item>
    <el-menu-item v-if="!loggedIn" index="Register">Register</el-menu-item>
    <el-menu-item v-if="loggedIn" index="Dashboard">Dashboard</el-menu-item>
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
    const activeIndex = ref(null);
    const loggedIn = ref(false);
    const user = ref(null);

    const router = useRouter();

    function handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }

    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      this.loggedIn.value = user;
    });

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
  watch:{
    $route (to, from){
      console.log(to, from);
      this.activeIndex = this.$router.currentRoute._value.name;
    }
  } 
};
</script>

<style scoped>
.el-submenu__title i {
  color: #fff !important;
}

#title {
  font-size: medium;
  margin-right: calc(100vw - 30rem);
}
#title:hover {
  background: none !important;
}

#search-bg {
  background: none !important;
}
#search {
  border-radius: 15px;
  height: 30px;
}
</style>
