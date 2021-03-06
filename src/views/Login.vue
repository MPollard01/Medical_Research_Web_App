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
      <h1 class="title">Sign in</h1>
      <div class="input-group">
        <input
          type="email"
          name="email"
          v-model="email.value"
          :ref="email.ref"
          placeholder="Email"
          class="input email-input"
        />
        <span class="error" v-if="email.error">{{ email.error.message }}</span>
        <input
          type="password"
          name="password"
          v-model="password.value"
          :ref="password.ref"
          placeholder="Password"
          class="input password-input"
        />
        <span class="error" v-if="password.error">{{ password.error.message }}</span>
      </div>
      <br />
      <button class="button" @click="submit">Sign in</button>
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
import {ElMessage} from 'element-plus'
import {useForm} from 'vue-hooks-form'

export default {
  name: "Login",
  setup() {
    const { useField, handleSubmit } = useForm({
      defaultValues: {},
    })
    const email = useField('email', {
      rule: { required: true },
    })
    const password = useField('password', {
      rule: { required: true },
    })
    //const email = ref("");
    //const password = ref("");
    const loading = ref(false);
    const errorLogin = ref("");

    const router = useRouter();

    const submit = async () => {
      loading.value = true;
      errorLogin.value = validation.login(email.value, password.value);

      const info = {
        email: email.value,
        password: password.value,
      };

      if (!errorLogin.value) {
        const { user, errors } = await authenticationService.login(info);

        loading.value = false;

        if (errors) {
          errorLogin.value = errors;
          ElMessage.error({
            type: 'error',
            message: errorLogin.value,
            duration: 5000
          })
        } else if (user) {
          router.replace({ name: "Dashboard" });
        }
      } else {
        loading.value = false;
      }
    }

    return { email, password, loading, errorLogin, submit: handleSubmit(submit) };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title {
    margin-bottom: 2em;
    text-align: center;
  }

  .dont-have-account {
    text-align: center;
  }

  input {
    outline: none;
  }

  button {
    outline: none;
  }

  
</style>
