<template>
  <div class="stickersSlidingContainer">
    <marquee behavior="alternate" direction="both"
    onmouseover="stop()"
    onmouseout="start()">
      <div class="stickersSlidingContent">
        <div v-for="media in emoMedia" :key="media.url">
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
import { defineComponent, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import specificAssetsSearch from '@/assets/scripts/specificAssetsSearch';
import { useUserConfig } from '@/stores/userConfigStates';

export default defineComponent({
  name: 'StickersSliding',
  setup() {

    const userConfigStore = useUserConfig();
    let emoImages = ref<any>([]);
    const emoMedia = ref<any>([]);

    const changeStickers = () => {
      if (userConfigStore.emoStyler) {
        emoImages = [...specificAssetsSearch('emoStickers')];
      } else {
        emoImages = [...specificAssetsSearch('otakuStickers')];
      }
      emoMedia.value = emoImages.map((media: any) => {
        const fileExtension = media.toLowerCase().split('.').pop();
        const isVideo =  ['mp4', 'webm'].includes(fileExtension);
        const isImage = ['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(fileExtension);

        return { type: isVideo ? 'video' : isImage ? 'image' : 'unknown', url: media };
      });

    }
    onMounted(() => {
      changeStickers();
    });

    onBeforeUnmount(() => { });

    watch(() => userConfigStore.emoStyler, () => {
      changeStickers();
    });

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
