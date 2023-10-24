<template>
  <div class="stickersSlidingContainer">
    <marquee behavior="alternate" direction="both">
      <div class="stickersSlidingContent">
        <div v-for="imageStickers in emoFilesStickers" :key="imageStickers">
          <img class="imagesStickers" :src="getAssetUrl(imageStickers)" alt="" />
        </div>
      </div>
    </marquee>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { emoFilesStickers } from '@/assets/images/emotakuStickersGifs/emo/emoFiles';
import useAssets from '@/assets/scripts/composable';

export default defineComponent({
  name: 'StickersSliding',
  setup() {
    const stickerChose = ref('');

    onMounted(() => {});

    onBeforeUnmount(() => {});

    return {
      stickerChose,
      emoFilesStickers,
      getAssetUrl: useAssets, // Usar la función useAssets como getAssetUrl
    };
  },
});
</script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.stickersSlidingContainer {
  height: auto;
  display: flex;
  align-items: center;
}
.stickersSlidingContent {
  display: flex;
  flex-direction: row;
}
.imagesStickers {
  border: 2px solid rgb(7, 27, 53);
  width: 200px;
  height: 70px;
  display: block;
  margin: 0 auto;
  object-fit: cover;
  object-position: center -30px; /* Ajusta la posición vertical en píxeles */
}

.imagesStickers:hover {
  transform: scale(1.2);
  filter: hue-rotate(230deg);
  cursor: pointer;
}

</style>
