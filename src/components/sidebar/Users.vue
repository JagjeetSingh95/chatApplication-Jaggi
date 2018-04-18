<template>
<div>
    <div class="users__container">
        <h4 class="ui inverted center aligned header">Users</h4>
        <div class="ui feed" v-for="user in users" :key="user.uid" :class="{'is_active' : isActive(user)}" @click.prevent="changeChannel(user)">
            <div class="event">
                <div class="content">
                    <span class="ui empty circular label connection__label" :class="{'green': isOnline(user), '': !isOnline(user)}"></span>&nbsp;  {{ user.name }}
                    <div class="ui white label channel__count" v-if="getNotification(user) >= 1">{{ getNotification(user) }}</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import mixin from "../mixins";

export default {
  name: "users",
  data() {
    return {
      users: [],
      usersRef: firebase.database().ref("users"),
      connectedRef: firebase.database().ref(".info/connected"),
      presenceRef: firebase.database().ref("presence"),
      privateMessagesRef: firebase.database().ref("privateMessages"),
      notifCount: [],
      channel: null
    };
  },
  mixins: [mixin],
  computed: {
    ...mapGetters(["currentUser", "currentChannel", "isPrivate"])
  },
  watch: {
    isPrivate() {
      if (!this.isPrivate) {
        this.resetNotifications();
      }
    }
  },
  mounted() {
    this.addListeners();
  },
  methods: {
    addListeners() {
      this.usersRef.on("child_added", snap => {
        if (this.currentUser.uid !== snap.key) {
          let user = snap.val();
          user["uid"] = snap.key;
          user["status"] = "offline";
          this.users.push(user);
        }
      });

      this.presenceRef.on("child_added", snap => {
        if (this.currentUser.uid !== snap.key) {
          this.addStatusToUser(snap.key);
          let channelId = this.getChannelId(snap.key);

          this.privateMessagesRef.child(channelId).on("value", snap => {
            this.handleNotifications(
              channelId,
              this.currentChannel.id,
              this.notifCount,
              snap
            );
          });
        }
      });

      this.presenceRef.on("child_removed", snap => {
        if (this.currentUser.uid !== snap.key) {
          this.addStatusToUser(snap.key, false);

          this.privateMessagesRef.child(this.getChannelId(snap.key)).off();
        }
      });

      this.connectedRef.on("value", snap => {
        if (snap.val() === true) {
          let ref = this.presenceRef.child(this.currentUser.uid);
          ref.set(true);
          ref.onDisconnect().remove(err => {
            if (err !== null) console.log(err);
          });
        }
      });
    },
    addStatusToUser(userId, connected = true) {
      let index = this.users.findIndex(user => user.uid === userId);
      if (index !== -1) {
        connected === true
          ? (this.users[index].status = "online")
          : (this.users[index].status = "offline");
      }
    },
    isOnline(user) {
      return user.status == "online";
    },
    changeChannel(user) {
      if (this.channel === null) {
        this.resetNotifications(user);
      } else {
        this.resetNotifications();
      }

      let channelId = this.getChannelId(user.uid);
      let channel = { id: channelId, name: user.name };

      this.channel = channel;
      this.$store.dispatch("setPrivate", true);
      this.$store.dispatch("setCurrentChannel", channel);
    },
    isActive(user) {
      let channelId = this.getChannelId(user.uid);
      return this.currentChannel.id === channelId;
    },
    getChannelId(userId) {
      return userId < this.currentUser.uid
        ? userId + "/" + this.currentUser.uid
        : this.currentUser.uid + "/" + userId;
    },
    getNotification(user) {
      let channelId = this.getChannelId(user.uid);
      let notif = 0;

      this.notifCount.forEach(el => {
        if (el.id === channelId) {
          notif = el.notif;
        }
      });
      return notif;
    },
    resetNotifications(user = null) {
      let channelId = null;
      if (user !== null) {
        channelId = this.getChannelId(user.uid);
      } else {
        channelId = this.channel.id;
      }

      let index = this.notifCount.findIndex(el => el.id === channelId);
      if (index !== -1) {
        this.notifCount[index].total = this.notifCount[index].lastKnownTotal;
        this.notifCount[index].notif = 0;
      }
    },
    detachListeners() {
      this.usersRef.off();
      this.presenceRef.off();
      this.connectedRef.off();
    }
  },
  beforeDestroy() {
    this.detachListeners();
  }
};
</script>

<style scoped>
.users__container {
  overflow-y: auto;
  color: #a3a3a3;
}
.users__container .feed {
  cursor: pointer;
}
.users__container .feed:hover {
  color: #fff;
}
.users__container .feed.is_active {
  color: #fff;
}
.connection__label {
  float: left !important;
  margin-right: 1px !important;
  margin-top: 5px;
}
.content {
  margin-left: 20px;
  cursor: pointer;
}
.channel__count {
  float: right;
}
</style>
