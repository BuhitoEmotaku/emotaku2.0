<template>
  <!-- <FpsEmotaku></FpsEmotaku> -->
  <RainEmotaku></RainEmotaku>
  <main class="mainContentSkeleton">

    <nav :class="['menuOptions', { 'menuOptionsOpen': openMenuApps }, { 'menuOptionsClose': openMenuApps == false }]">
      <h1 class="titleMenuApps">Menú Apps</h1>
      <div v-for="(show, index) in showComponents" :key="index" @click="activateComponent(index)">
        <!-- Agrega tus propios íconos y estilos aquí -->
        <img class="appsEmotakuIcon" :src="show.urlIcon" :alt="`app-${index}`" :class="{ active: show.isActive }"
          @click="scrollView('#appsView')">
      </div>
    </nav>
    <div class="mountainContainer">
      <div class="mountain" id="mountain1"></div>
      <div class="mountain" id="mountain2"></div>
      <div class="mountain" id="mountain3"></div>
      <div class="mountain" id="mountain4"></div>
      <div class="mountain" id="mountain5"></div>
      <div class="mountain" id="mountain6"></div>
    </div>

    <aside class="allContent">
      <div class="optionSelect">
        <div class="menuButtonApps" @click="showMenuApps">
          <span :class="['openMenuEffectClosed', { 'openMenuEffectDissapear': openMenuApps == true }]"></span>
          <div class="middleLinesMenu">
            <span :class="['openMenuEffectClosed', { 'openMenuEffectLeft': openMenuApps == true }]"></span>
            <span :class="['openMenuEffectClosed', { 'openMenuEffectRight': openMenuApps == true }]"></span>
          </div>
          <span :class="['openMenuEffectClosed', { 'openMenuEffectDissapear': openMenuApps == true }]"></span>
        </div>
      </div>
      <div class="miniAppsContainer">
        <div v-for="(isVisible, index) in showComponents" :key="index">
          <aside v-if="isVisible.isActive">
            <div :class="['miniAppsEmotaku', componentClasses[index]]">
              <component :is="componentNames[index]"></component>
            </div>
          </aside>
        </div>

      </div>

      <div id="viewSelectedScroll"></div>
      <aside class="mainCenter">
        <marquee class="welcomeMessage" behavior="scroll" direction="left">Bienvenid@ a 🖤Emotaku🤍 pequeña ratita
        </marquee>
        <div id="viewSelected">
          <router-view />
        </div>
      </aside>

      <aside class="buhitoOnline">
        <BuhitoOnlineCheck></BuhitoOnlineCheck>
      </aside>

      <aside class="configAside">
        <ConfigEmotaku></ConfigEmotaku>
      </aside>

      <aside class="stickersSlidingChat">
        <StickersSliding></StickersSliding>
      </aside>

      <aside class="mainChatEmotaku">
        <ChatEmotaku></ChatEmotaku>
      </aside>

      <!-- 
          <aside class="configAside" id="spriteGameContainer">
            <SpriteMovingGame></SpriteMovingGame>
          </aside>
          -->

    </aside>

  </main>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import ConfigEmotaku from '@/components/ConfigEmotaku.vue';
import FpsEmotaku from '@/components/FpsEmotaku.vue';
import ChatEmotaku from '@/components/chatEmotaku/ChatEmotaku.vue';
import SpriteMovingGame from '@/components/miniApps/SpriteMovingGame.vue';
import StickersSliding from '@/components/decorationEmotaku/stickersSliding/StickersSliding.vue';
import StatsEmotaku from '@/components/StatsEmotaku.vue';
import RainEmotaku from '@/components/decorationEmotaku/rainEmotaku/RainEmotaku.vue';
import RoutesEmotaku from '@/components/RoutesEmotaku.vue';
import BuhitoOnlineCheck from '@/components/BuhitoOnlineCheck.vue';
import MusicEmotaku from '@/components/MusicEmotaku.vue';
import CalendarEmotaku from '@/components/CalendarEmotaku.vue';
import UserDNI from '@/components/UserDNI.vue';


import scrollView from '@/assets/scripts/scrollView';
import useAssets from '@/assets/scripts/composable';

