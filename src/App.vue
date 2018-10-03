<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {

    }
  }
}
</script>

<style>
  #app {height: 100%;}  
  .container {cursor: pointer;}  
  .connection__label {float: left !important; margin-right: 1px !important; margin-top: 5px;}
  .cus-users .content {margin-left: 20px; cursor: pointer;}
  .channel__count {float: right;}  
  .profilecss {width: 24%;}
  .image {max-height: 10%;}
  body {background: #f1f1f1;}

  .sidebar {position: fixed; display: flex; flex-flow: column nowrap; width: 250px; padding: 0px; top: 0; left: 0; bottom: 0; background-color: #232d31; padding-top: 90px;}
  .connectedUser__container {position: absolute; background-color: #232d31; top: 0; right: 0; bottom: 0; left: 0; height: 90px; padding: 8px; box-shadow: none;}
  .connected-user .item{display: flex; box-shadow: none; align-items: center;}
  .connected-user .extra{margin: 0px !important;}
  .connected-user .ui.items{padding-top: 14px;}
  .connected-user .ui.inverted.header {text-transform: capitalize;}
  .connected-user .ui.button{background-color: #fff;}
  .cus-channels .channels__list {max-height: 300px; overflow-y: auto;}
  .cus-channels .channels__container ul {margin: 0; padding: 0;}
  .cus-channels .channels__item {list-style: none; color: #a3a3a3; border-radius: 2px; padding-left: 30px; font-weight: bold; font-size: 14px; cursor: pointer; border-bottom: 1px solid #1e2629; padding: 12px 0px; margin: 0;}
  .cus-channels .channels__item span {margin: 0 0 0 20px; font-size: 14px; color: #a3a3a3; text-transform: capitalize; font-weight: normal;}
  .cus-channels .channel__count {float: right;}
  .cus-channels .channels__item:hover {color: #fff;}
  .cus-channels .add_channel {cursor: pointer; color: #fff;}
  .cus-channels .add_channel:hover {color: #4a6bc3;}
  .cus-channels h4.ui.header {margin: 0; padding: 10px 0px; background-color: #1b2225; text-transform: uppercase; font-weight: normal;}
  .cus-channels h4.ui.header i {display: inline-block; font-size: 16px; margin: -4px 0 0 4px; padding: 0;}
  .cus-channels h4.ui.header i:hover, .cus-channels h4.ui.header i:active, .cus-channels h4.ui.header i:focus {color: #fff;}
  .cus-channels .channels__item:last-child {border-bottom: none;}
  .scroll-sec{overflow-y: auto; max-height: 450px;}
  .cus-users .feed {cursor: pointer; border-bottom: 1px solid #1e2629; padding: 0; margin: 0;}
  .cus-users .feed:hover {color: #fff;}
  .cus-users .feed.is_active .content h5 {color: #fff;}
  .cus-users .feed .content {padding: 12px 0px !important;}
  .cus-users .feed .content h5 {margin: -3px 0 0 15px; font-size: 14px; color: #a3a3a3; float: left; text-transform: capitalize; font-weight: normal;}
  .cus-users .ui.inverted.header {border-bottom: 1px solid #1e2629; margin: 0; padding: 10px 0px; background-color: #1b2225; text-transform: uppercase; font-weight: normal;}
  .ui.modal {width: 30%;}
  #Profile .image.content .ui.card {width: 100%; box-shadow: none;}
  #Profile .image.content .ui.card .image {width: 200px; margin: 0 auto; padding-bottom: 25px; background-color: transparent;}
  #Profile .ui.card>.content, #Profile .ui.cards>.card>.content {box-shadow: none; padding: 0px;}
  #Profile .content {cursor: auto;}
  #Profile .meta {margin: 8px 0px;}
  #Profile .description {margin-bottom: 10px;}
  #Profile .content.email-add {padding-top: 10px !important;}
  #Profile .content.email-add a {color: rgba(0,0,0,.68);}
  #Profile .content.email-add a:hover, #Profile .content.email-add a:focus, #Profile .content.email-add a:active{color: rgba(0,0,0,1);}
  #Profile .meta span{color: rgba(0,0,0,.68);}
  #Profile .header.blue{border-top: none; border-left: none; border-right: none;}
  .tchat__container{height: 100%;}
  .comment__container pre {font-size: 0.9em; background: #232323;}
  .comment__self {padding-left: 8px;}
  .comment__image {min-height: 100px; margin-top: 16px;}
  .comment__date {color: #767676;}
  .messages__form.big {height: 350px;}
  .shortcut {color: white;}
  .msg-sec h2.title {text-transform: capitalize; background-color: #242d31; color: #fff; padding: 15px; font-size: 20px; font-weight: normal; border-radius: 6px 6px 0 0;}
  .cus-msg-box .ui.form .fields{display: inline-block; width: 100%; margin: 0;}
  .cus-msg-box .ui.form .two.fields>.field{width: 100%; display: inline-block; flex: auto; margin-bottom: 15px; padding: 0;}
  .cus-msg-box .ui.form .two.fields>.field:last-child {margin-bottom: 0;}
  .cus-msg-box{width:100%; display:inline-block;}
  .msg-sec {position: relative; padding: 10px 30px 10px 30px; margin-left: 250px;}
  .ui.comments .comment a.author {text-transform: capitalize;}
  .ui.comments .comment .avatar {margin: 0;}
  .scrollbar .ui.comments .comment {margin: 0; padding: 14px 15px 4px; border-bottom: 1px solid #e5e5e5; background-color: #fff;}
  .scrollbar .ui.comments .comment:nth-child(even){background-color: #f7f7f7;}
  .scrollbar .ui.segment {padding: 0;}
  .scrollbar .ui.comments {max-width: 100%;}
  .scrollbar .comment .metadata {float: right;}
  .ui.comments .comment a.author:hover, .ui.comments .comment a.author:active, .ui.comments .comment a.author:focus{color: rgba(0,0,0,1);}
  .scrollbar .ui.comments .comment .text {font-size: 14px; line-height: 20px;}
  .fixed-top-header {color: black; cursor: pointer;}
  .messages__container {width:100%; display:inline-block;}
  .messages__container .comments {font-size: 1.2em;}
  .list-enter-active {transition: all 0.3s;}
  .list-enter, .list-leave-to {opacity: 0; transform: translateX(30px);}
  .scrollbar {margin: 0px; float: left; max-height: 70vh; width: 100%; background: #f5f5f5; overflow-y: auto;}
  #style-1::-webkit-scrollbar-track {-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); border-radius: 10px; background-color: #f5f5f5;}
  #style-1::-webkit-scrollbar {width: 12px; background-color: #f5f5f5;}
  #style-1::-webkit-scrollbar-thumb {border-radius: 10px; -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); background-color: #555;}
  .ui.dropdown {max-width: 800px;}
  .scrollbar .ui.comments .comment:last-child {border-bottom: none;}
  .modal .content {margin: 0;}
  .inner-con {background: #fff; padding: 20px; border-radius: 4px; box-shadow: 0 0 15px #ccc; width: 70%; margin: 0 auto;}
  .field textarea:focus, .field input:focus, .field select:focus{border:1px solid #ccc !important;}
  .button.ui.cus-color {background-color: #3d955b; color: #fff; padding: .78571429em 30px;}
  .button.ui.cus-color:hover, .button.ui.cus-color:focus, .button.ui.cus-color:active{background-color: #2a8549; color:#fff;}
  .ui.modal .header {background-color: #242d31; color: #fff; font-weight: normal !important; border: 1px solid #242d31; margin-top: -1px;}
  .ui.modal>.close {cursor: pointer; position: absolute; top: 15px; right: 15px; z-index: 1; opacity: 1; font-size: 26px; color: #fff; width: 20px; height: 20px; padding: 0;}
  .ui.modal .description .header {background-color: transparent; color: transparent; font-weight: normal !important; border: none; margin-top: 0;}
  .ui.modal input, .ui.modal textarea{boder:1px solid rgba(34,36,38,.15);}
  .ui.selection.active.dropdown .menu {border-color: #ccc;}
  .ui.selection.active.dropdown {border-color: #ccc;}
  .button {font-weight: normal !important;}
  .cus-form-design .column {max-width: 500px; background: #fff; border-radius: 6px; box-shadow: 0 0 15px #ccc; margin-top: 100px; padding: 0px !important;}
  .cus-form-design h2.header {text-transform: capitalize; background-color: #252d31; color: #fff; padding: 15px; font-size: 18px; border-radius: 6px 6px 0 0; margin: 0; text-transform: uppercase; font-weight: normal;}
  .cus-form-design .ui.stacked.segment {border: none; box-shadow: none; padding: 25px;}
  .cus-form-design .ui.message {margin: 0px 0px 25px; padding: 0 25px; background-color: #fff; border: none; box-shadow: none;}
  .cus-form-design .ui.message .register-link {float: left;}
  .cus-form-design .ui.message .forgot-pass-link {float: right;}
  .cus-form-design .ui.message a {color: #252d31;}
  .cus-form-design .ui.stacked.segment::after, .cus-form-design .ui.stacked.segment::before, .cus-form-design .ui.stacked.segments::after, .cus-form-design .ui.stacked.segments::before{content:none;}
  .cus-form-design label {text-align: left;}

  /* Media Query Here */
  @media only screen and (max-width: 767px) {
    .ui.selection.dropdown .menu {max-height: 16.02857142rem;}
  }
  @media only screen and (min-width: 768px) {
    .ui.selection.dropdown .menu {max-height: 12.0214285763rem;}
  }
  @media only screen and (min-width: 992px) {
    .ui.selection.dropdown .menu {max-height: 16.02857143rem;}
  }
  @media only screen and (min-width: 1920px) {
    .ui.selection.dropdown .menu {max-height: 21.37142857rem;}
  }
  @media (max-width:1280px){
    .ui.modal {width: 45%;}
    .inner-con {width:80%;}
  }
  @media (max-width:767px){
    .ui.modal {width: 70%;}
    .inner-con {width:100%;}
  }
  @media (max-width:600px){
    .cus-form-design .column {max-width: 88%;}
    .cus-form-design h2.header{font-size:14px;}
  }
  @media (max-width:480px){
    .ui.modal {width: 90%;}
  }
</style>


