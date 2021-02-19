<template>
  <div class="page">
    <div class="wrapper">
      <div v-if="loading" id="loading">
        <img
          id="loading-image"
          src="../assets/ajax-loader.gif"
          alt="Loading..."
        />
      </div>
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
        <button @click="requestPasswordReset" class="button">Submit</button>
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
import { ref } from "vue";
import firebase from "firebase";
import { firebaseAuthentication } from "@/firebase/database";
import validation from "@/utils/Validation";

export default {
  name: "PasswordReset",
  setup() {
    const email = ref("");
    const loading = ref(false);
    const errorPasswordReset = ref("");
    const showSentConfirmation = ref(false);

    async function requestPasswordReset() {
      loading.value = true;
      errorPasswordReset.value = validation.passwordReset(email.value);

      if (!errorPasswordReset.value) {
        var domain =
          "https://" + firebase.remoteConfig().app.options.authDomain;

        var actionCodeSettings = {
          url: domain + "/login",
        };

        firebaseAuthentication
          .sendPasswordResetEmail(email.value, actionCodeSettings)
          .then(
            async () => {
              loading.value = false;
              showSentConfirmation.value = true;
            },
            (error) => {
              console.warn(error);
              loading.value = false;
              errorPasswordReset.value = error.message;
            }
          );
      } else {
        loading.value = false;
      }
    }

    return {
      email,
      loading,
      errorPasswordReset,
      showSentConfirmation,
      requestPasswordReset,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