export default defineComponent({
  name: 'EmotakuMobile',
  components: {
    ConfigEmotaku,
    FpsEmotaku,
    ChatEmotaku,
    SpriteMovingGame,
    StickersSliding,
    StatsEmotaku,
    RainEmotaku,
    RoutesEmotaku,
    BuhitoOnlineCheck,
    MusicEmotaku,
    CalendarEmotaku,
    UserDNI
  },
  setup() {

    const openMenuApps = ref();

    const showComponents = ref<any>([
      {
        isActive: true, urlIcon: useAssets('/src/assets/images/appsIcons/routesEmotaku.webp') //ROUTES EMOTAKU
      },
      {
        isActive: false, urlIcon: useAssets('/src/assets/images/appsIcons/statsEmotaku.webp') //STATS EMOTAKU
      },
      {
        isActive: false, urlIcon: useAssets('/src/assets/images/appsIcons/calendarEmotaku.webp') //CALENDAR EMOTAKU
      },
      {
        isActive: false, urlIcon: useAssets('/src/assets/images/appsIcons/musicEmotaku.webp') //MUSIC PLAYER
      },
      {
        isActive: false, urlIcon: useAssets('/src/assets/images/appsIcons/profileEmotaku.webp') //PROFILE EMOTAKU USER
      }

    ]);

    const componentNames = [
      'RoutesEmotaku',
      'StatsEmotaku',
      'CalendarEmotaku',
      'MusicEmotaku',
      'UserDNI'
    ];

    const componentClasses = [
      'routesEmotaku',
      'statsEmotaku',
      'calendarAside',
      'musicAside',
      'userDNIAside'
      //'profileAside'
    ];

    const activateComponent = (index: number) => {
      showComponents.value.forEach((component: any, i: any) => {
        component.isActive = i === index;
      });
    };

    const showMenuApps = () => {
      openMenuApps.value = !openMenuApps.value;
    };

    return {
      showComponents,
      componentNames,
      componentClasses,
      openMenuApps,
      showMenuApps,
      activateComponent,
      scrollView
    };
  }
});
</script>
  
<style scoped>
/* Estilos para el menú de iconos */
.menuOptions {
  background-color: #000;
  border-bottom: 2px solid #6836ff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 4px 5px 20px rgba(153, 153, 153, 0.39);
  display: flex;
  flex-direction: column;
  height: 0;
  left: 0;
  right: 0;
  top: 0;
  overflow: auto;
  position: absolute;
  z-index: 99999;
}

.titleMenuApps {
  font-size: 60px;
  padding: 10px 0 10px 0;
}

.menuOptionsOpen {
  animation: 0.2s openMenuApps linear;
  height: calc(30% + 60px);
  padding: 20px;
  width: 100%;
}

.menuOptionsClose {
  animation: 0.2s closeMenuApps linear;
  height: 0px;
  padding: 0px;
}

.appsEmotakuIcon {
  cursor: pointer;
  height: auto;
  width: 15%;
}

.appsEmotakuIcon.active {
  border: 2px solid #ffcc00;
}

.appsEmotakuIcon:hover {
  filter: brightness(75%);
}

.menuButtonApps {
  align-items: center;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 40px;
  justify-content: center;
  margin: 0 auto;
  width: 40px;
}

.middleLinesMenu {
  display: flex;
  flex-direction: column;
  height: 2px;
  width: 100%;
}

.openMenuEffectClosed {
  background-color: white;
  height: 2px;
  margin: 0 auto;
  width: 90%;
}

.openMenuEffectDissapear {
  animation: 0.2s menuAppsEffect linear;
  opacity: 0;
}

.openMenuEffectLeft {
  animation: 0.2s menuAppsEffectLeft linear;
  transform: rotate(-45deg);
}

.openMenuEffectRight {
  animation: 0.2s menuAppsEffectRight linear;
  transform: rotate(45deg);
}

.mainContentSkeleton {
  width: 100%;
}

.miniAppsContainer {
  border-radius: 10px;
  width: 90%;
}

.miniAppsEmotaku {
  margin-top: 22px;
}

.topAllContent {
  background-color: #000;
  clip-path: polygon(0% 0.2%, 5% 0%, 15% 1%, 27.5% 0%, 40% 1%, 50% 0%, 60% 1%, 72.5% 0%, 85% 1%, 95% 0%, 100% 0.2%, 100% 1%, 100% 100%, 0 100%);
  padding-top: 4px;
}

.middleAllContent {
  background-color: rgb(138, 102, 159);
  clip-path: polygon(0% 0.2%, 5% 0%, 15% 1%, 27.5% 0%, 40% 1%, 50% 0%, 60% 1%, 72.5% 0%, 85% 1%, 95% 0%, 100% 0.2%, 100% 1%, 100% 100%, 0 100%);
  padding-top: 10px;
  position: relative;
  z-index: 999999;
}

