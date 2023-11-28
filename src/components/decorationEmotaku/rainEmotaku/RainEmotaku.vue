<template>
  <div v-if="userConfigStore.checkRainEffect" class="rainEmotaku">
    <div class="rainContent"></div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { useUserConfig } from '@/stores/userConfigStates';
export default defineComponent({
  name: 'RainEmotaku',
  setup() {
    const userConfigStore = useUserConfig();

    return {
      userConfigStore
    }
  }
});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rainEmotaku {
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  width: 100vw;
  z-index: -1;
}

.rainContent {
  background-image: url(../../../assets/images/rain/rainEmotakuEffect.gif);
  background-size: cover;
  filter: hue-rotate(100deg);
  height: 100%;
  opacity: 0.17;
  width: 100%;
}
</style>
  