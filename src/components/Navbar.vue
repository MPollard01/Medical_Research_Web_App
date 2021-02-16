<template>
  <div class="navbar-wrapper">
    <h1 class="title">Cardiomyopathy Platform</h1>
    <div class="navbar-links">
      <div class="navbar-link">
        <router-link to="/" class="link"><span @click="updatePath('/')">Home</span></router-link>
        <div class="active" v-if="path === '/'" />
      </div>
      <div class="navbar-link">
        <router-link to="login" class="link"><span @click="updatePath('/login')">Login</span></router-link>
        <div class="active" v-if="path === '/login'" />
      </div>
      <div class="navbar-link">
        <router-link to="register" class="link"><span @click="updatePath('/register')">Register</span></router-link>
        <div
          class="active"
          v-if="path === '/register' || path === '/register-confirmation'"
        />
      </div>
      <div class="navbar-link">
        <router-link to="login" class="link"><span @click="logout">Logout</span></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import authenticationService from '@/services/AuthenticationService';

export default {
  data() {
    return {
      path: ""
    };
  },
  methods: {
    updatePath(path) {
      this.path = path;
    },
    logout () {
        authenticationService.logout();
    }
  },
  mounted() {
    this.path = this.$router.currentRoute.path;
  },
  watch: {
    $route() {
      this.path = this.$router.currentRoute.path;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-wrapper {
  width: calc(100% - 4rem);
  position: absolute;
  left: 0;
  top: 0;
  height: 60px;
  padding: 1rem 2rem;
  background-color: #727eaf;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  color: white;
  font-size: 24px;
}

.navbar-links {
  width: 15rem;
  display: flex;
  justify-content: space-between;
}

.navbar-link {
  margin-top: 1rem;
}

.link {
  text-decoration: none;
  color: white;
}

.active {
  width: 100%;
  height: 2px;
  margin-top: 1rem;
  background-color: #c28adb;
}
</style>
