<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    background-color="#727eaf"
    text-color="#fff"
    active-text-color="#c28adb"
    router
    :default-active="activeIndex"
  >
    <el-menu-item id="title" index="/">
      <span>Cardiomyopathy Platform</span>
    </el-menu-item>
    <el-menu-item class="not-active" @click="handleHelp">
      <i class="el-icon-help el-icon"></i>Help
    </el-menu-item>
    <el-menu-item v-if="!loggedIn" index="Home">Home</el-menu-item>
    <el-menu-item v-if="!loggedIn" index="Login">Login</el-menu-item>
    <el-menu-item v-if="!loggedIn" index="Register">Register</el-menu-item>
    <el-submenu v-if="loggedIn" index="account-sub">
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
import firebase from "firebase/app";
import "firebase/auth";

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

    function handleHelp() {
      helpMenu.value = true;
      switch (activeIndex.value) {
        case "Login":
          helpMessage.value =
            '<h1>Sign In</h1><p>Please enter your email and password into the input fields and press the "Sign In" button.</p><p>If you have forgotten your password, please press the "Reset password" button.</p><i>If you are new to our site and don\'t have an account, please press the "Register" button.</i>';
          break;
        case "PasswordReset":
          helpMessage.value =
            '<h1>Reset Password</h1><p>Please enter your registered email into the input field and press the "Submit" button.</p><p>You will then receive an email with instructions on how to reset your password.</p>';
          break;
        case "Register":
          helpMessage.value =
            '<h1>Register</h1><p>To create an account, please enter your email address, create a password and enter it twice in the input fields to confirm and press "Continue".</p><p>Then enter the required information about you into the input fields and press the "Register" button.</p><p>If you are presented with an error, please correct the fields and try again. You may press the "Back" button to edit the fields on the first screen.</p><i>If you already have an account, please press the "Sign In" button.</i>';
          break;
        case "Account":
          helpMessage.value =
            '<h1>Account</h1><p>You can view the details we have stored for you on this screen.</p><p>If you wish to update your details, please edit the input fields and press the "Update" button.</p>';
          break;
        case "Dashboard":
          helpMessage.value =
            "<h1>Dashboard</h1><p>Enter a gene name into the search bar to bring up information and graphs.</p><p>Alternatively, click advanced search for more search options:</p><p><b>Option 1:</b> search by terms</p><div style='margin-left: 10px;'><span><b>Step 1:</b> select a cardiomyopathy type</span></br><span><b>Step 2:</b> you will now be able to use the select box below to select from a list of diseases that are associated with the phenotype</span></br><span><b>Step 3:</b> click the display button to show the results below</span></div><p><b>Option 2:</b> search by gene</p><div style='margin-left: 10px;'><span><b>Step 1:</b> click the genes tab to switch forms</span></br><span><b>Step 2:</b> select a gene name</span></br><span><b>Step 3:</b> select from a list of diseases that are associated with the phenotype</span></br><span><b>Step 4:</b> click the display button to show the results below</span><p><b>Option 3:</b> click the X to close the advanced search</p></div>";
          break;
        case "Newsfeed":
          helpMessage.value =
            "<h1>Newsfeed</h1><p>Scroll down through the news feed to read the latest information on cardiomyopathy.</p><p>News titles can be clicked to view the article on the external website.</p>";
          break;
        case "AddData":
          helpMessage.value =
            '<h1>Add Data</h1><h3>Fill in the form and upload a CSV file to create your own graphs.</h3><p><b>Step 1:</b> enter a phenotype</p><p><b>Step 2:</b> enter gene name</p><p><b>Step 3:</b> enter a title for the graph</p><p><b>Step 4:</b> add notes if you like</p><p><b>Step 5:</b> click on the green "Upload" button on the "Upload File" section on the right to upload a CSV file. Please ensure your spreadsheet has been saved as .csv format, which contains 2 columns for the graph axis.</p><p><b>Step 6:</b> click the blue upload button then click ok to upload to the site</p>';
          break;
        case "DeleteData":
          helpMessage.value =
            '<h1>Delete Data</h1><p>This form allows you to delete data you have uploaded to the database.</p><p><b>Step 1:</b> Please select a term from any of the drop down selections in the "Find your data" section and press the "Find" button next to the attribute you are searching for.</p><p><b>Step 2:</b> If there are any results, you can scroll down to preview the data.</p><p><b>Step 3:</b> When you have found the data you wish to delete, please click on the corresponding "Delete" button.</p>';
          break;
        default:
          helpMessage.value = "No help available for this page.";
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
    $route() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.loggedIn = true;
          this.user = user;
        }
      });

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
  margin-right: calc(100vw - 36rem);
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

.not-active {
  color: white !important;
  border: none !important;
}
</style>
