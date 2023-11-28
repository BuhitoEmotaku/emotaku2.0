<template>
  <div v-if="!isMobile" class="emotakuDesktop">
    <EmotakuDesktop/>
  </div>
  <div v-else class="emotakuMobile">
    <EmotakuMobile/>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, watchEffect, ref } from 'vue';
import EmotakuDesktop from '@/components/EmotakuDesktop.vue';
import EmotakuMobile from '@/components/EmotakuMobile.vue';


export default defineComponent({
  name: 'MainEmotaku',
  components: {
    EmotakuDesktop,
    EmotakuMobile
  },
  setup() {
    const isMobile = ref(false);

    const checkIsMobile = () => {
      isMobile.value = window.innerWidth <= 1110;
    };

    watchEffect(() => {
      checkIsMobile();
    });

    window.addEventListener('resize', checkIsMobile);
    return {
      isMobile,
    };
  },
});
</script>
  
<style scoped>

</style>
  