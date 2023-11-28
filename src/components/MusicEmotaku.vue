<template>
  <div class="musicPlayer">
    <h1><router-link class="linkMusicPlayer" @click="scrollView('#viewSelectedScroll')"
        :to="{ name: 'MusicPlayer' }">Music Player 🎵</router-link></h1>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import scrollView from '@/assets/scripts/scrollView';
export default defineComponent({

  name: 'MusicEmotaku',
  setup() {

    return { scrollView };
  }
});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.musicPlayer {
  border-radius: 4px;
}

.musicPlayer:hover {
  background-color: rgb(17, 17, 17);
  cursor: pointer;
}

.linkMusicPlayer {
  animation: 4s rainbowEffect linear infinite;
  display: block;
  text-decoration: none;
  width: 100%;
}

@keyframes rainbowEffect {
  0% {
    color: rgb(204, 101, 242);
  }

  25% {
    color: rgb(79, 143, 183);
  }

  50% {
    color: rgb(229, 223, 99);
  }

  75% {
    color: rgb(113, 144, 23);
  }

  80% {
    color: rgb(65, 187, 208);
  }

  100% {
    color: rgb(204, 101, 242);
  }
}
</style>
