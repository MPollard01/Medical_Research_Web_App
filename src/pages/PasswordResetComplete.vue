<template>
  <div class="password-reset-complete-page">
    <div class="password-reset-complete-wrapper">
      <div v-if="!showConfirmation">
        <h1 class="title">Reset password</h1>
        <p>Please enter your new password below...</p>
        <br />
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="Password"
          class="input password-input"
          required
        />
        <br />
        <br />
        <button @click="resetPassword">Submit</button>
        <br />
      </div>
      <div v-else>
        <h1 class="title">Password updated</h1>
        <p class="mg-none mg-top-4rem">
          You may now
          <router-link to="login" class="link">login</router-link> with your new
          password.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      password: '',
      showConfirmation: false
    }
  },
  methods: {
    async resetPassword () {
      console.log(this.password)
      this.showConfirmation = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.password-reset-complete-page {
  display: flex;
  justify-content: center;
  text-align: center;
}

.password-reset-complete-wrapper {
  width: 600px;
  margin-top: 150px;
}

.title {
  color: #c28adb;
}

input {
  width: 300px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border-radius: 15px;
  background-color: #e8e8e8;
  border: none;
  font-size: 18px;
  text-align: center;
}

button {
  width: 150px;
  height: 35px;
  margin-bottom: 1rem;
  border-radius: 15px;
  background-color: #c28adb;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
}

button:hover {
  cursor: pointer;
}

.link {
  text-decoration: none;
  color: #c28adb;
}

.link:hover {
  text-decoration: underline;
}

.mg-none {
  margin: 0;
}

.mg-top-4rem {
  margin-top: 4rem;
}

p {
  font-size: 18px;
}

.bar {
  margin-top: 4rem;
  border-bottom: 2px solid #e8e8e8;
}
</style>
