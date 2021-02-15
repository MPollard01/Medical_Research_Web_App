<template>
  <div class="register-page">
    <div class="register-wrapper">
      <div v-if="errorRegistration" class="error">
        {{ errorRegistration }}
      </div>
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
        <input
          type="password"
          name="confirm-password"
          v-model="confirmPassword"
          placeholder="Confirm Password"
          class="input password-input"
          required
        />
        <br />
        <button @click="continueRegister">Continue</button>
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
        <br />
        <button @click="finishRegister">Register</button>
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
import firebase from "firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      address: "",
      phoneNumber: "",
      institution: "",
      errorRegistration: "",
      showNextForm: false
    };
  },
  methods: {
    continueRegister: function() {
      this.errorRegistration = null;

      if (this.email == null || this.email == "") {
        this.errorRegistration = "Please enter an email address";
        return;
      } else if (this.password == null || this.password == "") {
        this.errorRegistration = "Please enter a password";
        return;
      } else if (this.password !== this.confirmPassword) {
        this.errorRegistration = "Passwords do not match!";
        return;
      }

      this.showNextForm = true;
    },
    goBack: function() {
      this.showNextForm = false;
    },
    finishRegister: async function() {
      this.errorRegistration = null;

      if (this.name == null || this.name == "") {
        this.errorRegistration = "Please enter a name";
        return;
      } else if (this.address == null || this.address == "") {
        this.errorRegistration = "Please enter an address";
        return;
      } else if (this.institution == null || this.institution == "") {
        this.errorRegistration = "Please enter an institution affiliation";
        return;
      }

      const info = {
        email: this.email,
        password: this.password,
        name: this.name,
        address: this.address,
        phoneNumber: this.phoneNumber,
        institution: this.institution
      };

      if (!this.errorRegistration) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(info.email, info.password)
          .then(
            async userCredentials => {
              var user = userCredentials.user;

              await user.updateProfile({
                name: info.name,
                address: info.address,
                phoneNumber: info.phoneNumber,
                institution: info.institution
              });

              var domain =
                "https://" + firebase.remoteConfig().app.options.authDomain;

              var actionCodeSettings = {
                url: domain + "/login"
              };

              await user.sendEmailVerification(actionCodeSettings);

              this.$router.replace({
                name: "RegisterConfirmation",
                params: {
                  user
                }
              });
            },
            error => {
              this.errorRegistration = error.message;
            }
          );
      }
    }
  }
};
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
  cursor: pointer;
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

.error {
  background-color: #d16565;
  color: white;
  padding: 10px;
}
</style>
