<template>
  <div class="lines"></div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EmotakuLines',

});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lines {
  height: 100vh;
  left: 0;
  opacity: 0.28;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: -1;
}

.lines::before {
  animation: scanlines 0.2s linear infinite;
  background: linear-xgradient(to bottom, transparent 50%, rgba(0, 0, 0, .5) 51%);
  background-size: 100% 4px;
  bottom: 0;
  content: '';
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  will-change: background, background-size;
}

@keyframes scanlines {
  0% {
    background: linear-gradient(to bottom, transparent 10%, rgba(0, 0, 0, .5) 51%);
    background-size: 100% 4px;
  }

  100% {
    background: linear-gradient(to bottom, rgba(0, 0, 0, .5) 50%, transparent 51%);
    background-size: 100% 4px;
  }
}
</style>
  