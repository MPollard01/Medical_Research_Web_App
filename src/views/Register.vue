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
      <div v-if="errorRegistration" class="error">
        {{ errorRegistration }}
      </div>
      <div v-if="!showNextForm">
        <h1 class="title">Register</h1>
        <div class="input-group">
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
          <input
            type="password"
            name="confirm-password"
            v-model="confirmPassword"
            placeholder="Confirm Password"
            class="input password-input"
            required
          />
        </div>
        <br />
        <button @click="continueRegister" class="button">Continue</button>
      </div>
      <div v-if="showNextForm">
        <p class="more-details">Please provide some more details...</p>
        <p>
          <i
            >Fields marked with an asterisk (<span class="asterisk"
              ><b>*</b></span
            >) are required.</i
          >
        </p>
        <br />
        <div class="input-group">
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
            v-model="phoneNumber"
            placeholder="Phone number"
            class="input phone-number-input required"
          />
          <span class="required">
            <input
              type="text"
              name="institution-affiliation"
              v-model="institution"
              placeholder="Instutional affiliation"
              class="input instutional-affiliation-input required"
              required
            />
          </span>
        </div>
        <br />
        <button @click="finishRegister" class="button">Register</button>
        <p @click="goBack" class="link">Back</p>
      </div>
      <br />
      <p class="dont-have-account">
        Already have an account?
        <router-link to="login" class="link">Sign in</router-link>
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
  name: "Register",
  setup() {
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const name = ref("");
    const address = ref("");
    const phoneNumber = ref("");
    const institution = ref("");
    const loading = ref(false);
    const errorRegistration = ref(null);
    const showNextForm = ref(false);

    const router = useRouter();

    function continueRegister() {
      errorRegistration.value = validation.continueRegister(
        email.value,
        password.value,
        confirmPassword.value
      );

      if (!errorRegistration.value) {
        showNextForm.value = true;
      }
    }

    function goBack() {
      showNextForm.value = false;
    }

    async function finishRegister() {
      loading.value = true;
      errorRegistration.value = validation.finishRegister(
        name.value,
        address.value,
        institution.value
      );

      const info = {
        email: email.value,
        password: password.value,
        name: name.value,
        address: address.value,
        phoneNumber: phoneNumber.value,
        institution: institution.value,
      };

      if (!errorRegistration.value) {
        const { user, error } = await authenticationService.register(info);

        loading.value = false;

        if (error) {
          errorRegistration.value = error;
        } else if (user) {
          router.replace({
            name: "RegisterConfirmation",
            params: {
              user,
            },
          });
        }
      } else {
        loading.value = false;
      }
    }

    return {
      email,
      password,
      confirmPassword,
      name,
      address,
      phoneNumber,
      institution,
      loading,
      errorRegistration,
      showNextForm,
      continueRegister,
      goBack,
      finishRegister,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.more-details {
  font-size: 24px;
}

.required {
  position: relative;
}

.required::after {
  content: "*";
  position: absolute;
  top: 3px;
  right: 20px;
  color: #c28adb;
}

.asterisk {
  color: #c28adb;
}
</style>
