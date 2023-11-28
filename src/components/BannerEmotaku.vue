<template>
  <div id="appsView"></div>
  <header>
    <div class="emotakuTitle">
      <span class="emoTitle">EMO</span><span class="takuTitle">TAKU</span>
    </div>

    <div id="emotakuGirl">
      <img @click="onOffLedPannel" src="../assets/images/characters/pikachu.webp" alt=""
        :class="['pikachuCharacter', { 'pikachuOn': pannelStatus == true }]">
      <!--
      <div class="backgroundWrapper">
        <img src="../assets/♡.jpg" alt="Background Image">
      </div>
      -->
      <div class="imgInsideGirl">
        <img :class="['pannelLed', { 'pannelLedOn': pannelStatus == true }]"
          src="../assets/images/emotakuLed/logoEmotau.png" alt="" @mouseover="pannelSoundPlay()"
          @mouseout="pannelSoundPause()">
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
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import audioPika from '@/assets/music/pikachuSound.mp3';
import neonSoundEffectAud from '@/assets/music/neonSoundEffect.mp3';
import { useUserConfig } from '@/stores/userConfigStates';

export default defineComponent({
  name: 'BannerEmotaku',
  setup() {

    const audioPikachu = new Audio(audioPika);
    audioPikachu.volume = 0.19;

    const neonSoundEffect = new Audio(neonSoundEffectAud);
    neonSoundEffect.volume = 0.3;
    neonSoundEffect.loop = true;

    const pannelStatus = ref<any>(true);

    const userConfigStore = useUserConfig();


    const onOffLedPannel = () => {
      pannelStatus.value = !pannelStatus.value;
      if (pannelStatus.value) audioPikachu.play();
    };

    const pannelSoundPlay = () => {
      if (pannelStatus.value == true && userConfigStore.clickedConfig) neonSoundEffect.play();
    };

    const pannelSoundPause = () => {
      if (pannelStatus.value == true) neonSoundEffect.pause();
    };

    return {
      pannelStatus,
      onOffLedPannel,
      pannelSoundPlay,
      pannelSoundPause
    }
  }

});
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#emotakuGirl {
  background-color: transparent;
  box-sizing: border-box;
  height: 160px;
  overflow: visible;
  perspective: 70px;
  position: relative;
  width: 100%;
}

span {
  color: rgba(255, 255, 255, 0.91);
  font-family: Pixel Titles;
  font-size: 100px;
  text-align: center;
  text-shadow: 0 0 80px #000000, 0 0 10px #000000, 0 0 15px #000000, 0 0 20px #4a0086, 0 0 25px #4a0086, 0 0 30px #4a0086, 0 0 35px #4a0086;
}

.emoTitle {
  animation: glowEmo 4.76s ease-in-out infinite alternate;
  font-size: 130px;
  position: relative;
  z-index: 10;
}

.takuTitle {
  position: relative;
  z-index: 10;
}

.backgroundWrapper {
  height: 100%;
  overflow: hidden;
  position: fixed;
  width: 100%;
}

.backgroundWrapper img {
  background-repeat: no-repeat;
  margin-left: -575px;
  margin-top: -220px;
  object-fit: cover;
  width: 48%;
}

.imgInsideGirl,
.imgInsideGirlHands {
  border-radius: 10px;
  box-sizing: border-box;
  height: 165px;
  position: absolute;
  width: 100%;
}

.imgInsideGirl {
  background-color: #000000d4;
  overflow: hidden;
}

.imgBanner {
  background-image: url('../assets/blueemotaku.webp');
  background-position: 0 -210px;
  background-size: cover;
  float: right;
  height: 350px;
  margin-right: -50px;
  object-fit: cover;
  pointer-events: none;
  position: relative;
  width: 680px;
  z-index: 10;
}

.imgHands {
  background-image: url('../assets/blueemotakuHands.webp');
  background-position: 0 -276px;
  background-size: cover;
  display: block;
  height: 350px;
  margin-bottom: 3px;
  object-fit: cover;
  pointer-events: none;
  position: absolute;
  right: 0;
  width: 590px;
  z-index: 10;
}

.pikachuCharacter {
  cursor: pointer;
  filter: hue-rotate(331.2deg);
  height: auto;
  left: 0;
  margin-left: -5px;
  margin-top: -47px;
  position: absolute;
  transform: rotate(-30deg);
  width: 50px;
}

.pikachuOn {
  filter: hue-rotate(310deg);
  transform: rotate(0deg);
}

.pannelLed {
  filter: hue-rotate(280.8deg) brightness(12%);
  height: 106%;
  image-rendering: -moz-crisp-edges;
  left: 4%;
  position: fixed;
  z-index: 999;
}

.pannelLedOn {
  animation: parpadeo .07s infinite;
  filter: hue-rotate(260.8deg) brightness(100%) saturate(160%);
}

@keyframes glowEmo {
  from {
    text-shadow: 0 0 80px #000000, 0 0 10px #000000, 0 0 15px #000000, 0 0 20px #4a0086, 0 0 25px #4a0086, 0 0 30px #4a0086, 0 0 35px #4a0086;
  }

  to {
    color: rgba(20, 20, 20, 0.854);
    text-shadow: 0 0 80px #610085, 0 0 10px #610085, 0 0 15px #610085, 0 0 20px #cecece, 0 0 25px #cecece, 0 0 30px #cecece, 0 0 35px #cecece;
  }
}

@keyframes parpadeo {
  0% {
    filter: hue-rotate(260.8deg) brightness(100%) saturate(160%) contrast(88%);
    opacity: 0.59;
  }

  25% {
    filter: hue-rotate(260.8deg) brightness(100%) saturate(160%) contrast(150%);
    opacity: 0.90;
  }

  50% {
    filter: hue-rotate(260.8deg) brightness(100%) saturate(160%) contrast(88%);
    opacity: 0.59;
  }

  75% {
    filter: hue-rotate(260.8deg) brightness(100%) saturate(160%) contrast(150%);
    opacity: 0.9;
  }

  100% {
    filter: hue-rotate(260.8deg) brightness(100%) saturate(160%) contrast(88%);
    opacity: 1;
  }
}

@media (max-width: 1110px) {
  #emotakuGirl {
    display: none;
  }

  .emotakuTitle {
    margin: 30px 0 20px 0;
  }
}

@media (max-width: 650px) {
  span {
    font-size: 90px;
  }

  .emoTitle {
    font-size: 110px;
  }
}

@media (max-width: 582px) {
  span {
    font-size: 85px;
  }

  .emoTitle {
    font-size: 95px;
  }
}

@media (max-width: 500px) {
  .emotakuTitle {
    font-size: 20px;
  }

  span {
    font-size: 60px;
  }
}

@media (max-width: 476px) {
  .emotakuTitle {
    font-size: 20px;
  }

  span {
    font-size: 60px;
  }
}

@media (max-width: 450px) {
  .emoTitle {
    font-size: 70px;
  }

  span {
    font-size: 60px;
  }
}

@media (max-width: 400px) {
  .emoTitle {
    font-size: 60px;
  }

  span {
    font-size: 50px;
  }
}
</style>
  