<template>
<div>
    <div class="messages__form">
        <div class="ui inverted form">

            <div class="two fields">

                <div class="field">
                    <textarea name="message" id="message" v-model.trim="message" rows="3" placeholder="Message"></textarea>
                </div>

                <div class="field">
                    <button class="ui green button" @click.prevent="sendMessage">Send</button>
                    <button class="ui labeled icon button" @click.prevent="openFileModal"  :class="{ 'disabled' : uploadState == 'uploading' }"><i class="cloud upload icon"></i>Add media and files</button>
                </div>

            </div>

        </div>
        
         <!-- Progress Bar Upload File -->
        <div class="ui small indicating progress" v-if="progressStatus" data-value="10" data-total="100" id="uploadedFile">

            <div class="bar">
                <div class="progress"></div>
            </div>
            <div class="label">{{ uploadLabel }}</div>

        </div>
        <file-modal></file-modal>
    </div>
</div>
</template>


<script>
import { mapGetters } from "vuex";
import FileModal from "./FileModal";
import uuid from "uuid";

export default {
  name: "message-form",
  components: { FileModal },
  data() {
    return {
      message: "",
      errors: [],
      storageRef: firebase.storage().ref(),
      uploadTask: null,
      uploadState: null,
      progressStatus: false
    };
  },
  computed: {
    ...mapGetters(["currentChannel", "currentUser", "isPrivate"]),
    uploadLabel() {
      switch (this.uploadState) {
        case "uploading":
          return "file is uploading...";
          break;
        case "error":
          return "Something wrong in file...";
          break;
        case "done":
          return "File successfully uploaded...";
          break;
        default:
          return "";
      }
    }
  },
  methods: {
    sendMessage() {
      if (this.currentChannel !== null) {
        if (this.message.length > 0) {
          //message
          this.$parent
            .getMessageRef()
            .child(this.currentChannel.id)
            .push()
            .set(this.createMessage())
            .then(() => {})
            .catch(error => {
              this.errors.push(error.message);
            });

          this.message = "";
        }
      }
    },
    createMessage(fileUrl = null) {
      let message = {
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: {
          name: this.currentUser.displayName,
          avatar: this.currentUser.photoURL,
          id: this.currentUser.uid
        }
      };
      if (fileUrl == null) {
        message["content"] = this.message;
      } else {
        message["image"] = fileUrl;
      }
      return message;
    },
    uploadFile(file, metadata) {
      if (file === null) return false;
      this.progressStatus = true;

      let pathToUpload = this.currentChannel.id;
      let ref = this.$parent.getMessageRef();
      let filePath = this.getPath() + "/" + uuid() + ".jpg";

      this.uploadTask = this.storageRef.child(filePath).put(file, metadata);
      this.uploadState = "uploading";

      this.uploadTask.on(
        "state_changed",
        snap => {
          let percent = snap.bytesTransferred / snap.totalBytes * 100;
          $("#uploadedFile").progress("set percent", percent);
        },
        error => {
          this.errors.push(error.message);
          this.uploadState = "error";
          this.uploadTask = null;
        },
        () => {
          this.uploadState = "done";
          //this.$refs.file_model.resetForm();
          let fileUrl = this.uploadTask.snapshot.downloadURL;
          this.sendFileMessage(fileUrl, ref, pathToUpload);
          this.progressStatus = false;
        }
      );
    },
    sendFileMessage(fileUrl, ref, pathToUpload) {
      ref
        .child(pathToUpload)
        .push()
        .set(this.createMessage(fileUrl))
        .then(() => {})
        .catch(error => {
          this.errors.push(error.message);
        });
    },
    openFileModal() {
      $("#fileModal").modal("show");
    },
    getPath() {
      if (this.isPrivate) {
        return "tchat/private/" + this.currentChannel.id;
      } else {
        return "tchat/public";
      }
    }
  },
  beforeDestroy() {
    if (this.uploadTask !== null) {
      this.uploadTask.cancel();
      this.uploadTask = null;
    }
  }
};
</script>

<style scoped>
.messages__form {
  position: fixed;
  bottom: 0;
  background-color: #fff;
  padding: 10px;
  padding-top: 20px;
  left: 300px;
  right: 0;
}
.messages__form.big {
  height: 350px;
}
.shortcut {
  color: white;
}
</style>
