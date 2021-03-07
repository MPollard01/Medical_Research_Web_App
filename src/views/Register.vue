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
            id="email"
            type="email"
            name="email"
            v-model="email.value"
            :ref="email.ref"
            placeholder="Email"
            class="input email-input"
            required
          />
          <span class="error" v-if="email.error">{{
            email.error.message
          }}</span>
          <input
            id="password"
            type="password"
            name="password"
            v-model="password.value"
            :ref="password.ref"
            placeholder="Password"
            class="input password-input"
            required
          />
          <span class="error" v-if="password.error">{{
            password.error.message
          }}</span>
          <input
            id="confirmPassword"
            type="password"
            name="confirm-password"
            v-model="confirmPassword.value"
            :ref="confirmPassword.ref"
            placeholder="Confirm Password"
            class="input password-input"
            required
          />
          <span class="error" v-if="confirmPassword.error">{{
            confirmPassword.error.message
          }}</span>
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
              v-model="name.value"
              :ref="name.ref"
              placeholder="Name"
              class="input name-input required"
              required
            />
          </span>
          <span class="error" v-if="name.error">{{ name.error.message }}</span>
          <span class="required">
            <input
              type="text"
              name="address"
              v-model="address.value"
              :ref="address.ref"
              placeholder="Address"
              class="input address-input"
              required
            />
          </span>
          <span class="error" v-if="address.error">{{
            address.error.message
          }}</span>
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
              v-model="institution.value"
              :ref="institution.ref"
              placeholder="Instutional affiliation"
              class="input instutional-affiliation-input required"
              required
            />
          </span>
          <span class="error" v-if="institution.error">{{
            institution.error.message
          }}</span>
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
import { ElMessage } from "element-plus";
import { useForm } from "vue-hooks-form";

export default {
  name: "Register",
  setup() {
    const { useField, handleSubmit } = useForm({
      defaultValues: {},
    });
    const email = useField("email", {
      rule: { required: true },
    });
    const password = useField("password", {
      rule: { required: true, min: 6 },
    });
    const confirmPassword = useField("confirm password", {
      rule: {
        required: true,
        asyncValidator: async (rule, value) =>
          new Promise((resolve, reject) => {
            if (value !== password.value) {
              return reject(new Error("Passwords must match!"));
            }
            return resolve();
          }),
      },
    });
    const showNextForm = ref(false);
    const name = useField("name", {
      rule: {
        asyncValidator: async (rule, value) =>
          new Promise((resolve, reject) => {
            if (showNextForm.value && !value) {
              return reject(new Error("Please enter a name"));
            }
            return resolve();
          }),
      },
    });
    const address = useField("address", {
      rule: {
        asyncValidator: async (rule, value) =>
          new Promise((resolve, reject) => {
            if (showNextForm.value && !value) {
              return reject(new Error("Please enter an address"));
            }
            return resolve();
          }),
      },
    });
    const institution = useField("institution", {
      rule: {
        asyncValidator: async (rule, value) =>
          new Promise((resolve, reject) => {
            if (showNextForm.value && !value) {
              return reject(new Error("Please enter an institution"));
            }
            return resolve();
          }),
      },
    });
    const phoneNumber = ref("");
    const loading = ref(false);
    const errorRegistration = ref(null);

    const router = useRouter();

    const continueRegister = async () => {
      errorRegistration.value = validation.continueRegister(
        email.value,
        password.value,
        confirmPassword.value
      );

      if (!errorRegistration.value) {
        showNextForm.value = true;
      }
    };

    function goBack() {
      showNextForm.value = false;
    }

    const finishRegister = async () => {
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
          ElMessage.error({
            type: "error",
            message: errorRegistration.value,
            duration: 5000,
          });
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
    };

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
      continueRegister: handleSubmit(continueRegister),
      goBack,
      finishRegister: handleSubmit(finishRegister),
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
</style>