.bottomAllContent {
  background-color: black;
  box-shadow: 0px -5px 10px rgba(255, 255, 255, 0.5);
  clip-path: polygon(0% 0.2%, 5% 0%, 15% 1%, 27.5% 0%, 40% 1%, 50% 0%, 60% 1%, 72.5% 0%, 85% 1%, 95% 0%, 100% 0.2%, 100% 1%, 100% 100%, 0 100%);
}

.allContent {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: -7px;
  padding-top: 40px;
}

.mountainContainer {
  display: flex;
  justify-content: space-between;
}

.mountain {
  background-color: #6a5acd;
  height: 40px;
  position: relative;
  width: 60px;
}

#mountain1 {
  background-color: #000000;
  clip-path: polygon(0 100%, 50% 0, 100% 100%);
  transform: perspective(80px) rotateX(20deg);
}

#mountain1::after {
  left: 20px;
  transform: perspective(50px) rotateX(20deg);
}

#mountain2 {
  background-color: #000;
  clip-path: polygon(0 100%, 50% 0, 100% 100%);
}

#mountain3 {
  background-color: #000;
  clip-path: polygon(0 100%, 50% 0, 100% 100%);
}

#mountain4 {
  background-color: #000;
  clip-path: polygon(0 100%, 50% 0, 100% 100%);
}

#mountain5 {
  background-color: #000;
  clip-path: polygon(0 100%, 50% 0, 100% 100%);
}

#mountain6 {
  background-color: #000;
  clip-path: polygon(0 100%, 50% 0, 100% 100%);
}

.mainCenter {
  border-radius: 10px;
  max-height: 772px;
  overflow: auto;
  padding: 20px;
  width: 90%;
}

#viewSelectedScroll {
  margin: 200px;
  position: absolute;
}

#viewSelected {
  animation: 1.5s slowlyStart linear;
  margin-top: 10px;
}

.mainTopInfo {
  background-color: red;
  border: 2px solid black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 48vh;
  margin: 0 auto;
  width: 100%;
}

.selfExplanation {
  background-color: green;
  border: 1px solid white;
  height: 88%;
  overflow-y: auto;
  width: 75%;
}

.mainTopRightInfo {
  background-color: blue;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: 28px;
  width: 22%;
}

.mainChatEmotaku {
  border-radius: 5px;
  overflow: hidden;
  padding: 20px 20px 30px 20px;
  width: 100%;
}

.welcomeMessage {
  border: 2px solid white;
}

.configAside {
  border-radius: 10px;
  max-height: 200px;
  overflow: auto;
  padding: 15px;
  width: 90%;
}

.routesEmotaku {
  border-radius: 10px;
  overflow: auto;
  padding: 15px;
}

.stickersSlidingChat {
  border-radius: 6px;
}

.buhitoOnline {
  border-radius: 10px;
  width: 90%;
}

.statsEmotaku {
  border-radius: 6px;
}

.userDNIAside {
  border-radius: 0px;
}

.musicAside {
  border-radius: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 15px;
}

.calendarAside {
  border-radius: 10px;
}

@keyframes closeMenuApps {
  from {
    height: 200px;
    padding: 20px;
  }

  to {
    height: 0px;
    padding: 0px;
  }
}

@keyframes openMenuApps {
  from {
    height: 0;
    padding: 0;
  }

  to {
    height: 200px;
    padding: 20px;
  }
}

@keyframes slowlyStart {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes menuAppsEffect {
  from {
    opacity: 1;
    width: 100%;
  }

  to {
    opacity: 0;
    width: 0%;
  }
}

@keyframes menuAppsEffectLeft {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(-45deg);
  }
}

@keyframes menuAppsEffectRight {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(45deg);
  }
}

@media (max-width: 1110px) {
  #viewSelectedScroll {
    margin: 0px;
  }

  .appsEmotakuIcon {
    font-size: 54px;
    width: 11%;
  }
}

@media (max-width: 800px) {
  .titleMenuApps {
    font-size: 50px;
    padding: 10px 0 10px 0;
  }
}

@media (max-width: 650px) {
  .titleMenuApps {
    font-size: 40px;
    padding: 10px 0 10px 0;
  }

  .menuOptionsOpen {
    height: calc(20% + 60px);
  }

  .appsEmotakuIcon {
    width: 16%;
  }
}

@media (max-width: 500px) {
  .titleMenuApps {
    font-size: 25px;
    padding: 10px 0 10px 0;
  }
}
</style>
  