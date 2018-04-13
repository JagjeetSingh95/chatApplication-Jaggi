<template>
<div class="profilecss">
   <div class="ui modal" id="Profile">
        <i class="close icon"></i>
        <div class="header blue">
             Profile
        </div>
        <div class="image content">
            <div class="description">
                
                 <div class="ui card">
                    <div class="image">
                        <img :src="currentUser.photoURL" alt="avatar">
                    </div>
                <div class="content">
                    <a class="header"> {{ currentUser.displayName }}</a>
                    <div class="meta">
                    <span class="date">Joined in 2013</span>
                    </div>
                    <div class="description">
                        <span class="date">Joined in 2013</span>

                    </div>
                </div>
                <div class="extra content">
                    <a>
                    <i class="user icon"></i>
                        {{ currentUser.email }}
                    </a>
                </div>
            </div>
            </div>
        </div>
        <div class="actions">
             <div class="ui black button deny">Cancel</div>
              <div class="ui red button deny">Ok</div>
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
      presenceRef: firebase.database().ref("presence")
    };
  },
  computed: {
    ...mapGetters(["currentUser"])
  }
};
</script>

<style scoped>
#Profile {
  width: 25%;
}
.profilecss {
  width: 24%;
}
.image {
  max-height: 10%;
}
</style>

