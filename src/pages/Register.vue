<template>
  <div class="register-page">
       <div class="register-wrapper">
            <div v-if="!showNextForm">
                <h1 class="title">Register</h1>
                <input
                type="email"
                name="email"
                v-model="email"
                placeholder="Email"
                class="input email-input"
                required
                />
                <input
                type="password"
                name="password"
                v-model="password"
                placeholder="Password"
                class="input password-input"
                required
                />
                <br>
                <button @click="continueRegister">Continue</button>
            </div>
            <div v-if="showNextForm">
                <p class="more-details">Please provide some more details...</p>
                <p><i style="{margin-bottom: '1rem'}">Fields marked with an asterisk (<span class="asterisk"><b>*</b></span>) are required.</i></p>
                <br>
                <span class="required">
                    <input
                    type="text"
                    name="name"
                    v-model="name"
                    placeholder="Name"
                    class="input name-input required"
                    required
                    />
                </span>
                <span class="required">
                    <input
                    type="text"
                    name="address"
                    v-model="address"
                    placeholder="Address"
                    class="input address-input"
                    required
                    />
                </span>
                <input
                type="text"
                name="phone-number"
                v-model="phoneNum"
                placeholder="Phone number"
                class="input phone-number-input required"
                />
                <span class="required">
                    <input
                    type="text"
                    name="instutional-affiliation"
                    v-model="instution"
                    placeholder="Instutional affiliation"
                    class="input instutional-affiliation-input required"
                    required
                    />
                </span>
                <br>
                <button @click="register">Register</button>
            </div>
            <br>
            <p class="dont-have-account">Already have an account? <router-link to="login" class="link">Sign in</router-link></p>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      name: '',
      address: '',
      phoneNum: '',
      institution: '',
      showNextForm: false
    }
  },
  methods: {
    async continueRegister () {
      this.showNextForm = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register-page {
    display: flex;
    justify-content: center;
    text-align: center;
}

.register-wrapper {
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

.more-details {
    font-size: 24px;
}

i {
    margin-bottom: 1rem;
}

.required{
  position: relative;
}

.required::after{
  content: '*';
  position: absolute;
  top: 3px;
  right: 20px;
  color: #c28adb
}

.asterisk {
    color: #c28adb;
}

</style>
