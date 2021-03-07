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
      <template v-if="user" #title>{{ user.email }}</template>
      <el-menu-item index="Account">Account</el-menu-item>
      <el-menu-item @click="logout" index="Logout">Logout</el-menu-item>
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

    <el-menu-item index="Newsfeed">
      <i class="el-icon-notebook-2 el-icon"></i>
      <template #title>Newsfeed</template>
    </el-menu-item>

    <el-menu-item index="add-data">
      <i class="el-icon-plus el-icon"></i>
      <template #title>Add data</template>
    </el-menu-item>

    <el-menu-item index="delete-data">
      <i class="el-icon-delete el-icon"></i>
      <template #title>Delete data</template>
    </el-menu-item>

    <el-menu-item @click="handleHelp">
      <i class="el-icon-help el-icon"></i>
      <template #title>Help</template>
    </el-menu-item>
  </el-menu>
  <el-drawer title="I am the title" v-model="helpMenu" :with-header="false">
    <div class="help">
      <span v-html="helpMessage"></span>
    </div>
  </el-drawer>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import firebase from "firebase";

export default {
  name: "MainNav",
  setup() {
    const activeIndex = ref("");
    const activeIndex2 = ref("");
    const loggedIn = ref(false);
    const user = ref(null);
    const isCollapsed = ref(true);
    const helpMenu = ref(false);
    const helpMessage = ref("");

    const router = useRouter();

    function handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }

    function handleHelp() {
      helpMenu.value = true;
      switch (activeIndex.value) {
        case "Dashboard":
          helpMessage.value =
            "<p>Enter a gene name into the search bar to bring up information and graphs.</p><p>Alternatively, click advanced search for more search options:</p><p><b>Option 1:</b> search by terms</p><div style='margin-left: 10px;'><span><b>Step 1:</b> select a cardiomyopathy type</span></br><span><b>Step 2:</b> you will now be able to use the select box below to select from a list of diseases that are associated with the phenotype</span></br><span><b>Step 3:</b> click the display button to show the results below</span></div><p><b>Option 2:</b> search by gene</p><div style='margin-left: 10px;'><span><b>Step 1:</b> click the genes tab to switch forms</span></br><span><b>Step 2:</b> select a gene name</span></br><span><b>Step 3:</b> select from a list of diseases that are associated with the phenotype</span></br><span><b>Step 4:</b> click the display button to show the results below</span><p><b>Option 3:</b> click the X to close the advanced search</p></div>";
          break;
        case "AddData":
          helpMessage.value =
            "<h3>Fill in the form and upload a csv file to create your own graphs.</h3><p><b>Step 1:</b> enter a phenotype</p><p><b>Step 2:</b> enter gene name</p><p><b>Step 3:</b> enter a title for the graph</p><p><b>Step 4:</b> add notes if you like</p><p><b>Step 5:</b> click on the green button to upload csv</p><p><b>Step 6:</b> click the blue upload button then click ok to upload to the site</p>";
          break;
        case "DeleteData":
          helpMessage.value =
            "<p>This form allows you to delete data from the database.</p><p><b>Step 1:</b> select a term from any of the options</p><p><b>Step 2:</b> click on the corresponding button to find the associated data</p>";
          break;
        default:
          helpMessage.value = "no help available.";
      }
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

    return {
      activeIndex,
      loggedIn,
      user,
      handleSelect,
      logout,
      isCollapsed,
      activeIndex2,
      helpMenu,
      helpMessage,
      handleHelp,
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
      }
    });
  },
  watch: {
    $route(to, from) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.loggedIn = true;
          this.user = user;
        }
      });
      console.log(to, from);
      this.activeIndex = this.$router.currentRoute._value.name;
    },
  },
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

.el-menu {
  z-index: 999;
}

.help {
  margin: 10px auto;
  padding: 15px;
}
</style>
