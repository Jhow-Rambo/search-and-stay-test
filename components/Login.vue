<template>
  <b-container
    class="login-container d-flex justify-content-center align-items-center"
  >
    <b-form class="login-form" @submit.prevent="submitForm">
      <h2>Login</h2>
      <b-form-group
        id="email-input-group"
        label="Email"
        label-for="email-input"
        description="Enter your email."
      >
        <b-form-input
          id="email-input"
          v-model="email"
          type="email"
          placeholder="test@gmail.com"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="password-input-group"
        label="Password"
        label-for="password-input"
        description="Enter your password."
      >
        <b-form-input
          id="password-input"
          v-model="password"
          type="password"
          placeholder="*****"
          required
        ></b-form-input>
      </b-form-group>

      <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>

      <b-button type="submit" variant="primary" class="mt-3">Login</b-button>
    </b-form>
  </b-container>
</template>

<script>
import axios from 'axios'
import {
  BContainer,
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
} from 'bootstrap-vue'

export default {
  name: 'LoginPage',
  components: {
    BContainer,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
  },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    }
  },
  methods: {
    submitForm() {
      const data = {
        login: {
          email: this.email,
          password: this.password,
        },
      }
      axios
        .post(this.$axios.defaults.baseURL + '/login_json', data)
        .then((response) => {
          localStorage.setItem('token', response.data.data.result.access_token)
          this.$router.push('/rules')
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            this.errorMessage =
              'Email or Password incorrect. Please, try again.'
          } else {
            console.log(error)
          }
        })
    },
  },
}
</script>

<style scoped>
/* stylelint-disable selector-anb-no-unmatchable */
.login-container {
  max-width: 1500px;
  margin: auto;
  padding: 50px;
  background-color: rgb(255 255 255);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  padding: 20px;
  max-width: 400px;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 4px 14px rgb(0 0 0 / 50%);
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #333;
}
</style>
