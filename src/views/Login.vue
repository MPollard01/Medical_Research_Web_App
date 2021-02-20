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
      <div v-if="errorLogin" class="error">
        {{ errorLogin }}
      </div>
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
      <br />
      <button class="button" @click="login">Sign in</button>
      <br />
      <router-link to="reset-password" class="link">Reset password</router-link>
      <p class="dont-have-account">
        Don't have an account yet?
        <router-link to="register" class="link">Register</router-link> for free
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import validation from "@/utils/Validation";
import authenticationService from "@/services/AuthenticationService";

export default {
  name: "Login",
  setup() {
    const email = ref("");
    const password = ref("");
    const loading = ref(false);
    const errorLogin = ref("");

    const router = useRouter();

    async function login() {
      loading.value = true;
      errorLogin.value = validation.login(email.value, password.value);

      const info = {
        email: email.value,
        password: password.value,
      };

      if (!errorLogin.value) {
        const { user, error } = await authenticationService.login(info);

        loading.value = false;

        if (error) {
          errorLogin.value = error;
        } else if (user) {
          router.replace({ name: "Dashboard" });
        }
      } else {
        loading.value = false;
      }
    }

    return { email, password, loading, errorLogin, login };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
