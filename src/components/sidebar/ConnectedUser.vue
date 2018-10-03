<template>
  <div class="connected-user">
    <div class="connectedUser__container">
      <div class="ui items">
        <div class="item">
          <div class="ui mini image">
            <img :src="currentUser.photoURL" alt="avatar">
          </div>
          <div class="middle aligned content">
            <div class="ui container" >
              <div class="ui inverted header" @click.prevent="modalProfile">
                  {{ currentUser.displayName }}
              </div>
            </div>
          </div>      
          <div class="extra">
            <button class="ui circular icon right floated button" @click.prevent="modalLogout">
                <i class="icon sign out"></i>
            </button>
          </div>
          <Profile></Profile>
        </div>
      </div>
    </div>
    <!--Logout modal-->
    <div class="ui modal" id="logoutOpen">
      <i class="close icon"></i>
      <div class="header blue">
          Log out
      </div>
      <div class="image content">
          <div class="description">
          Are you sure you want to Logout?
          </div>
      </div>
      <div class="actions">
          <div class="ui red button deny">Cancel</div>
          <div class="ui cus-color button deny" @click="logout">Logout</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Profile from "./Profile";

export default {
  name: "connected-user",
  components: { Profile },
  data() {
    return {
      presenceRef: firebase.database().ref("presence")
    };
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    logout() {
      this.presenceRef.child(this.currentUser.uid).remove();
      firebase.auth().signOut();
      this.$store.dispatch("setUser", null);
      this.$router.push("/login");
    },
    modalLogout() {
      $("#logoutOpen").modal("show");
    },
    modalProfile() {
      $("#Profile").modal("show");
    }
  }
};
</script>

