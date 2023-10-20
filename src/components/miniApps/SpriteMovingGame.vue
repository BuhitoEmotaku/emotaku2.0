<template>
  <h1 class="titleSpriteGame">Click en el bosque y pulsa tus flechas para moverte!</h1>
  <div id="gamePokemonSprites" @click="startGame">
    <div id="sprite" :style="spriteStyle" @click="playHoOhSoundSprite"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import hoOhWalkingLeft from '@/assets/images/sprites/ho-Oh/o-l_hs_250_1.png';
import hoOhWalkingRight from '@/assets/images/sprites/ho-Oh/o-r_hs_250_1.png';
import hoOhWalkingTop from '@/assets/images/sprites/ho-Oh/o-b_hs_250_1.png';
import hoOhWalkingBottom from '@/assets/images/sprites/ho-Oh/o_hs_250_1.png';
import HoOHsound from '@/assets/images/sprites/ho-Oh/250 Ho-Oh.mp3';
import hoOhWalkingLeft2 from '@/assets/images/sprites/ho-Oh/o-l_hs_250_2.png';
import hoOhWalkingRight2 from '@/assets/images/sprites/ho-Oh/o-r_hs_250_2.png';
import hoOhWalkingTop2 from '@/assets/images/sprites/ho-Oh/o-b_hs_250_2.png';
import hoOhWalkingBottom2 from '@/assets/images/sprites/ho-Oh/o_hs_250_2.png';

export default defineComponent({
  name: 'SpriteMovingGame',
  setup() {
    const spriteX = ref(0);
    const spriteY = ref(0);
    const containerHeight = 270; // Alto del contenedor
    const borderGameSprites = ref('2px solid white');
    const arraySpriteOrden = ref([hoOhWalkingTop, hoOhWalkingRight, hoOhWalkingBottom, hoOhWalkingLeft]);
    const spriteChosen = ref(`url('${hoOhWalkingRight}')`)
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
      window.scrollTo({ left: 0, top: document.getElementById('gamePokemonSprites')?.scrollHeight, behavior: "smooth" });
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
            spriteChosen.value = `url('${arraySpriteOrden.value[0]}')`;
            arraySpriteOrden.value[0] = arraySpriteOrden.value[0] === hoOhWalkingTop ? hoOhWalkingTop2 : hoOhWalkingTop;
            break;
          case 'ArrowDown':
            moveSprite(0, step); // Mover hacia abajo
            event.preventDefault(); // Previene el desplazamiento vertical
            spriteChosen.value = `url('${arraySpriteOrden.value[2]}')`;
            arraySpriteOrden.value[2] = arraySpriteOrden.value[2] === hoOhWalkingBottom ? hoOhWalkingBottom2 : hoOhWalkingBottom;
            break;
          case 'ArrowLeft':
            moveSprite(-step, 0); // Mover hacia la izquierda
            spriteChosen.value = `url('${arraySpriteOrden.value[3]}')`;
            arraySpriteOrden.value[3] = arraySpriteOrden.value[3] === hoOhWalkingLeft ? hoOhWalkingLeft2 : hoOhWalkingLeft;
            break;
          case 'ArrowRight':
            moveSprite(step, 0); // Mover hacia la derecha
            event.preventDefault(); // Previene el desplazamiento horizontal
            spriteChosen.value = `url('${arraySpriteOrden.value[1]}')`;
            arraySpriteOrden.value[1] = arraySpriteOrden.value[1] === hoOhWalkingRight ? hoOhWalkingRight2 : hoOhWalkingRight;
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
      spriteChosen,
      borderGameSprites,
      spriteStyle,
      startGame,
      playHoOhSoundSprite
    };
  },
});
</script>

<style scoped>
#gamePokemonSprites {
  position: relative;
  width: 100%;
  height: 270px;
  outline: v-bind(borderGameSprites);
  background-image: url('../../assets/images/sprites/spriteForestPokemon.jpg');
  /* Para que el contenedor pueda recibir eventos de teclado */
}

.titleSpriteGame {
  margin-bottom: 15px;
}

#sprite {
  position: absolute;
  width: 56px;
  height: 64px;
  background-image: v-bind(spriteChosen);
  /* Cambia el color de fondo según tus necesidades */
  transition: transform 0.3s;
}
#sprite:hover {
  cursor: pointer;
  filter: hue-rotate(30deg);
}
</style>
