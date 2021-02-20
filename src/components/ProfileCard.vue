<template>
  <el-card class="box-card">
      <div>
        <el-avatar icon="el-icon-user-solid" :size="50"></el-avatar>
      </div>
      <h4 v-if="user">Email: {{ user.email }}</h4>
  </el-card>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase";

export default {
  setup() {
    const user = ref(null);
    return { user };
  },
  methods: {},
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box-card {
    width: 300px;
    position: absolute;
    top: 60px;
    left: 1rem;
    padding: 1rem;
}
</style>
