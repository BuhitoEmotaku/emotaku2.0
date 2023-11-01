<template>
  <div v-if="counterStore.checkRainEffect" class="rainEmotaku">
<div class="rainContent"></div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { useCounterStore } from '@/stores/userOutOfPage';
export default defineComponent({
  name: 'RainEmotaku',
  setup(){
    const counterStore = useCounterStore(); 
    
    return {
      counterStore
    }
  }
});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>.rainEmotaku {
  width: 100vw;
  height: 100%;
  position: fixed;
  left: 0;
  z-index: -1;
}

.rainContent {
  width: 100%;
  height: 100%;
  background-image: url(../../../assets/images/rain/rainEmotakuEffect.gif);
  background-size: cover;
  opacity: 0.07;
  filter: hue-rotate(100deg);
}
</style>
  