<template>
  <div class="88x31ButtonsContainer">
    <marquee behavior="alternate" direction="left" id="marqueeLeft"
    onmouseover="stop()"
    onmouseout="start()">
      <div class="buttonsStickerContent">
        <div v-for="media in emoMediaLeft" :key="media.url">
          <template v-if="media.type === 'image'">
            <img class="imagesStickers" :src="media.url" alt="" />
          </template>
          <template v-else>
            <video class="videoStickers" autoplay loop muted playsinline>
              <source :src="media.url" type="video/webm" />
            </video>
          </template>
        </div>
      </div>
    </marquee>
    <marquee behavior="alternate" direction="right" id="marqueeRight"
    onmouseover="stop()"
    onmouseout="start()">
      <div class="buttonsStickerContent">
        <div v-for="media in emoMediaRight" :key="media.url">
          <template v-if="media.type === 'image'">
            <img class="imagesStickers" :src="media.url" alt="" />
          </template>
          <template v-else>
            <video class="videoStickers" autoplay loop muted playsinline>
              <source :src="media.url" type="video/webm" />
            </video>
          </template>
        </div>
      </div>
    </marquee>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import specificAssetsSearch from '@/assets/scripts/specificAssetsSearch';

export default defineComponent({
  name: 'ButtonsStickers',
  setup() {
    const emoMediaLeft = ref<any>([]);
    const emoMediaRight = ref<any>([]);

    const buttonsLeft = specificAssetsSearch('buttonsLeft');
    const buttonsRight = specificAssetsSearch('buttonsRight');

    onMounted(() => {


      emoMediaLeft.value = buttonsLeft.map((media:any) => {
        const fileExtension = media.toLowerCase().split('.').pop();
        const isVideo = ['mp4', 'webm'].includes(fileExtension);
        const isImage = ['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(fileExtension);

        return { type: isVideo ? 'video' : isImage ? 'image' : 'unknown', url: media };
      });

      emoMediaRight.value = buttonsRight.map((media) => {
        const fileExtension = media.toLowerCase().split('.').pop();
        const isVideo = fileExtension !== undefined && ['mp4', 'webm'].includes(fileExtension);
        const isImage = fileExtension !== undefined && ['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(fileExtension);

        return { type: isVideo ? 'video' : isImage ? 'image' : 'unknown', url: media };
      });

    });

    onBeforeUnmount(() => { });

    return {
      emoMediaLeft, emoMediaRight, buttonsLeft, buttonsRight
    };
  },
});
</script>

<style scoped>
/* Estilos para imágenes */

/* Estilos para videos */
.videoStickers {
  border: 2px solid rgb(7, 27, 53);
  height: 100%;
}

.videoStickers:hover {
  cursor: pointer;
  transform: scale(1.2);
}


.stickersSlidingContainer {
  align-items: center;
  display: flex;
  height: auto;
}

.buttonsStickerContent {
  display: flex;
  flex-direction: row;
  max-height: 38px;
}

.imagesStickers {
  border: 2px solid rgb(7, 27, 53);
  display: block;
  margin: 0 auto;
  height: 100%;
}

.imagesStickers:hover {
  cursor: pointer;
  filter: blur(1.2);
  transform: scale(1.2);
}
</style>
