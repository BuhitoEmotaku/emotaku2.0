<template>
  <div class="stickersSlidingContainer">
    <marquee behavior="alternate" direction="both">
      <div class="stickersSlidingContent">
        <div v-for="media in emoMedia" :key="media.url">
          <template v-if="media.type === 'image'">
            <img class="imagesStickers" :src="media.url" alt="" />
          </template>
          <template v-else>
            <video class="videoStickers" autoplay loop muted playsinline>
              <source :src="media.url" type="video/webm"/>
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
  name: 'StickersSliding',
  setup() {
    const emoMedia = ref<any>([]);

    onMounted(() => {
      const emoImages = specificAssetsSearch('emoStickers');
      emoMedia.value = emoImages.map((media) => {
        const fileExtension = media.toLowerCase().split('.').pop();
        const isVideo = fileExtension !== undefined && ['mp4', 'webm'].includes(fileExtension);
        const isImage = fileExtension !== undefined && ['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(fileExtension);

        return { type: isVideo ? 'video' : isImage ? 'image' : 'unknown', url: media };
      });
    });

    onBeforeUnmount(() => { });

    return {
      emoMedia,
    };
  },
});
</script>

<style scoped>
/* Estilos para imágenes */

/* Estilos para videos */
.videoStickers {
  border: 2px solid rgb(7, 27, 53);
  margin: 0 auto;
  width: 200px;
  object-fit: cover;
  object-position: center -30px;
}

.videoStickers:hover {
  cursor: pointer;
  filter: hue-rotate(230deg);
  transform: scale(1.2);
}


.stickersSlidingContainer {
  align-items: center;
  display: flex;
  height: auto;
}

.stickersSlidingContent {
  display: flex;
  flex-direction: row;
  height: 70px;
}

.imagesStickers {
  border: 2px solid rgb(7, 27, 53);
  display: block;
  height: 70px;
  margin: 0 auto;
  object-fit: cover;
  object-position: center -30px;
  width: 200px;
}

.imagesStickers:hover {
  cursor: pointer;
  filter: hue-rotate(230deg);
  transform: scale(1.2);
}
</style>
