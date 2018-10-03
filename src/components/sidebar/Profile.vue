<template>
  <div class="profilecss">
    <div class="ui modal" id="Profile">
      <i class="close icon"></i>
      <div class="header blue">
        Profile
      </div>
      <div class="image content">
        <div class="description">
          <form class="ui form">
            <div class="ui card">
              <div class="image">
                <img :src="currentUser.photoURL" alt="avatar">
              </div>
              <div class="content">
                <a class="header"> 
                  <div class="field">
                    <input type="text" name="displayName" v-model="currentUser.displayName" placeholder="Name">
                  </div>
                </a>
                <div class="meta">
                  <span class="date">2018</span>
                </div>
                <div class="description">
                  <span class="date">2018</span>
                </div>
              </div>
              <div class="extra content email-add">
                <a>
                  <i class="user icon"></i>
                  {{ currentUser.email }}
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="actions">
        <div class="ui red button deny">Cancel</div>
        <div class="ui cus-color button deny" @click="updateProfile">Update</div>
      </div>
   </div>
  </div> 
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Profile",
  data() {
    return {
      user: {
        displayName: "Jaz Rock",
        photoURL:
          "https://thumbs.dreamstime.com/b/coding-programming-source-code-screen-abstract-software-developer-computer-script-50626037.jpg"
      },
      presenceRef: firebase.database().ref("presence")
    };
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    updateProfile() {
      console.log("update");
      console.log(this.currentUser.uid);
      console.log(this.currentUser.displayName);
      console.log(this.currentUser.photoURL);
      firebase
        .database()
        .ref("users")
        .child(this.currentUser.uid)
        .set({
          name: this.user.displayName,
          avatar: this.user.photoURL
        })
        .then(() => {
          this.$store.dispatch("setUser", this.user);
          this.$router.push("/");
        });
    }
  }
};
</script>

