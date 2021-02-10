<template>
    <div class="register-confirmation-page">
        <div class="register-confirmation-wrapper">
            <h1 class="title">Thank you for registering!</h1>
            <p class="mg-none">To continue, please verify your account by</p>
            <p class="mg-none">clicking the link in the email we just sent you before logging in.</p>
            <div class="bar"></div>
            <p class="mg-none mg-top-4rem">Haven't received an email?</p>
            <p class="mg-none">Please check your spam or click the button below to have another email sent to you...</p>
            <button @click="sendEmail">Send again</button>
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
    sendEmail () {
      console.log('send email')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register-confirmation-page {
    display: flex;
    justify-content: center;
    text-align: center;
}

.register-confirmation-wrapper {
    width: 700px;
    margin-top: 150px;
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

button {
    width: 150px;
    height: 35px;
    margin-bottom: 1rem;
    margin-top: 1rem;
    border-radius: 15px;
    background-color: #c28adb;
    color: white;
    font-size: 18px;
    font-weight: bold;
    border: none;
}

</style>
