<template>
<div>
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
        <div class="ui divider"></div>
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
                                    <div class="ui black button deny">Cancel</div>
                                    <div class="ui red button deny" @click="logout">Logout</div>
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

<style scoped>
.connectedUser__container {
  position: absolute;
  background-color: #000000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 90px;
  padding: 8px;
  box-shadow: -4px 1px 8px 3px #000000;
}
.container {
  cursor: pointer;
}

#Profile {
  width: 24%;
}
</style>
