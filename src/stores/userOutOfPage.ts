import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('userOutOfPage', () => {
  const checkerOnWeb = ref(false);
  const clickedConfig = ref(false);
  function handleVisibilityChange(){
    if (document.hidden) {
      checkerOnWeb.value = true;
      console.log('out');
      // La página está oculta, el usuario cambió de pestaña o aplicación
      // Puedes detener el sonido aquí o realizar cualquier otra acción.
    } else {
      checkerOnWeb.value = false;
      console.log('inside');
      // La página está enfocada, el usuario volvió a ella
      // Puedes iniciar el sonido o realizar cualquier otra acción.
    }
  };

  return { checkerOnWeb, clickedConfig, handleVisibilityChange }
})
