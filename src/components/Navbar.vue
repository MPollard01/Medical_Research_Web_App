<template>
  <div class="navbar-wrapper">
      <h1 class="title">Cardiomyopathy Platform</h1>
      <div class="navbar-links">
          <div @click="updatePath('/home')" class="navbar-link">
              <router-link to="home" class="link">Home</router-link>
              <div class="active" v-if="path === '/home'" />
          </div>
          <div @click="updatePath('/login')" class="navbar-link">
              <router-link to="login" class="link">Login</router-link>
              <div class="active" v-if="path === '/login'" />
          </div>
          <div @click="updatePath('/register')" class="navbar-link">
              <router-link to="register" class="link">Register</router-link>
              <div class="active" v-if="path === '/register'" />
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      path: ''
    }
  },
  methods: {
    updatePath (path) {
      this.path = path
    }
  },
  mounted () {
    this.path = this.$router.currentRoute.path
  }

}
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
    background-color: #727EAF;
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
