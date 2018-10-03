<template>
  <div class="ui middle aligned center aligned grid login__container cus-form-design">
    <div class="column">
      <h2 class="ui header">
        Forgot Password
      </h2>
      <form class="ui large form" :class="{ 'error' : hasErrors }">
        <div class="ui stacked segment">
          <div class="field">
            <label>Password</label>
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password" placeholder="Password" v-model.trim="password">
            </div>
          </div>
          <div class="field">
            <label>Conform Password</label>
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="conformPassword" placeholder="Conform Password" v-model.trim="conformPassword">
            </div>
          </div>
          <div class="ui fluid large cus-color button" @click.prevent="resetPassword">Forgot Password</div>
        </div>
        <div class="ui error message" v-if="hasErrors">
          <p v-for="error in errors">{{ error }}</p>
        </div>
      </form>
      <div class="ui message">
        <router-link to="/">Home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "forgotpassword",
  data() {
    return {
      password: "",
      conformPassword: "",
      errors: []
    };
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0;
    }
  },
  methods: {
    resetPassword() {
      if (this.formValid()) {
        alert("reset password");
      } else {
        this.errors.push("please enter fields first");
      }
    },
    formValid() {
      if (this.password === this.conformPassword) {
        if (this.password.length > 0 && this.conformPassword.length > 0) {
          return true;
        }
        return true;
      }

      return false;
    }
  }
};
</script>


