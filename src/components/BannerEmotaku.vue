<template>
  <header>
    <span class="emoTitle">EMO</span><span class="takuTitle">TAKU</span>
    <div id="emotakuGirl">
      <img @click="playPauseAudio" src="../assets/images/characters/pikachu.png" alt="" class="pikachuCharacter">
      <div class="backgroundWrapper">
        <!-- Aquí puedes poner tu imagen de fondo -->
        <img src="../assets/♡.jpg" alt="Background Image">
      </div>

      <div class="imgInsideGirl">
        <div class="imgBanner">
        </div>
      </div>
      <div class="imgInsideGirlHands">
        <div class="imgHands"></div>
      </div>
    </div>
  </header>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'BannerEmotaku',
  setup(){

    const hasMouseMoved = ref(false);
    const audioPikachu = new Audio('../src/assets/music/pikachuSound.mp3');
    audioPikachu.volume = 0.19;
    const audioEnabled = ref(false);

    const playPauseAudio = () => {
      audioPikachu.play();
    };
    return {
      playPauseAudio
    }
  }

});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#emotakuGirl {

  overflow: visible;
  width: 100%;
  height: 231px;
  background-color: transparent;
  box-sizing: border-box;
  position: relative;
  perspective: 70px;
  /* Profundidad de perspectiva */

}

span {
  font-family: Tetsuya;
  font-size: 122px;
  text-align: center;
  color: rgba(242, 188, 247, 0.91);
  text-shadow: 0 0 80px #4a0086, 0 0 10px #4a0086, 0 0 15px #4a0086, 0 0 20px #4a0086, 0 0 25px #4a0086, 0 0 30px #4a0086, 0 0 35px #4a0086;
}

.emoTitle {
  animation: glow 4.76s ease-in-out infinite alternate, parpadeo .07s infinite;
  z-index: 10;
  position: relative;
}

.takuTitle {
  position: relative;
  z-index: 10;
}

@keyframes glow {
  from {
    text-shadow: 0 0 80px #4a0086, 0 0 10px #4a0086, 0 0 15px #4a0086, 0 0 20px #4a0086, 0 0 25px #4a0086, 0 0 30px #4a0086, 0 0 35px #4a0086;
    /*text-shadow: 0 0 80px #000000, 0 0 10px #000000, 0 0 15px #000000, 0 0 20px #000000, 0 0 25px #000000, 0 0 30px #000000, 0 0 35px #000000;*/

  }

  to {
    /*text-shadow: 0 0 80px #fff, 0 0 20px #fff, 0 0 30px #d341ff, 0 0 40px #d341ff, 0 0 50px #d341ff, 0 0 60px #d341ff, 0 0 70px #d341ff;*/
    text-shadow: 0 0 80px #cecece, 0 0 10px #cecece, 0 0 15px #cecece, 0 0 20px #cecece, 0 0 25px #cecece, 0 0 30px #cecece, 0 0 35px #cecece;
    color: rgba(0, 0, 0, 0.91);
  }
}

.backgroundWrapper {
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: fixed;

}

.backgroundWrapper img {
  width: 48%;
  /* Ajustar el tamaño de la imagen de fondo según sea necesario */
  object-fit: cover;
  background-repeat: no-repeat;
  margin-left: -575px;
  margin-top: -220px;
}

.imgInsideGirl,
.imgInsideGirlHands {

  width: 100%;
  /* Ajusta el ancho según tus necesidades */
  height: 231px;
  /* Ajusta la altura según tus necesidades */
  box-sizing: border-box;
  position: absolute;
  z-index: 999;
}

.imgInsideGirl {
  overflow: hidden;
}

.imgBanner {
  width: 680px;
  height: 350px;
  object-fit: cover;
  pointer-events: none;
  z-index: 10;
  position: relative;
  background-image: url('../assets/blueemotaku.png');
  background-size: cover;
  background-position: 0 -210px;
  float: right;
  margin-right: -50px;

}

.imgHands {
  width: 590px;
  height: 350px;
  object-fit: cover;
  pointer-events: none;
  display: block;
  z-index: 10;
  margin-bottom: 3px;
  position: absolute;
  background-image: url('../assets/blueemotakuHands.png');
  background-size: cover;
  background-position: 0 -210px;
  right: 0;

}

.pikachuCharacter {
  position: absolute;
  width: 50px;
  height: auto;
  left: 0;
  margin-top: -47px;
  margin-left: -5px;
  transform: rotate(-30deg);
  cursor: pointer;
  filter: hue-rotate(331.2deg);
}
.pikachuCharacter:hover{
  filter: hue-rotate(190deg);
  transform: rotate(0deg);
}


@keyframes parpadeo {
  0% {
    opacity: 0.99;
  }

  25% {
    opacity: 0.90;
  }

  50% {
    opacity: 0.99;
  }

  75% {
    opacity: 0.9;
  }

  100% {
    opacity: 1;
  }

}

@media (max-width: 1110px) {
  #emotakuGirl {
    width: 95%;
    margin: 0 auto;
  }

  
}
@media (max-width: 650px) {
  span {
    font-size: 100px;
  }
}

@media (max-width: 476px) {
  span {
    font-size: 70px;
  }
  
}
</style>
  