<template>
  <div>
    <h1>Login</h1>
    <input
      type="email"
      name="email"
      v-model="email"
      placeholder="email"
    />
    <input
      type="password"
      name="password"
      v-model="password"
      placeholder="password"
    />
    <button @click="register">Login</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register () {
      console.log(this.email, this.password)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
