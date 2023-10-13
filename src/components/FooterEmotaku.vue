<template>
    <footer>
      <aside>
        <marquee class="footerAuthor">coded by buhito with love🖤 2023-2023</marquee>
      </aside>
    </footer>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'FooterEmotaku',

  });
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>

footer {
    background-color: black;
    color: green;
    margin-bottom: 30px;
  }
 .footerAuthor {
  font-weight: bold;
  
  width: 50%;
  padding: 3px;
 }
  </style>
  