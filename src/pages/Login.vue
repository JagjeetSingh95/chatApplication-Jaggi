<template>     
  <div class="ui middle aligned center aligned grid login__container cus-form-design">
    <div class="column">
      <h2 class="ui header">
          Login
      </h2>
      <form class="ui large form" :class="{ 'error' : hasErrors }">
        <div class="ui stacked segment">
          <div class="field">
            <label>Email</label>
            <div class="ui left icon input">              
              <i class="user icon"></i>
              <input type="email" name="email" placeholder="Email" v-model.trim="email">
            </div>
          </div>
          <div class="field">
            <label>Password</label>
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password" placeholder="Password" v-model.trim="password">
            </div>
          </div>
          <div class="ui fluid large cus-color button" @click.prevent="login" :class="{ 'loading': isLoading }">Login</div>
        </div>
        <div class="ui error message" v-if="hasErrors">
          <p v-for="error in errors">{{ error }}</p>
        </div>
      </form>
      <div class="ui message">
        <router-link to="/register" class="register-link">Register</router-link>
        <router-link to="/forgotpassword" class="forgot-pass-link">Forgot Password</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      errors: [],
      isLoading: false
    };
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0;
    }
  },
  methods: {
    login() {
      this.errors = [];

      if (this.isFormValid()) {
        this.isLoading = true;

        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(user => {
            this.$store.dispatch("setUser", user);
            this.$router.push("/");
          })
          .catch(error => {
            this.errors.push(error.message);
            this.isLoading = false;
          });
      }
    },
    isFormValid() {
      if (this.email.length > 0 && this.password.length > 0) {
        return true;
      }
      return false;
    }
  }
};
</script>

