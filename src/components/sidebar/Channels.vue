<template>
<div>
    <div class="channels__container">
        <h4 class="ui inverted center aligned header">Channels <i class="plus icon add_channel" @click="openChannelModal"></i></h4>

        <div class="raised padded segment channels__list">
            <ul>
                <li class="channels__item"
                    v-for="channel in channels"
                    :key="channel.id"
                    :class="{'is_active': setChannelActive(channel)}"
                    @click="changeChannel(channel)">
                    # {{ channel.name }}
               </li>
            </ul>
        </div>


        <!-- Modal Pour ajouter un Channel -->

        <div class="ui basic modal" id="channelModal">
            <div class="ui icon header">
                Create a new Channel
            </div>

            <div class="content">
                <div class="ui inverted form" :class="{'error': hasErrors }">
                    <div class="field">
                        <label for="new_channel">Channel Name</label>
                        <input type="text" name="new_channel" v-model="new_channel" id="new_channel">
                    </div>

                    <div class="ui error message" v-if="hasErrors">
                        <p v-for="error in errors">{{ error }}</p>
                    </div>
                </div>
            </div>

            <div class="actions">
                <div class="ui red basic cancel inverted button">
                    <i class="remove icon"></i>Cancel
                </div>
                <div class="ui green inverted button" @click="addChannel">
                    <i class="checkmark icon"></i>Add Channel
                </div>
            </div>


        </div>

    </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "channels",
  data() {
    return {
      channels: [],
      new_channel: "",
      channelsRef: firebase.database().ref("channels"),
      errors: [],
      firstLoad: true
    };
  },
  computed: {
    ...mapGetters(["currentChannel"]),
    hasErrors() {
      return this.errors.length > 0;
    }
  },
  mounted() {
    this.addListeners();
  },
  methods: {
    addListeners() {
      this.channelsRef.on("child_added", snap => {
        this.channels.push(snap.val());

        if (this.firstLoad && this.channels.length > 0) {
          this.$store.dispatch("setCurrentChannel", this.channels[0]);
        }
        this.firsLoad = false;
      });
    },
    openChannelModal() {
      $("#channelModal").modal("show");
    },
    addChannel() {
      this.errors = [];
      let key = this.channelsRef.push().key;

      let newChannel = { id: key, name: this.new_channel };
      this.channelsRef
        .child(key)
        .update(newChannel)
        .then(() => {
          this.new_channel = "";
          $("#channelModal").modal("hide");
        })
        .catch(error => {
          this.errors.push(error.message);
        });
    },
    changeChannel(channel) {
      this.$store.dispatch("setPrivate", false);
      this.$store.dispatch("setCurrentChannel", channel);
    },
    detachListeners() {
      this.channelsRef.off();
    },
    setChannelActive(channel) {
      return channel.id === this.currentChannel.id;
    }
  },
  beforeDestroy() {
    this.detachListeners();
  }
};
</script>

<style scoped>
.channels__list {
  min-height: 100px;
  max-height: 300px !important;
  overflow-y: auto !important;
}
.channels__container ul {
  margin: 0;
  padding: 0;
}
.channels__item {
  height: 25px;
  margin: 2px;
  list-style: none;
  color: #a3a3a3;
  cursor: pointer;
  line-height: 10px;
  border-radius: 2px;
  padding-left: 30px;
  font-weight: bold;
  font-size: 1.1em;
}
.channel__count {
  float: right;
}
.is_active {
  color: #fff;
}
.channels__item:hover {
  color: #fff;
}
.add_channel {
  cursor: pointer;
  color: #fff;
}
.add_channel:hover {
  color: #4a6bc3;
}
</style>
