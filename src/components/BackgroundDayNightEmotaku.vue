<template>
  <div :class="['backgroundSetup', currentBackgroundClass]" :style="{ opacity: currentOpacity }">
    <!-- Contenido de tu aplicación -->
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';

export default defineComponent({
  name: 'BackgroundDayNightEmotaku',

  setup() {
    const currentTime = ref<number>(new Date().getHours());
    const currentTimeMin = ref<number>(new Date().getMinutes());

    // Calcula la clase de fondo en función de la hora actual
    const backgroundClass = computed(() => {
      if (currentTime.value >= 6 && currentTime.value < 20) {
        return 'backgroundImgDay';
      } else {
        return 'backgroundImgNight';
      }
    });

    // Control de opacidad
    const currentOpacity = ref<number>(1); // Inicialmente, opacidad completa

    // Actualiza la hora actual cada minuto
    onMounted(() => {
      setInterval(() => {
        currentTime.value = new Date().getHours();
        currentTimeMin.value = new Date().getMinutes();
      }, 60000);
    });

    const currentBackgroundClass = ref<string>(backgroundClass.value);
    watch(backgroundClass, (newVal: string, oldVal: string) => {
      if (newVal !== oldVal) {
        // Inicia una transición de opacidad
        currentOpacity.value = 0.5; // Cambia la opacidad a 0 (transparente)

        // Después de un breve retraso, cambia la clase de fondo y restablece la opacidad
        setTimeout(() => {
          currentBackgroundClass.value = newVal;
          currentOpacity.value = 1; // Restablece la opacidad a 1 (completa)
        }, 2000); // 2 segundos de retraso para la transición
      }
    });

    return { currentBackgroundClass, currentOpacity };
  },
});

</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.backgroundSetup {
  background-position: center;
  background-repeat: repeat;
  background-size: cover;
  filter: blur(5px) hue-rotate(330deg);
  left: 0;
  min-height: 100vh;
  min-width: 100%;
  position: fixed;
  top: 0;
  transition: opacity 2s ease;
  z-index: -9999;
}

.backgroundImgDay {
  background-color: rgb(211, 77, 99);
  background-image: url("../assets/19276.webp");
}

.backgroundImgNight {
  background-image: url("../assets/813919.webp");
}
</style>