<template>
  <div class="main">
    <div class="page-title"> 
      <h3>Chat</h3>
    </div>
    <div class="tchat__container">
      <sidebar></sidebar>
      <messages></messages>
    </div>
  </div>
 </template>

 <script>

    import Sidebar from '../components/sidebar/Sidebar'
    import Messages from '../components/messages/Messages'

     export default {
         name: 'tchat',
         components: { Sidebar, Messages }
     }

 </script>
