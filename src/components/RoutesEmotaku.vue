<template>
  <div>
    <nav class="principalViews">
      <router-link to="/" @click="scrollView('#viewSelectedScroll')"><b @mouseover="hoverAudio()">INICIO</b></router-link>
      <router-link to="/about" @click="scrollView('#viewSelectedScroll')"><b
          @mouseover="hoverAudio()">Buhito(CREADOR)</b></router-link>
      <router-link to="/chatFeatures" @click="scrollView('#viewSelectedScroll')"><b
          @mouseover="hoverAudio()">Chat(Features)</b></router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref, onMounted, watch } from 'vue';
import hoverOption from '@/assets/music/hoverOption.mp3';
import { useUserConfig } from '@/stores/userConfigStates';
import scrollView from '@/assets/scripts/scrollView';
export default defineComponent({
  name: 'ConfigEmotaku',
  setup() {

    const userConfigStore = useUserConfig();

    //AUDIO LLUVIA CONFIG, PLAY AND PAUSE
    const audioHover = new Audio(hoverOption) as HTMLAudioElement;
    audioHover.volume = 0.18;
    const hoverAudio = () => {
      if (userConfigStore.clickedConfig)
        audioHover.play();
    }

    return {
      scrollView,
      hoverAudio

    }
  }

});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.principalViews {
  display: flex;
  flex-direction: column;
}

.principalViews a {
  color: #1de8d7;
  font-weight: bold;
  padding: 4px 0 4px 0;
  text-decoration: none;
}

.principalViews a.router-link-exact-active b {
  background-color: rgb(5, 97, 91);
  border: 2px solid rgb(7, 184, 160);
  color: rgb(0, 0, 0);
}

b {
  font-size: 16px;
  padding: 4px 4px 4px 4px;
}

b:hover {
  background-color: rgb(200, 13, 162);
  border: 2px solid white;
  color: black;
}
</style>
