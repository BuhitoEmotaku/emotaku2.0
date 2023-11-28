<template>
  <FpsEmotaku></FpsEmotaku>
  <RainEmotaku></RainEmotaku>
  <main class="mainContentSkeleton">
    <div class="allContent">
      <aside class="mainContent">
        <aside class="mainLeft">
          <aside class="routesEmotaku">
            <RoutesEmotaku></RoutesEmotaku>
          </aside>
          <aside class="buhitoOnline">
            <BuhitoOnlineCheck></BuhitoOnlineCheck>
          </aside>
          <aside class="statsEmotaku">
            <StatsEmotaku></StatsEmotaku>
          </aside>
          <aside class="configAside">
            <ConfigEmotaku></ConfigEmotaku>
          </aside>

          <aside class="musicAside">
            <MusicEmotaku></MusicEmotaku>
          </aside>

        </aside>
        <div id="viewSelectedScroll"></div>
        <aside class="mainCenter">

          <marquee class="welcomeMessage" behavior="scroll" direction="left">Bienvenid@ a 🖤Emotaku🤍 pequeña ratita
          </marquee>
          <div id="viewSelected">
            <router-view />
          </div>

        </aside>
        <aside class="mainRight">
          <aside class="userDNIAside">
            <UserDNI></UserDNI>
          </aside>
          <aside class="calendarAside">
            <CalendarEmotaku></CalendarEmotaku>
          </aside>



          <!-- 
          <aside class="configAside" id="spriteGameContainer">
            <SpriteMovingGame></SpriteMovingGame>
          </aside>
          -->

        </aside>

      </aside>

      <aside class="stickersSlidingChat">
        <StickersSliding></StickersSliding>
      </aside>

      <aside class="mainChatEmotaku">
        <ChatEmotaku></ChatEmotaku>
      </aside>
    </div>
  </main>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
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



export default defineComponent({
  name: 'EmotakuDesktop',
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

  }
});
</script>
  
<style scoped>
.mainContentSkeleton {
  width: 100%;
}

.allContent {
  display: flex;
  flex-direction: column;
  gap: 15.5px;
  margin-top: 4px;
}

.mainLeft,
.mainRight,
.mainCenter {
  border-radius: 10px;
  max-height: 772px;
  overflow: auto;
}

.mainContent {
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  gap: 22.5px;
  min-height: 772px;
  overflow: hidden;
  padding: 19px;
  width: 100%;
}

.mainLeft {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 12px;
  width: 24%;
}

.mainRight {
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-height: 772px;
  overflow: auto;
  padding: 12px;
  width: 24%;
}

.mainCenter {
  padding: 20px;
  width: 47.7%;
}

#viewSelectedScroll {
  margin: -70px;
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
  max-height: auto;
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
}

.statsEmotaku {
  border-radius: 6px;
}

.musicAside {
  border-radius: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 15px;
}

.userDNIAside {
  border-radius: 0px;
}

.calendarAside {
  border-radius: 10px;
}

@keyframes slowlyStart {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@media (max-width: 1110px) {

  .mainLeft,
  .mainRight,
  .mainCenter {
    overflow: scroll;
    width: 100%;
  }

  .mainLeft {
    height: 300px;
  }

  .mainContentSkeleton {
    margin: 0 auto;
    max-height: 100%;
    max-width: 95%;
  }

  .mainContent {
    max-height: 100%;
  }
}
</style>
  