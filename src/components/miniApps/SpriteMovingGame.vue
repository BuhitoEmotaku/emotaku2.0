<template>
  <h1 class="titleSpriteGame">Click en la ciudad y pulsa tus flechas para moverte!</h1>
  <div id="gamePokemonSprites" @click="startGame">
    <div id="sprite" :style="spriteStyle" @click="playHoOhSoundSprite">
      <img :src="spriteChosen" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import HoOHsound from '@/assets/images/sprites/Ho-Oh/250 Ho-Oh.mp3';
import useAssets from '@/assets/scripts/composable';
export default defineComponent({
  name: 'SpriteMovingGame',
  setup() {

    const spriteX = ref(0);
    const spriteY = ref(0);
    const containerHeight = 270; // Alto del contenedor
    const borderGameSprites = ref('2px solid white');
    const arraySpriteOrden = ref([
      useAssets('/src/assets/images/sprites/Ho-Oh/o-b_hs_250_1.png'),
      useAssets('/src/assets/images/sprites/Ho-Oh/o-r_hs_250_1.png'),
      useAssets('/src/assets/images/sprites/Ho-Oh/o_hs_250_1.png'),
      useAssets('/src/assets/images/sprites/Ho-Oh/o-l_hs_250_1.png')
    ]);

    const spriteChosen = ref(useAssets('/src/assets/images/sprites/Ho-Oh/o-r_hs_250_1.png'));
    const spriteStyle = ref({
      left: `${spriteX.value}px`,
      top: `${spriteY.value}px`,
    });


    const audioSpriteHoOh = new Audio(HoOHsound);
    audioSpriteHoOh.volume = 0.11;



    const step = 10; // Define el tamaño del paso del movimiento
    let gameActive = false;

    const moveSprite = (directionX: number, directionY: number) => {
      const containerElement = document.getElementById('gamePokemonSprites');
      const containerWidth = containerElement ? containerElement.clientWidth : 0;
      if (gameActive) {
        spriteX.value = Math.min(Math.max(spriteX.value + directionX, 0), containerWidth - 56);
        spriteY.value = Math.min(Math.max(spriteY.value + directionY, 0), containerHeight - 64);

        spriteStyle.value = {
          left: `${spriteX.value}px`,
          top: `${spriteY.value}px`,
        };
      }
    };

    const startGame = () => {
      document.getElementById('spriteGameContainer')?.scrollTo({ left: 0, top: document.getElementById('spriteGameContainer')?.scrollHeight, behavior: "smooth" });
      gameActive = true;
      borderGameSprites.value = '2px solid red';
    };

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (gameActive && !document.getElementById('gamePokemonSprites')?.contains(event.target as Node)) {
        gameActive = false;
        borderGameSprites.value = '2px solid white';
        document.getElementById('spriteGameContainer')?.scrollTo({ left: 0, top: 0, behavior: "smooth" });
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameActive) {
        switch (event.key) {
          case 'ArrowUp':
            moveSprite(0, -step); // Mover hacia arriba
            event.preventDefault(); // Previene el desplazamiento vertical
            spriteChosen.value = useAssets('/src/assets/images/sprites/Ho-Oh/o-b_hs_250_1.png');
            spriteChosen.value =
              arraySpriteOrden.value[0] = arraySpriteOrden.value[0] ===
                useAssets('/src/assets/images/sprites/Ho-Oh/o-b_hs_250_1.png') ?
                useAssets('/src/assets/images/sprites/Ho-Oh/o-b_hs_250_2.png') :
                useAssets('/src/assets/images/sprites/Ho-Oh/o-b_hs_250_1.png');
            break;
          case 'ArrowDown':
            moveSprite(0, step); // Mover hacia abajo
            event.preventDefault(); // Previene el desplazamiento vertical
            spriteChosen.value = useAssets('/src/assets/images/sprites/Ho-Oh/o_hs_250_1.png');
            spriteChosen.value =
              arraySpriteOrden.value[2] = arraySpriteOrden.value[2] ===
                useAssets('/src/assets/images/sprites/Ho-Oh/o_hs_250_1.png') ?
                useAssets('/src/assets/images/sprites/Ho-Oh/o_hs_250_2.png') :
                useAssets('/src/assets/images/sprites/Ho-Oh/o_hs_250_1.png');
            break;
          case 'ArrowLeft':
            moveSprite(-step, 0); // Mover hacia la izquierda
            spriteChosen.value = useAssets('/src/assets/images/sprites/Ho-Oh/o-l_hs_250_1.png');
            spriteChosen.value =
              arraySpriteOrden.value[3] = arraySpriteOrden.value[3] ===
                useAssets('/src/assets/images/sprites/Ho-Oh/o-l_hs_250_1.png') ?
                useAssets('/src/assets/images/sprites/Ho-Oh/o-l_hs_250_2.png') :
                useAssets('/src/assets/images/sprites/Ho-Oh/o-l_hs_250_1.png');
            break;
          case 'ArrowRight':
            moveSprite(step, 0); // Mover hacia la derecha
            event.preventDefault(); // Previene el desplazamiento horizontal
            spriteChosen.value = useAssets('/src/assets/images/sprites/Ho-Oh/o-r_hs_250_1.png');
            spriteChosen.value =
              arraySpriteOrden.value[1] = arraySpriteOrden.value[1] ===
                useAssets('/src/assets/images/sprites/Ho-Oh/o-r_hs_250_1.png') ?
                useAssets('/src/assets/images/sprites/Ho-Oh/o-r_hs_250_2.png') :
                useAssets('/src/assets/images/sprites/Ho-Oh/o-r_hs_250_1.png');
            break;
        }
      }
    };

    const playHoOhSoundSprite = () => {
      audioSpriteHoOh.play();
    }

    const gameContainer = ref<HTMLElement | null>(null);
    const scrollToBottom = () => {
      if (gameContainer.value) {
        gameContainer.value.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    };



    return {
      borderGameSprites,
      spriteStyle,
      spriteChosen,
      startGame,
      playHoOhSoundSprite
    };
  },
});
</script>

<style scoped>
#gamePokemonSprites {
  background-image: url('../../assets/images/sprites/backgroundPokemonSprites.gif');
  background-size: cover;
  border-radius: 14px;
  height: 270px;
  outline: v-bind(borderGameSprites);
  position: relative;
  width: 100%;
}

.titleSpriteGame {
  margin-bottom: 15px;
}

#sprite {
  height: 64px;
  position: absolute;
  width: 56px;
}

#sprite:hover {
  cursor: pointer;
  filter: hue-rotate(10deg);
  image-rendering: crisp-edges;
  transform: scale(1.2);
}
</style>
