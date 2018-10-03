<template>
  <div class="sidebar">
    <connected-user></connected-user>
    <channels></channels>
    <users></users>
  </div>
</template>

<script>

    import ConnectedUser from './ConnectedUser'
    import Channels from './Channels'
    import Users from './Users'

    export default {
        name: 'sidebar',
        components: { ConnectedUser, Channels, Users }
    }
</script>

