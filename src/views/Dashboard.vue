<template>
  <div class="page">
    <div class="wrapper">
      <h1 v-if="user">Welcome {{ user.email }}</h1>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase";

export default {
  name: "Dashboard",
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
