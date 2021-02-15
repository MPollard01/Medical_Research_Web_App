<template>
  <div class="password-reset-page">
    <div class="password-reset-wrapper">
      <div v-if="errorPasswordReset" class="error">
        {{ errorPasswordReset }}
      </div>
      <div v-if="!showSentConfirmation">
        <h1 class="title">Forgot your password?</h1>
        <p>Please enter your email below to request a password reset link...</p>
        <br />
        <input
          type="email"
          name="email"
          v-model="email"
          placeholder="Email"
          class="input email-input"
        />
        <br />
        <br />
        <button @click="requestPasswordReset">Submit</button>
        <br />
      </div>
      <div v-else>
        <h1 class="title">Reset password</h1>
        <p class="mg-none">
          If your email address is registered, you should receive an email
          shortly with instructions on how to reset your password.
        </p>
        <div class="bar"></div>
        <p class="mg-none mg-top-4rem">
          Return to <router-link to="/" class="link">home</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      email: "",
      errorPasswordReset: "",
      showSentConfirmation: false
    };
  },
  methods: {
    requestPasswordReset: async function() {
      this.errorPasswordReset = null;
      if (this.email == null || this.email == "") {
        this.errorPasswordReset = "Please enter an email address";
        return;
      }

      if (!this.errorPasswordReset) {
        var domain =
          "https://" + firebase.remoteConfig().app.options.authDomain;

        var actionCodeSettings = {
          url: domain + "/login"
        };

        firebase
          .auth()
          .sendPasswordResetEmail(this.email, actionCodeSettings)
          .then(
            async response => {
              this.showSentConfirmation = true;
            },
            error => {
              console.warn(error);
              this.errorPasswordReset = error.message;
            }
          );
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.password-reset-page {
  display: flex;
  justify-content: center;
  text-align: center;
}

.password-reset-wrapper {
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

.error {
  background-color: #d16565;
  color: white;
  padding: 10px;
}
</style>
