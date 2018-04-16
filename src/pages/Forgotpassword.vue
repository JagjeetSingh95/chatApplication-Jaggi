<template>
    <div class="ui middle aligned center aligned grid login__container">
        <div class="column">
            <h2 class="ui orange header">
                <div class="content">
                    Forgot Password
                </div>
            </h2>
            <form class="ui large form" :class="{ 'error' : hasErrors }">
                <div class="ui stacked segment">

                    <div class="field">
                        <div class="ui left icon input">
                            <i class="user icon"></i>
                            <input type="email" name="email" placeholder="Email" v-model.trim="email">
                        </div>
                    </div>

                    <div class="ui fluid large orange button" @click.prevent="forgotpassword">Forgot Password</div>
                </div>

                 <div class="ui positive message" v-if="hasErrors">
                    <p v-for="error in errors">{{ error }}</p>
                </div>

            </form>

            <div class="ui message">
              Login
                <router-link to="/login">Login</router-link>
            </div>
       </div>
    </div>

 </template>
<script>
export default {
  name: "forgotpassword",
  data() {
    return {
      email: "",
      errors: []
    };
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0;
    }
  },
  methods: {
    forgotpassword() {
      if (this.formValid()) {
        firebase
          .auth()
          .sendPasswordResetEmail(this.email)
          .then(() => {
            this.errors.push("Please check your email! We will send to mail.");
          })
          .catch(() => {
            alert("please write correct email....");
          });
      } else {
        alert("please enter email first");
      }
    },
    formValid() {
      if (this.email.length > 0) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped>
.login__container {
  margin-top: 40px;
}
.column {
  max-width: 450px;
}
</style>
