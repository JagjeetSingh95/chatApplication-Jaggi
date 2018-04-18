<template>
<div>
     <div class="messages__container">
        <div class="messages__content">
              <div class="fixed-top-header" @click="addChannelUsers(users)" >
                <h2 class="inverted center aligned header">{{ channelName }}</h2>
              </div>
              <div class="scrollbar" v-if="messages.length > 0" id="style-1">
                    <div class="ui segment"> 
                        <div class="ui comments">
                            <!-- Composant single message-->
                            <transition-group  tag="div" name="list">
                                <single-message :message="message" v-for="message in messages" :key="message.id"></single-message>
                            </transition-group>
                        </div>
                    </div>
              </div>
        </div>
      

    </div>
    <message-form></message-form>
    <div class="ui modal" id="channelusersadd">
  <i class="close icon"></i>
  <div class="header">
    Users List
  </div>
  <div class="image content">

    <div class="description">
<div class="ui form">

  <div class="inline field" >
    <label>Select Users</label>

    <select v-model="addChannelUser" v-bind="users" multiple="" class="label ui selection fluid dropdown">
      <option value="">All</option>
      <option v-for="user in users" :value="user.uid">{{user.name}}</option>

    </select>

   
  </div>
  
  
  
   
   
</div>
  <br><br>
  

  <div class="ui button">
    Clear Filters
  </div>

        
    </div>

  </div>
  <div class="actions">
    <div class="ui button deny">Cancel</div>
    <div class="ui button deny" @click="addUsersInChannel">Add User</div>
  </div>
</div>
</div>
</template>

<script>
import MessageForm from "./MessageForm";
import SingleMessage from "./SingleMessage";
import { mapGetters } from "vuex";
import _ from "lodash";
import Multiselect from "vue-multiselect";

export default {
  name: "messages",
  components: { MessageForm, SingleMessage, Multiselect },
  data() {
    return {
      selected: null,
      messagesRef: firebase.database().ref("messages"),
      privateMessagesRef: firebase.database().ref("privateMessages"),
      messages: [],
      channel: null,
      listeners: [],
      users: [],
      usersRef: firebase.database().ref("users"),
      channelRef: firebase.database().ref("channels"),
      addChannelUser: []
    };
  },
  computed: {
    ...mapGetters(["currentChannel", "currentUser", "isPrivate"]),
    channelName() {
      if (this.channel !== null) {
        return this.isPrivate
          ? "@ " + this.channel.name
          : "# " + this.channel.name;
      }
    }
  },
  watch: {
    isPrivate() {
      if (!this.isPrivate) {
        this.resetNotifications();
      }
    },
    currentChannel() {
      this.detachListeners();
      this.addListeners();
      this.channel = this.currentChannel;
    }
  },
  methods: {
    addChannelUsers(users) {
      if (!this.isPrivate) {
        this.usersRef.on("child_added", snap => {
          if (this.currentUser.uid !== snap.key) {
            let user = snap.val();
            user["uid"] = snap.key;

            $(".label.ui.dropdown").dropdown();

            $(".no.label.ui.dropdown").dropdown({
              useLabels: false
            });

            $(".ui.button").on("click", function() {
              $(".ui.dropdown").dropdown("restore defaults");
            });

            let users = [];

            for (let prop in snap.val()) {
              users = [...users, snap.val()[prop]];
            }
            console.log(users);

            if (
              this.users[0] != user[0] &&
              this.users[1] != user[1] &&
              this.users[2] != user[2]
            ) {
            } else {
              this.users.push(user);
            }
          }
        });
        $("#channelusersadd").modal("show");
      } else {
        console.log("isPrivate");
      }
    },

    addUsersInChannel() {
      let key = this.currentChannel.id;

      const pushArr = this.addChannelUser.map(user => {
        return this.channelRef.child(key + "/users/").push(user);
      });

      Promise.all(pushArr).then(values => console.log("Append"));
    },

    addListeners() {
      let ref = this.getMessageRef();
      ref.child(this.currentChannel.id).on("child_added", snap => {
        let message = snap.val();
        message["id"] = snap.key;
        this.messages.push(message);
        this.$nextTick(() => {
          var contrainer = document.querySelector(".scrollbar");
          var scrollHeight = contrainer.scrollHeight;
          contrainer.scrollTop = scrollHeight;
          //$(".scrollbar").scrollTop($(document).height());
        });
      });
      this.addToListeners(this.currentChannel.id, ref, "child_added");
    },
    scrollToEnd() {
      var contrainer = document.querySelector(".scrollbar");
      var scrollHeight = contrainer.scrollHeight;
      contrainer.scrollTop = scrollHeight;
    },
    addToListeners(id, ref, event) {
      let index = this.listeners.findIndex(el => {
        return el.id === id && el.ref === ref && el.event === event;
      });
      if (index === -1) {
        this.listeners.push({ id: id, ref: ref, event: event });
      }
    },
    detachListeners() {
      this.listeners.forEach(listener => {
        listener.ref.child(listener.id).off(listener.event);
      });
      this.listeners = [];
      this.messages = [];
    },
    getMessageRef() {
      if (this.isPrivate) {
        return this.privateMessagesRef;
      } else {
        return this.messagesRef;
      }
    }
  },
  beforeDestroy() {
    this.detachListeners();
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.fixed-top-header {
  color: black;
  cursor: pointer;
}
.messages__container {
  position: relative;
  background-color: #fff;
  padding: 10px 30px 210px 30px;
  margin-left: 250px;
}
.messages__container .comments {
  font-size: 1.2em;
}
.list-enter-active {
  transition: all 0.3s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.scrollbar {
  margin-left: 30px;
  float: left;
  max-height: 450px;
  width: 90%;
  margin-top: 2%;
  background: #f5f5f5;
  overflow-y: scroll;
  margin-bottom: 25px;
  border-style: groove;
}
#style-1::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

#style-1::-webkit-scrollbar {
  width: 12px;
  background-color: #f5f5f5;
}

#style-1::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}

.ui.dropdown {
  max-width: 800px;
}

@media only screen and (max-width: 767px) {
  .ui.selection.dropdown .menu {
    /*      max-height: 8.01428571rem; /* + 1.335714285 to 9.349999995rem */
    /*      max-height: 9.349999995rem; /* Adds a half */
    max-height: 16.02857142rem; /* Double size */
  }
}
@media only screen and (min-width: 768px) {
  .ui.selection.dropdown .menu {
    /*         max-height: 10.68571429rem; /* + 1.3357142863 to 12.0214285763rem */
    max-height: 12.0214285763rem;
  }
}
@media only screen and (min-width: 992px) {
  .ui.selection.dropdown .menu {
    max-height: 16.02857143rem; /* + 1.3357142858 to 17.3642857158rem */
  }
}
@media only screen and (min-width: 1920px) {
  .ui.selection.dropdown .menu {
    max-height: 21.37142857rem; /* + 1.3357142856 to 22.7071428556rem */
  }
}
</style>
