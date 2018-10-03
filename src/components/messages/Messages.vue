<template>
  <div class="msg-sec">
    <div class="inner-con">
      <div class="messages__container">
        <div class="messages__content">
          <div class="fixed-top-header" @click="addChannelUsers(users)" >
            <h2 class="inverted center aligned header title">{{ channelName }}</h2>
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
              <div class="inline field">
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
          <div class="ui red button deny">Cancel</div>
          <div class="ui green button deny" @click="addUsersInChannel">Add User</div>
        </div>
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

</style>
