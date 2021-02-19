<template>
  <div class="page">
    <div class="wrapper">
      <h1>Welcome...</h1>
      <p class="mg-none">
        to the Cariomyopathy Platform, a central database for all queries
      </p>
      <p class="mg-none">relating to Cariomyopathy research.</p>

      <div class="container" v-if="user">
        <router-link to="/dashboard" tag="button" class="button"
          >Visit dashboard</router-link
        >
      </div>
      <div class="container" v-else>
        <p class="mg-top-4rem">Please choose an option below to continue:</p>
        <router-link to="/login" tag="button" class="button"
          >Sign in</router-link
        >
        <router-link to="/register" tag="button" class="button invert"
          >Register</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase";

export default {
  name: "Home",
  setup() {
    const user = ref(null);
    return { user };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
