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
    <el-menu-item id="title" index="/">
      <span>Cardiomyopathy Platform</span>
    </el-menu-item>
    <el-menu-item v-if="!loggedIn" index="Home">Home</el-menu-item>
    <el-menu-item v-if="!loggedIn" index="Login">Login</el-menu-item>
    <el-menu-item v-if="!loggedIn" index="Register">Register</el-menu-item>
    <el-submenu v-if="loggedIn">
      <template v-if="user" #title>{{user.email}}</template>
      <el-menu-item @click="logout" index="logout">Logout</el-menu-item>
    </el-submenu>
  </el-menu>

  <el-menu 
    v-if="loggedIn"
    background-color="#727eaf"
    active-text-color="#c28adb"
    text-color="#fff" 
    :default-active="activeIndex2" 
    class="el-menu-vertical-demo"
    :collapse="isCollapsed"
    router
    >
  <el-menu-item index="Dashboard">
    <i class="el-icon-s-home el-icon"></i>
    <template #title>Dashboard</template>
  </el-menu-item>
  <el-menu-item index="Search">
    <i class="el-icon-search el-icon"></i>
    <template #title>Search</template>
  </el-menu-item>
  
  <el-menu-item index="add-data">
    <i class="el-icon-plus el-icon"></i>
    <template #title>Add data</template>
  </el-menu-item>
 
  <el-menu-item index="Delete">
    <i class="el-icon-delete el-icon"></i>
    <template #title>Delete data</template>
  </el-menu-item>
</el-menu>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import firebase from "firebase";

export default {
  name: "MainNav",
  setup() {
    const activeIndex = ref("");
    const activeIndex2 = ref("")
    const loggedIn = ref(false);
    const user = ref(null);
    const isCollapsed = ref(true)

    const router = useRouter();

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

    return { activeIndex, loggedIn, user, handleSelect, logout, isCollapsed, activeIndex2 };
  },
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.loggedIn = true;
        
      }
    });
  },
  watch:{
    $route (to, from){
      firebase.auth().onAuthStateChanged((user) => {
        if(user) {
          this.loggedIn = true;
          this.user = user
        }
      });
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

.el-menu-vertical-demo {
    position: fixed;
    height: 100%;
    border: none;
    top: 60px;
    z-index: 1;
  }

  .el-icon {
    color: #fff;
  }

  .el-menu-demo {
    position: fixed;
    width: 100%;
    z-index: 1;
    
  }
</style>
