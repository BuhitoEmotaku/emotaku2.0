<template>
  <div class="emotakuConfig">
    <span class="clickConfig" id="mainRefreshConfig" @click="clickSoundOption()"><b v-if="!hasMouseMoved" class="refresh"
        >↻</b><b v-if="!hasMouseMoved">&nbsp;Click!</b><b class="clickDone"
        v-if="hasMouseMoved">
        ✔️Done!✔️</b></span>
    <hr>
    <!-- Checkbox para habilitar/deshabilitar el audio -->
    <h3 class="titleConfig">- Configuración -</h3>
    <hr>
    <div class="optionListConfig">
      <label>
        <input type="checkbox" v-model="darkMode" @click="clickSoundOption()" @change="toggleTheme"> Dark Mode
      </label>
      <label>
        <input type="checkbox" v-model="audioEnabled" @click="clickSoundOption()" @change="toggleAudioRain"> Rain Sound
      </label>
      <label>
        <input type="checkbox" v-model="checkRainEffect" @click="clickSoundOption()" @change="toggleRainEffect"> Rain
        Effect
      </label>
      <label>
        <input type="checkbox" v-model="checkMuteChat" @click="clickSoundOption()" @change="muteChat"> Mute Chat
      </label>



    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { ref, onMounted, watch } from 'vue';
import audioLluvia from '@/assets/music/lluvia.mp3';
import clickOption from '@/assets/music/clickOption.mp3';

import { useUserConfig } from '@/stores/userConfigStates';

export default defineComponent({
  name: 'ConfigEmotaku',
  setup() {

    //AUDIO LLUVIA CONFIG, PLAY AND PAUSE
    const audioRain = new Audio(audioLluvia) as HTMLAudioElement;
    audioRain.volume = 0.03;
    audioRain.loop = true;
    const audioEnabled = ref(false);
    const checkRainEffect: any = ref(false);
    const userConfigStore = useUserConfig();
    const checkMuteChat = ref(false);

    //AUDIO CLICK OPTION
    const clickSound = new Audio(clickOption) as HTMLAudioElement;
    clickSound.volume = 0.23;

    const clickSoundOption = () => {
      clickSound.play();
    };




    const playPauseAudioRain = () => {
      if (audioEnabled.value) {
        audioRain.play();
      } else {
        audioRain.pause();
      }

    };

    const toggleAudioRain = () => {
      localStorage.setItem('audioEnabled', `${audioEnabled.value}`);
      playPauseAudioRain();
    };


    // Función para manejar el evento de movimiento del mouse
    const hasMouseMoved = ref(false);
    const handleAudioMove = () => {
      if (!hasMouseMoved.value) {
        playPauseAudioRain();
        userConfigStore.clickedConfig = true;
        const refreshItem = document.getElementById('mainRefreshConfig');
        if (refreshItem) {
          refreshItem.style.backgroundColor = 'rgb(154, 238, 146)';
          const buttonClickElement: HTMLElement | null = document.getElementById('mainRefreshConfig');
          buttonClickElement?.classList.add('closeClickButton');
          if (buttonClickElement) {
            setTimeout(() => {
              buttonClickElement.style.display = "none";
            }, 2000);
          }
        }
        hasMouseMoved.value = true;

      } else {
        document.body.removeEventListener('click', handleAudioMove);
      }
    };

    const toggleRainEffect = () => {
      checkRainEffect.value = checkRainEffect.value ? true : false;
      console.log(checkRainEffect.value)
      userConfigStore.checkRainEffect = checkRainEffect.value;
      localStorage.setItem('RainEffect', checkRainEffect.value.toString());
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

    const muteChat = () => {
      checkMuteChat.value = checkMuteChat.value ? true : false;
      userConfigStore.checkMuteChat = checkMuteChat.value;
      localStorage.setItem('muteChat', checkMuteChat.value.toString());
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
      const reloadAudio = document.getElementById('mainRefreshConfig');
      if (reloadAudio) reloadAudio.addEventListener('click', handleAudioMove);

      const RainEffect = localStorage.getItem('RainEffect');
      if (RainEffect == null) localStorage.setItem('RainEffect', 'false');
      else checkRainEffect.value = String(RainEffect) == "true";
      userConfigStore.checkRainEffect = checkRainEffect.value;
      //Theme checker
      prefersDarkTheme.addEventListener('change', handleThemeChange);
      // Forzar una llamada a handleThemeChange al inicio
      if (localStorage.getItem('theme') == null) {
        handleThemeChange(prefersDarkTheme); // O puedes usar prefersLightTheme en su lugar
        if (theme.value == 'light') localStorage.setItem('theme', 'light');
      }
      else checkLocalTheme();

      const checkMuteChatLocal = localStorage.getItem('muteChat');

      if (checkMuteChatLocal == null) {
        localStorage.setItem('muteChat', `${checkMuteChat.value}`);

      } else {
        checkMuteChat.value = JSON.parse(checkMuteChatLocal);
        userConfigStore.checkMuteChat = checkMuteChat.value;
      }


    });

    return { checkMuteChat, audioEnabled, darkMode, hasMouseMoved, checkRainEffect, muteChat, clickSoundOption, playPauseAudioRain, toggleAudioRain, toggleTheme, toggleRainEffect };
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
  cursor: pointer;
  align-items: center;
  background-color: rgb(151, 74, 74);
  border: 2px solid black;
  border: 2px solid white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.clickDone {
  color: black;
  padding: 12px 0 12px 0;
}

.refresh {
  animation: 1s refreshLoad infinite;
  display: inline-block;
  font-size: 30px;
  width: auto;
}

.titleConfig {
  padding: 3px 0 3px 0;
}

.optionListConfig {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
}

.closeClickButton {
  animation: closeClickButtonAnimation 2s ease-out;
}

@keyframes refreshLoad {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes closeClickButtonAnimation {
  from {
    max-height: 100px;
    opacity: 1;
  }

  to {
    max-height: 0;
    opacity: 0;
  }
}
</style>
  