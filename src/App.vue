<template>
  <BackgroundDayNightEmotaku></BackgroundDayNightEmotaku>
  <EmotakuLines></EmotakuLines>
  <BannerEmotaku></BannerEmotaku>
  <MainEmotaku></MainEmotaku>
  <FooterEmotaku></FooterEmotaku>
</template>



<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import BackgroundDayNightEmotaku from '@/components/BackgroundDayNightEmotaku.vue';
import EmotakuLines from '@/components/EmotakuLines.vue';
import BannerEmotaku from '@/components/BannerEmotaku.vue';
import MainEmotaku from '@/components/MainEmotaku.vue';
import FooterEmotaku from '@/components/FooterEmotaku.vue';
export default defineComponent({

  components: {
    BackgroundDayNightEmotaku,
    EmotakuLines,
    BannerEmotaku,
    MainEmotaku,
    FooterEmotaku

  }
});
</script>


<style>
</style>
