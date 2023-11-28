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
  color: green;
  margin-bottom: 30px;
}

.footerAuthor {
  font-weight: bold;
  padding: 3px;
  width: 50%;
}

@media (max-width: 1110px) {
  footer {
    margin: 0 auto;
    margin-bottom: 30px;
    width: 95%;
  }
}
</style>
  