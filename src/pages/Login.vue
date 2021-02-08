<template>
    <div class="login-page">
       <div class="sign-in-wrapper">
            <h1 class="title">Sign in</h1>
            <input
            type="email"
            name="email"
            v-model="email"
            placeholder="Email"
            class="input email-input"
            />
            <input
            type="password"
            name="password"
            v-model="password"
            placeholder="Password"
            class="input password-input"
            />
            <br>
            <button @click="login">Sign in</button>
            <br>
            <router-link to="reset-password" class="link">Reset password</router-link>
            <p class="dont-have-account">Don't have an account yet? <router-link to="register" class="link">Register</router-link> for free</p>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login () {
      console.log(this.email, this.password)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-page {
    display: flex;
    justify-content: center;
    text-align: center;
}

.sign-in-wrapper {
    width: 600px;
    margin-top: 100px;
}

.title {
    color: #c28adb;
}

input {
    width: 300px;
    padding: 0.75rem 1rem;
    margin-bottom: 1rem;
    border-radius: 15px;
    background-color: #E8E8E8;
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

.dont-have-account {
    margin-top: 4rem;
}

</style>
