import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { defineStore } from 'pinia'

export const useUserConfig = defineStore('userConfigStates', () => {
  const checkerOnWeb = ref(false);
  const clickedConfig = ref(false);
  const checkRainEffect = ref(false);
  const checkMuteChat = ref(false);
  const emoStyler = ref(true);
  
  function handleVisibilityChange(){
    if (document.hidden) {
      checkerOnWeb.value = true;
      // La página está oculta, el usuario cambió de pestaña o aplicación
      // Puedes detener el sonido aquí o realizar cualquier otra acción.
    } else {
      checkerOnWeb.value = false;
      // La página está enfocada, el usuario volvió a ella
      // Puedes iniciar el sonido o realizar cualquier otra acción.
    }
  };

  return { checkerOnWeb, clickedConfig, checkRainEffect, checkMuteChat,emoStyler,  handleVisibilityChange }
})
