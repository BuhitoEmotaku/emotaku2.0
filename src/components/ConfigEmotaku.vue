<template>
  <div class="emotakuConfig">
    <span class="clickConfig" id="mainRefreshConfig"><b v-if="!hasMouseMoved" class="refresh" id="refreshConfig">↻</b><b
        v-if="!hasMouseMoved">&nbsp;Click para actualizar!</b><b class="clickDone" v-if="hasMouseMoved">
        ✔️Done!✔️</b></span>
    <hr>
    <!-- Checkbox para habilitar/deshabilitar el audio -->
    <h3 class="titleConfig">- Configuración -</h3>
    <hr>
    <div class="optionListConfig">
      <label>
        <input type="checkbox" v-model="audioEnabled" @change="toggleAudio"> Rain Sound
      </label>
      <label>
        <input type="checkbox" v-model="darkMode" @change="toggleTheme"> Dark Mode
      </label>
      <label>
        <input type="checkbox" v-model="darkMode" @change="toggleTheme"> Dark Mode
      </label>
      <label>
        <input type="checkbox" v-model="darkMode" @change="toggleTheme"> Dark Mode
      </label>
      <label>
        <input type="checkbox" v-model="darkMode" @change="toggleTheme"> Dark Mode
      </label>
      <label>
        <input type="checkbox" v-model="darkMode" @change="toggleTheme"> Dark Mode
      </label>
      <label>
        <input type="checkbox" v-model="darkMode" @change="toggleTheme"> Dark Mode
      </label>
    </div>
    


  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { ref, onMounted, watch } from 'vue';
import audioLluvia from '@/assets/music/lluvia.mp3';
import { useCounterStore } from '@/stores/userOutOfPage';

export default defineComponent({
  name: 'ConfigEmotaku',
  setup() {
    

    //AUDIO LLUVIA CONFIG, PLAY AND PAUSE
    const audioRain = new Audio(audioLluvia) as HTMLAudioElement;
    audioRain.volume = 0.03;
    audioRain.loop = true;
    const audioEnabled = ref(false);
    const counterStore = useCounterStore(); 

    const playPauseAudio = () => {
      if (audioEnabled.value) {
        audioRain.play();
      } else {
        audioRain.pause();
      }

    };

    const toggleAudio = () => {
      localStorage.setItem('audioEnabled', `${audioEnabled.value}`);
      playPauseAudio();
    };


    // Función para manejar el evento de movimiento del mouse
    const hasMouseMoved = ref(false);
    const handleAudioMove = () => {
      if (!hasMouseMoved.value) {
        playPauseAudio();
        counterStore.clickedConfig = true;
        const refreshItem = document.getElementById('mainRefreshConfig');
        if (refreshItem) refreshItem.style.backgroundColor = 'rgb(154, 238, 146)';
        hasMouseMoved.value = true;

      } else {
        document.body.removeEventListener('click', handleAudioMove);
      }
    };





    const darkMode = ref(false); // Valor predeterminado
    const theme = ref('light'); // Valor predeterminado

    // Escucha cambios en prefers-color-scheme
    const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');

    const toggleTheme = () => {
      const themeStorage = localStorage.getItem('theme');
      if (themeStorage == 'dark') {
        darkMode.value = false;
        theme.value = 'light';
        localStorage.setItem('theme', 'light');
      }
      else {
        darkMode.value = true;
        theme.value = 'dark';
        localStorage.setItem('theme', 'dark');
      }
      document.body.setAttribute('theme', theme.value);
    }

    const checkLocalTheme = () => {
      const themeStorage = localStorage.getItem('theme');
      if (themeStorage == 'dark') {
        darkMode.value = true;
        theme.value = 'dark';
      }
      else {
        darkMode.value = false;
        theme.value = 'light';
        document.body.setAttribute('theme', theme.value);
      }
    }

    const handleThemeChange = (e: any) => {
      if (e.matches) {
        theme.value = 'dark';
        darkMode.value = true;

      } else {
        darkMode.value = false;
      }
    };

    // Escucha cambios en el valor de 'theme'
    watch(theme, (newTheme) => {
      localStorage.setItem('theme', newTheme);
      document.body.setAttribute('theme', newTheme);
    });

    onMounted(() => {
      // Reproduce el audio al inicio si está habilitado
      const checkRain = localStorage.getItem('audioEnabled');
      if (checkRain == null) localStorage.setItem('audioEnabled', `${audioEnabled.value}`);
      else audioEnabled.value = JSON.parse(checkRain);
      const reloadAudio = document.getElementById('refreshConfig');
      if (reloadAudio) reloadAudio.addEventListener('click', handleAudioMove);


      //Theme checker
      prefersDarkTheme.addEventListener('change', handleThemeChange);
      // Forzar una llamada a handleThemeChange al inicio
      if (localStorage.getItem('theme') == null) {
        handleThemeChange(prefersDarkTheme); // O puedes usar prefersLightTheme en su lugar
        if (theme.value == 'light') localStorage.setItem('theme', 'light');
      }
      else checkLocalTheme();



    });

    return { audioEnabled, darkMode, hasMouseMoved, playPauseAudio, toggleAudio, toggleTheme };
  }
});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.emotakuConfig {
  display: flex;
  flex-direction: column;
}

.clickConfig {
  background-color: rgb(151, 74, 74);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
}

.clickDone {
  padding: 12px 0 12px 0;
  color: black;
}

.refresh {
  width: auto;
  display: inline-block;
  font-size: 30px;
  cursor: pointer;
  animation: 1s refreshLoad infinite;

}
.titleConfig {
  padding: 3px 0 3px 0;
}
.optionListConfig {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

@keyframes refreshLoad {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
  