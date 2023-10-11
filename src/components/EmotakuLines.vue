<template>
  <div class="lines"></div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EmotakuLines',
  props: {
    msg: String,
  },
});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.lines {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: -1;
  opacity: 0.28;
}

.lines::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background: linear-xgradient(to bottom, transparent 50%, rgba(0, 0, 0, .5) 51%);
  background-size: 100% 4px;
  will-change: background, background-size;
  animation: scanlines 0.2s linear infinite;
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
  