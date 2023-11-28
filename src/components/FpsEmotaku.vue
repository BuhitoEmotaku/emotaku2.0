<template>
  <span class="fpsEmotaku">{{ fpsEmotaku }}Hz</span>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { ref, onMounted } from 'vue';
export default defineComponent({
  name: 'FpsEmotaku',
  setup() {

    //FUNCTION TO CALCULATE FPS SCREEN
    const fpsEmotaku = ref();
    const fpsMeter = () => {
      let prevTime = Date.now(),
        frames = 0;

      requestAnimationFrame(function loop() {
        const time = Date.now();
        frames++;
        if (time > prevTime + 1000) {
          let fps = Math.round((frames * 1000) / (time - prevTime));
          prevTime = time;
          frames = 0;
          fpsEmotaku.value = fps;
        }

        requestAnimationFrame(loop);
      });
    }

    //ON-MOUNTED
    onMounted(() => {
      fpsMeter();
    });

    return { fpsEmotaku };
  }
});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fpsEmotaku {
  background-color: green;
  border: 2px solid white;
  border-radius: 6px;
  bottom: 7px;
  color: rgb(0, 0, 0);
  left: 7px;
  padding: 2px;
  position: fixed;
}

@media (max-width: 900px) {
  .fpsEmotaku {
    background-color: #a8009d;
  }
}
</style>
  